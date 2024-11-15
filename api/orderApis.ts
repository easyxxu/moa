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
    .eq("customer_id", user?.id!);
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
