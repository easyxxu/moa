import { CartItem } from "@/contexts/CartContext";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

const PORTONE_API_SECRET = process.env.PORTONE_API_SECRET;

export async function POST(req: Request) {
  const supabase = createClient();
  const data = await req.json();
  console.log("받아온 Req Data: ", data);
  try {
    const { paymentId, order } = data;

    // 1. 포트원 결제내역 단건조회 API 호출
    const paymentResponse = await fetch(
      `https://api.portone.io/payments/${encodeURIComponent(paymentId)}`,
      { headers: { Authorization: `PortOne ${PORTONE_API_SECRET}` } }
    );

    if (!paymentResponse.ok) {
      const errorResponse = await paymentResponse.json();
      throw new Error(`paymentResponse: ${JSON.stringify(errorResponse)}`);
    }

    const payment = await paymentResponse.json();

    // 2. 고객사 내부 주문 데이터의 가격과 실제 지불된 금액을 비교
    const { data: orderData, error: orderDataError } = await supabase
      .from("order")
      .select("total_price")
      .eq("order_name", order.orderName)
      .single();

    if (orderDataError) {
      throw new Error(
        `주문 데이터를 불러오는데 실패했습니다. ${orderDataError}`
      );
    }
    if (orderData.total_price === payment.amount.total) {
      switch (payment.status) {
        case "VIRTUAL_ACCOUNT_ISSUED": {
          const paymentMethod = payment.paymentMethod;
          // 가상 계좌가 발급된 상태입니다.
          // 계좌 정보를 이용해 원하는 로직을 구성하세요.
          return NextResponse.json({
            message: "Virtual account issued",
            accountInfo: paymentMethod,
          });
        }
        case "PAID": {
          // 모든 금액을 지불했습니다! 완료 시 원하는 로직을 구성하세요.
          // Order Table의 order_status, payment_status 업데이트
          const { data: updatedData, error: updatedDataError } = await supabase
            .from("order")
            .update({
              order_status: "PAYMENT_COMPLETED",
              payment_status: payment.status,
            })
            .eq("order_name", order.orderName)
            .select();
          console.log(
            "1.주문 테이블의 주문상태와 결제상태 업데이트 성공: ",
            updatedData
          );
          if (updatedDataError) {
            throw new Error(
              `1-1.주문 테이블의 주문상태와 결제상태 업데이트 실패: ${updatedDataError}`
            );
          }

          // 장바구니에 주문된 아이템 삭제
          const cartItemIds = order.orderItems.map(
            (item: CartItem) => item.cartItemId
          );
          const { error: deletedError } = await supabase
            .from("cart_item")
            .delete()
            .in("id", cartItemIds);
          console.log("2.장바구니에 주문된 상품 삭제 성공");
          if (deletedError) {
            throw new Error(
              `2-1.주문완료된 이후 장바구니에 해당 상품 삭제 실패: ${deletedError}`
            );
          }

          await Promise.all(
            order.orderItems.map(async (item: CartItem) => {
              // 현재 상품 데이터 가져오기(현재 수량 파악을 위함)
              const { data: productData, error: productDataError } =
                await supabase
                  .from("product")
                  .select("stock")
                  .eq("id", item.itemId)
                  .single();
              console.log(
                "3.주문완료 후 수량 체크를 위한 상품 데이터 가져오기 성공: ",
                productData
              );
              if (productDataError) {
                throw new Error(
                  `3-1.주문완료 후 수량 체크를 위한 상품 데이터 가져오기 실패: ${productDataError}`
                );
              }
              const newStock = productData?.stock - item.quantity;
              // 수량 업데이트
              const { data: updatedData, error: updatedError } = await supabase
                .from("product")
                .update({ stock: newStock })
                .eq("id", item.itemId)
                .select()
                .single();

              console.log(
                "4.주문완료 후 상품 재고 업데이트 성공: ",
                updatedData
              );
              if (updatedError) {
                throw new Error(
                  `4-1.주문완료 후 상품 재고 업데이트 실패: ${updatedError}`
                );
              }
            })
          );

          // revalidatePath("/cart");
          return NextResponse.json({
            message: "Payment completed successfully",
          });
        }
      }
    } else {
      // 결제 금액이 불일치하여 위/변조 시도가 의심됩니다.
      return NextResponse.json(
        {
          message: "Payment amount mismatch",
        },
        { status: 400 }
      );
    }
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}
