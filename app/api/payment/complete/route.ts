import { CartItem } from "@/contexts/CartContext";
import { OrderItem } from "@/contexts/DirectOrderContext";
import { RESPONSE_MESSAGE } from "@/utils/constants/responseMessage";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

const PORTONE_API_SECRET = process.env.PORTONE_API_SECRET;

export async function POST(req: Request) {
  const { origin } = new URL(req.url);
  const supabase = createClient();
  const data = await req.json();

  try {
    const { paymentId } = data;

    // 1. 포트원 결제내역 단건조회 API 호출
    const paymentResponse = await fetch(
      `https://api.portone.io/payments/${encodeURIComponent(paymentId)}`,
      { headers: { Authorization: `PortOne ${PORTONE_API_SECRET}` } }
    );

    if (!paymentResponse.ok) {
      const errorResponse = await paymentResponse.json();
      console.log("포트원 결제내역 단건조회 API 호출 실패 => ", errorResponse);
      return NextResponse.json(
        {
          message: "결제 오류가 발생했습니다.",
        },
        { status: 400 }
      );
      // throw new Error(`paymentResponse: ${JSON.stringify(errorResponse)}`);
    }

    const payment = await paymentResponse.json();
    console.log("포트원 결제 정보 => ", payment);
    // 2. 고객사 내부 주문 데이터의 가격과 실제 지불된 금액을 비교
    const {
      status: orderStatus,
      data: orderData,
      error: orderDataError,
    } = await supabase
      .from("order")
      .select("*")
      .eq("order_name", payment.orderName)
      .single();

    console.log("orderData => ", orderData);
    if (orderDataError) {
      console.log("orderDataError", orderDataError);
      return NextResponse.json(
        { status: "failed", message: RESPONSE_MESSAGE.ERROR.SERVER.ERROR },
        { status: orderStatus }
      );
      throw new Error(
        `주문 데이터를 불러오는데 실패했습니다. ${orderDataError}`
      );
    }
    // order의 order_item.id 값 가져오기
    const {
      status: orderItemStatus,
      data: orderItemData,
      error: orderItemError,
    } = await supabase
      .from("order_item")
      .select("id, item_id, quantity")
      .eq("order_id", orderData.id);
    if (orderItemError) {
      console.log(orderItemError, orderItemStatus);
      return NextResponse.json(
        {
          message: RESPONSE_MESSAGE.ERROR.SERVER.ERROR,
        },
        { status: orderItemStatus }
      );
    }
    // const orderItemId = orderItemData?.map((item) => item.item_id);
    if (orderData.total_price === payment.amount.total) {
      switch (payment.status) {
        case "PAID": {
          // 모든 금액이 지불됨
          // Order Table의 order_status, payment_status 업데이트
          const { error: updatedDataError, status: updatedDataStatus } =
            await supabase
              .from("order")
              .update({
                order_status: "PAYMENT_COMPLETED",
                payment_status: payment.status,
              })
              .eq("order_name", payment.orderName)
              .select();
          if (updatedDataError) {
            console.log("주문 상태를 업데이트하는 데 실패했습니다.");
            return NextResponse.json(
              {
                message: RESPONSE_MESSAGE.ERROR.SERVER.ERROR,
              },
              { status: updatedDataStatus }
            );
          }
          // 장바구니에서 구매한 경우만 장바구니 아이템 삭제
          if (orderData.order_type !== "directOrder") {
            const {
              status: cartStatus,
              data: cartData,
              error: cartError,
            } = await supabase.from("cart").select("id").single();
            if (cartError) {
              console.log("장바구니 불러오는 데 실패");
              return NextResponse.json(
                {
                  message: RESPONSE_MESSAGE.ERROR.SERVER.ERROR,
                },
                { status: cartStatus }
              );
            }
            const orderItemsId = orderItemData.map(
              (orderItem) => orderItem.item_id
            );
            console.log("삭제할 상품 id => ", orderItemsId);
            console.log("삭제할 cart id => ", cartData);
            const {
              status: deletedStatus,
              data: deletedData,
              error: deletedError,
            } = await supabase
              .from("cart_item")
              .delete()
              .eq("cart_id", cartData.id)
              .in("product_id", orderItemsId)
              .select();
            console.log("*Deleted item => ", deletedData);
            if (deletedError) {
              console.log(
                "주문완료 후 장바구니에서 해당 상품을 삭제하는 데 실패했습니다.",
                deletedError
              );
              return NextResponse.json(
                {
                  message: RESPONSE_MESSAGE.ERROR.SERVER.ERROR,
                },
                { status: deletedStatus }
              );
            }
          }

          await Promise.all(
            orderItemData.map(
              async (item: { item_id: number; quantity: number }) => {
                // 현재 상품 데이터 가져오기(현재 수량 파악을 위함)
                const {
                  data: productData,
                  error: productDataError,
                  status: productDataStatus,
                } = await supabase
                  .from("product")
                  .select("stock")
                  .eq("id", item.item_id)
                  .single();

                if (productDataError) {
                  console.log(
                    "주문완료 후 수량 업데이트를 위한 상품 데이터 가져오기 실패"
                  );
                  return NextResponse.json(
                    {
                      message: RESPONSE_MESSAGE.ERROR.SERVER.ERROR,
                    },
                    {
                      status: productDataStatus,
                    }
                  );
                }

                const newStock = productData?.stock - item.quantity;
                // 수량 업데이트
                const { error: updatedError, status: updatedStatus } =
                  await supabase
                    .from("product")
                    .update({ stock: newStock })
                    .eq("id", item.item_id)
                    .select()
                    .single();

                if (updatedError) {
                  console.log("주문완료 후 상품 재고 업데이트 실패");
                  return NextResponse.json(
                    {
                      message: RESPONSE_MESSAGE.ERROR.SERVER.ERROR,
                    },
                    { status: updatedStatus }
                  );
                }
              }
            )
          );

          return NextResponse.redirect(
            `${origin}/order/complete/${payment.orderName}`
          );
        }
      }
    } else {
      // 결제 금액이 불일치하여 위/변조 시도가 의심됩니다.
      return NextResponse.json(
        {
          message: "결제 금액이 일치하지 않습니다.",
        },
        { status: 400 }
      );
    }
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}
