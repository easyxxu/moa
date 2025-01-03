import { CartItem } from "@/contexts/CartContext";
import { OrderItem } from "@/contexts/DirectOrderContext";
import { ERROR_MESSAGE } from "@/utils/constants/errorMessage";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const supabase = createClient();

  try {
    const data = await req.json();

    // 동일 주문서 여부 확인(주문서 재생성을 막기 위함)
    const {
      status,
      data: existOrderData,
      error: existOrderError,
    } = await supabase.from("order").select().eq("order_name", data.orderName);

    if (existOrderError) {
      console.error(
        "이미 존재하는 주문서인지 확인하는 데 실패했습니다.",
        existOrderError
      );
      return NextResponse.json(
        {
          message: ERROR_MESSAGE.serverError,
        },
        { status }
      );
    }

    if (existOrderData.length !== 0) {
      return NextResponse.json(
        { message: "이미 주문서가 생성되었습니다." },
        { status: 200 }
      );
    }

    const {
      data: orderData,
      error: orderError,
      status: orderStatus,
    } = await supabase
      .from("order")
      .insert({
        order_name: data.orderName,
        order_status: "PAYMENT_PENDING",
        customer_name: data.name,
        customer_email: data.email,
        customer_phone: data.phone,
        customer_address: `${data.postCode}, ${data.defaultAddress} ${data.detailAddress}`,
        customer_delivery_message: data.deliveryMessage,
        payment_status: "PAYMENT_IN_PROCESS",
        payment_method: data.payment,
        total_price: data.totalPrice,
      })
      .select();

    if (orderError || !orderData) {
      return NextResponse.json(
        {
          message: "Order creation failed",
          error: orderError,
        },
        { status: orderStatus }
      );
    }

    const orderId = orderData[0].id;

    const orderItemResults = await Promise.all(
      data.orderItems.map(async (item: CartItem | OrderItem) => {
        try {
          const { status, error: orderItemError } = await supabase
            .from("order_item")
            .insert({
              order_id: orderId,
              item_id: item.itemId,
              quantity: item.quantity,
              price: item.price,
              shipping_fee: item.shippingFee,
            });

          if (orderItemError) {
            console.error("개별 주문 항목 삽입 중 오류 발생: ", orderItemError);
            return {
              success: false,
              status,
              message: "Order item insertion error",
              error: orderItemError,
            };
          }

          return {
            success: true,
            status,
            message: "Order item inserted successfully",
          };
        } catch (e) {
          console.error("삽입 작업 중 예상치 못한 오류 발생: ", e);
          return {
            success: false,
            status: 500,
            message: "Unexpected error occurred",
            error: e,
          };
        }
      })
    );

    // order_item 추가 결과
    const failedItems = orderItemResults.filter((result) => !result.success);

    if (failedItems.length > 0) {
      console.error("실패한 주문 항목: ", failedItems);
      return NextResponse.json(
        {
          message: "Some order items failed to insert",
          failedItems,
        },
        { status: 400 } 
      );
    }

    // 모든 작업이 성공적으로 완료된 경우
    return NextResponse.json(
      {
        message: "All order items inserted successfully",
      },
      { status: 200 }
    );
  } catch (e) {
    console.log("order error: ", e);
    return NextResponse.json(
      {
        message: "Internal server error",
        error: e,
      },
      { status: 500 }
    );
  }
}
