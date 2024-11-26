"use server";

import { createClient } from "@/utils/supabase/server";
import { getUserInfo } from "./userApis";
import {
  getChartDataArrays,
  getRecentMonthsData,
  processData,
} from "@/utils/transformOrderData";
import { ERROR_MESSAGE } from "@/utils/constants/errorMessage";

export const getOrderDataWithChartFormat = async () => {
  const supabase = createClient();

  const res = await getUserInfo();
  const userId = res.data?.id;

  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  const { status, data, error } = await supabase
    .from("order_item")
    .select(
      `
    price,
    order(created_at),
    product!inner()
  `
    )
    .eq("product.seller_id", userId!)
    .gte("order.created_at", sixMonthsAgo.toISOString());

  if (error) {
    console.error("get order_item error", error);
    return { status, message: ERROR_MESSAGE.serverError };
  }
  if (!data || data.length === 0) {
    const transformNoData = getRecentMonthsData();
    const chartNoDataArrays = getChartDataArrays(transformNoData);
    return { status, message: "주문이 없습니다.", data: chartNoDataArrays };
  }
  const transformData = processData(data);
  const chartDataArrays = getChartDataArrays(transformData);

  return {
    status,
    message: "주문데이터를 차트 포맷으로 변경하는 데 성공했습니다.",
    data: chartDataArrays,
  };
};
