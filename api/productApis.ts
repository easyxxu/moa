"use server";

import { RESPONSE_MESSAGE } from "@/utils/constants/responseMessage";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { fetchUserInfo } from "./userApis";

interface ProductForm {
  name: string;
  price: number;
  stock: number;
  description: string;
  image: string[];
  seller_store: string;
  shipping_fee: number;
  character_name: string;
  category: string;
}

export async function addProduct(formData: ProductForm) {
  const supabase = createClient();
  const { status, error } = await supabase
    .from("product")
    .insert({ ...formData });

  if (error) {
    return { status, message: "상품을 등록하는 데 실패했습니다.", error };
  }
  return { status, message: "상품을 등록했습니다." };
}

export async function modifyProduct(formData: ProductForm, productId: number) {
  const supabase = createClient();
  const { status, error } = await supabase
    .from("product")
    .update({ ...formData })
    .eq("id", productId);

  if (error) {
    return { status, message: "상품을 수정하는 데 실패했습니다.", error };
  }

  return { status, message: "상품을 수정했습니다." };
}

export const fetchProducts = async (
  page: number = 1,
  searchKeyword?: string,
  character?: string,
  category?: string,
  order: string = "mostOrders"
) => {
  const supabase = createClient();
  const start = Math.max((page - 1) * 15, 0);
  const end = start + 14;

  // default
  let query = supabase.rpc("get_product_with_order_count").range(start, end);

  if (searchKeyword) {
    const keywords = searchKeyword
      .split(" ")
      .map((word) => `'${word}'`)
      .join(" & ");
    query = query.textSearch("name", keywords);
  }
  if (character) {
    query = query.eq("character_name", character);
  }
  if (category && category !== "all") {
    query = query.eq("category", category);
  }

  if (order) {
    switch (order) {
      case "mostOrders":
        query = query.order("order_count", { ascending: false });
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

  const { data: products, error, status } = await query;

  if (error) {
    console.error("getProduct ERROR", error);
    return { status, message: RESPONSE_MESSAGE.ERROR.SERVER.ERROR };
  }

  return {
    status,
    message: "상품을 불러오는 데 성공했습니다.",
    data: {
      products,
    },
  };
};

export async function fetchProductById(productId: number) {
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

export const toggleProductLike = async (productId: number) => {
  const supabase = createClient();
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

export const fetchProductStock = async () => {
  const supabase = createClient();

  const res = await fetchUserInfo();
  if (res.status !== 200 || !res.data) {
    return {
      status: res.status,
      message: res.message,
    };
  }
  const { status, data, error } = await supabase
    .from("product")
    .select()
    .eq("seller_id", res.data.id);
  if (error) {
    console.error("판매자의 상품을 불러오는 데 실패했습니다.", error);
    return { status, message: ERROR_MESSAGE.serverError };
  }

  const lowStockProducts = data.filter(
    (product) => product.stock <= 3 && product.stock > 0
  );
  const outOfStockProducts = data.filter((product) => product.stock === 0);

  return {
    status: 200,
    message: "상품 수량 정보 조회를 성공했습니다.",
    data: {
      lowStock: lowStockProducts.length,
      outOfStock: outOfStockProducts.length,
    },
  };
};
