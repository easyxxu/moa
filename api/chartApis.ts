"use server";

import { createClient } from "@/utils/supabase/server";
import { fetchUserInfo } from "./userApis";
import {
  initializeMonthlyStats,
  aggregateOrderDataByMonth,
  convertStatsToChartData,
} from "@/utils/processOrderStats";
import { ERROR_MESSAGE } from "@/utils/constants/errorMessage";

export const fetchOrderChartData = async () => {
  const supabase = createClient();
  const userRes = await fetchUserInfo();
  const userId = userRes.data?.id;

  if (!userId) {
    return { status: 401, message: "사용자 정보를 가져오지 못했습니다." };
  }

  // 최근 N개월 전의 날짜를 반환하는 함수
  const getPastDate = (monthsAgo: number = 6) => {
    const currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() - monthsAgo);
    return currentDate.toISOString();
  };

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
    .gte("order.created_at", getPastDate());

  if (error) {
    console.error("get order_item error", error);
    return { status, message: ERROR_MESSAGE.serverError };
  }

  const processedData =
    data?.length > 0
      ? aggregateOrderDataByMonth(data)
      : initializeMonthlyStats();

  return {
    status,
    message: "주문데이터를 차트 포맷으로 변경하는 데 성공했습니다.",
    data: convertStatsToChartData(processedData),
  };
};
