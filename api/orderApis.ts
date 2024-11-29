"use server";

import { ERROR_MESSAGE } from "@/utils/constants/errorMessage";
import { createClient } from "@/utils/supabase/server";

export const getOrderByUser = async () => {
  const supabase = createClient();

  const {
    data: { user },
    error: getUserError,
  } = await supabase.auth.getUser();

  if (getUserError) {
    console.error("getUserError: ", getUserError);
    return { status: 404, message: "유저 정보를 받아오는 데 실패했습니다." };
  }

  const {
    data: orders,
    error: getOrdersError,
    status,
  } = await supabase
    .from("order")
    .select(
      `
    *,
    order_item (
      *,
      product ( name, price, image, seller_store, shipping_fee )
    )
  `
    )
    .eq("customer_id", user?.id!)
    .order("created_at", { ascending: false });

  if (getOrdersError) {
    console.error("getOrdersError: ", getOrdersError);
    return {
      status,
      message: ERROR_MESSAGE.serverError,
    };
  }

  return {
    status,
    message: "주문 정보를 불러오는데 성공했습니다.",
    data: orders,
  };
};

export const updateOrderStatus = async (
  orderName: string,
  orderStatus: string
) => {
  const supabase = createClient();

  const { status, data, error } = await supabase
    .from("order")
    .update({ order_status: orderStatus })
    .eq("order_name", orderName)
    .select()
    .single();

  if (error) {
    console.error("주문 상태를 업데이트하는 데 실패했습니다.", error);
    return {
      status,
      message: ERROR_MESSAGE.serverError,
    };
  }

  return {
    status,
    message: "주문 상태를 업데이트했습니다.",
    data,
  };
};

export const getOrderWithProductInfoByOrderName = async (orderName: string) => {
  const supabase = createClient();

  const { status, data, error } = await supabase
    .from("order")
    .select(`*, order_item(*, product(*))`)
    .eq("order_name", orderName)
    .single();
  if (error) {
    console.error("getOrderByOrderName Error", error, status);
    return { status, message: ERROR_MESSAGE.serverError };
  }
  return { status, message: "주문 정보를 불러왔습니다.", data };
};
