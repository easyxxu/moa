"use server";

import { ERROR_MESSAGE } from "@/utils/constants/errorMessage";
import { createClient } from "@/utils/supabase/server";

/**
 * 상품 GET
 *
 * @param page - 요청 데이터 페이지 번호
 * @param character - opt. 상품 캐릭터별
 * @param category - opt. 상품 유형별
 * @param order - opt. 상품 정렬 순서
 *
 * @returns 상품 데이터 배열 또는 에러 메세지
 */

export const getProducts = async (
  page: number = 1,
  character?: string,
  category?: string,
  order: string = "mostOrder"
) => {
  const supabase = createClient();
  const start = (page - 1) * 20;
  const end = start + 19;

  // default
  let query = supabase.from("product").select().range(start, end);

  if (character) {
    query = query.eq("character", character);
  }
  if (category && category !== "all") {
    query = query.eq("category", category);
  }

  if (order) {
    switch (order) {
      case "mostOrders":
        query = query.order("created_at", { ascending: false });
        break;
      case "highestPrice":
        query = query.order("price", { ascending: false });
        break;
      case "lowestPrice":
        query = query.order("price", { ascending: true });
        break;
      case "mostLikes":
        query = query.order("liked_count", { ascending: false });
        break;
      default:
        query = query.order("created_at", { ascending: false });
        break;
    }
  }
  const { data: products, error, status, count } = await query;
  if (error) {
    console.error("getProduct ERROR", error);
    return { status, message: ERROR_MESSAGE.serverError };
  }

  return {
    status,
    message: "상품을 불러오는 데 성공했습니다.",
    data: {
      products,
      totalCount: count,
    },
  };
};
