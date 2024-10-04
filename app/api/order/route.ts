import { CartItem } from "@/contexts/CartContext";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const supabase = createClient();

  try {
    const data = await req.json();
    console.log("POST request data:", data);

    const { data: orderData, error: orderError } = await supabase
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
      return NextResponse.json({
        status: orderError?.code || 500,
        message: "Order creation failed",
        error: orderError,
      });
    }

    const orderId = orderData[0].id;

    await Promise.all(
      data.orderItems.map(async (item: CartItem) => {
        const { error: orderItemError } = await supabase
          .from("order_item")
          .insert({
            order_id: orderId,
            item_id: item.itemId,
            quantity: item.quantity,
            price: item.price,
            shipping_fee: item.shipping_fee,
          });
        if (orderItemError) {
          console.log("Order item insertion failed: ", orderItemError);
        }
      })
    );
    return NextResponse.json({
      status: 200,
      message: "Order created successfully",
    });
  } catch (e) {
    console.log("order error: ", e);
    return e;
  }
}
