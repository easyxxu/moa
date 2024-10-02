import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const supabase = createClient();

  try {
    const data = await req.json();
    console.log("POST request data:", data);

    const { error } = await supabase.from("order").insert({
      order_name: data.orderName,
      order_status: "PAYMENT_PENDING",
      customer_name: data.name,
      customer_email: data.email,
      customer_phone: data.phone,
      customer_address: `${data.postCode}, ${data.defaultAddress} ${data.detailAddress}`,
      customer_delivery_message: data.deliveryMessage,
      payment_status: "PAYMENT_IN_PROCESS",
      payment_method: data.payment,
      order_items: data.orderItems,
      total_price: data.totalPrice,
    });
    if (error) {
      return NextResponse.json({
        status: error.code,
        message: "Order created Failed",
        error,
      });
    }
    return NextResponse.json({
      status: 200,
      message: "Order created successfully",
    });
  } catch (e) {
    console.log("order error: ", e);
    return e;
  }
}
