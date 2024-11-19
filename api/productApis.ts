"use server";

import { ERROR_MESSAGE } from "@/utils/constants/errorMessage";
import { createClient } from "@/utils/supabase/server";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

interface ProductForm {
  name: string;
  price: number;
  stock: number;
  description: string;
  image: string[];
  seller_store: string;
  shipping_fee: number;
  character: string;
  category: string;
}

export async function addProduct(formData: ProductForm) {
  const supabase = createClient();

  // const image = formData.image;
  // console.log("#입력된 formData: ", formData);

  const { error } = await supabase.from("product").insert({ ...formData });

  if (error) {
    return error;
  }

  redirect("/sellercenter/product");
}

export async function updateProduct(formData: any, productId: number) {
  const supabase = createClient();
  const { error } = await supabase
    .from("product")
    .update({ ...formData })
    .eq("id", productId);

  return error;
}
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
  order: string = "mostOrders"
) => {
  const supabase = createClient();
  const start = (page - 1) * 20;
  const end = start + 19;

  // default
  let query = supabase.from("product").select().range(start, end);
  let mostOrderQuery;

  if (character) {
    query = query.eq("character", character);
  }
  if (category && category !== "all") {
    query = query.eq("category", category);
  }

  if (order) {
    switch (order) {
      case "mostOrders":
        mostOrderQuery = supabase
          .rpc("get_product_with_order_count", undefined, { count: "exact" }) // 주문 수 기준으로 정렬
          .order("order_count", { ascending: false });
        if (character) {
          mostOrderQuery = mostOrderQuery.eq("product_character", character);
        }
        if (category && category !== "all") {
          mostOrderQuery = mostOrderQuery.eq("category", category);
        }

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
  if (order === "mostOrders") {
    const { status, data, error, count }: any = await mostOrderQuery;

    if (error) {
      return {
        status,
        message: ERROR_MESSAGE.serverError,
      };
    }
    return {
      status: 200,
      message: "상품을 불러오는 데 성공했습니다.",
      data: { products: data, totalCount: count },
    };
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

export async function loadProductById(productId: number) {
  const supabase = createClient();
  const { data, error, status } = await supabase
    .from("product")
    .select()
    .eq("id", productId)
    .single();

  if (error) {
    console.log("상품 ID별 정보를 불러오는데 실패했습니다.", error);
    return {
      status,
      message: "상품 ID별 정보를 불러오는데 실패했습니다.",
      error,
    };
  }

  return { data };
}
export const likeProduct = async (productId: number) => {
  const supabase = createClient();

  // userId 불러오기
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    console.log("getUser() error: ", userError);
    throw new Error("User not authenticated");
  }

  const userId = user?.id;
  // 이미 좋아요를 누른적이 있는지 체크
  const { data: productData, error: productError } = await supabase
    .from("product")
    .select("liked_list")
    .eq("id", productId)
    .single();

  const likedList = productData?.liked_list || [];

  const hasLiked = likedList.includes(userId);

  if (hasLiked) {
    // 이미 눌렀다면 좋아요 취소 실행
    const updatedLikedList = likedList.filter((id: string) => id !== userId);
    const { error: updatedError } = await supabase
      .from("product")
      .update({ liked_list: updatedLikedList })
      .eq("id", productId);

    if (updatedError) {
      throw new Error(`Failed to remove like ${updatedError}`);
    }
    revalidatePath("/");
    revalidatePath("/products/[productId]", "page");

    return { success: true, liked: false, message: "좋아요 취소 완료" };
  } else {
    const updatedLikedList = [...likedList, userId];

    const { error: updateError } = await supabase
      .from("product")
      .update({ liked_list: updatedLikedList })
      .eq("id", productId);

    if (updateError) {
      throw new Error(`Failed to add like :${updateError.message}`);
    }

    revalidatePath("/");
    revalidatePath("/products/[productId]", "page");
    return { success: true, liked: true, message: "좋아요 완료" };
  }
};
