"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";
import { fetchProductById } from "./productApis";
import { CartItemInfo, GroupedCartItems } from "@/types/cart";
import { RESPONSE_MESSAGE } from "@/utils/constants/responseMessage";

export async function createUserCart(userId: string) {
  const supabase = createClient();
  const { status, data, error } = await supabase
    .from("cart")
    .insert({ user_id: userId })
    .select()
    .single();

  if (error) {
    console.error("createCart Error: ", error);
    return { status, message: RESPONSE_MESSAGE.ERROR.SERVER.ERROR };
  }
  return {
    status,
    message: "장바구니를 생성했습니다.",
    data: { id: data?.id },
  };
}

export async function fetchCartIdByUser(userId: string) {
  const supabase = createClient();
  const { status, data, error } = await supabase
    .from("cart")
    .select("id")
    .eq("user_id", userId)
    .single();

  if (!data && error && error.details === "The result contains 0 rows") {
    return {
      status: 200,
      message: "생성된 장바구니가 없습니다.",
      data: { id: null },
    };
  }
  if (error) {
    console.error("getCartId error: ", error);
    return { status, message: RESPONSE_MESSAGE.ERROR.SERVER.ERROR };
  }

  return {
    status,
    message: "장바구니 ID를 가져왔습니다.",
    data: { id: data?.id },
  };
}

export async function addProductToCart(
  cartId: number,
  productId: number,
  quantity: number
) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("cart_item")
    .insert({ cart_id: cartId, product_id: productId, quantity })
    .select();

  revalidatePath("/cart");

  return { data, error };
}

export async function isProductInCart(cartId: number, productId: number) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("cart_item")
    .select()
    .eq("cart_id", cartId)
    .eq("product_id", productId);

  if (data!.length > 0) {
    return true;
  }
}

export async function fetchCartItems(cartId: number) {
  const supabase = createClient();

  const {
    data: cartItems,
    error,
    status,
  } = await supabase
    .from("cart_item")
    .select()
    .eq("cart_id", cartId)
    .order("product_id");

  if (error) {
    console.error(error);
    return { status, message: RESPONSE_MESSAGE.ERROR.SERVER.ERROR };
  }

  if (cartItems?.length === 0 || !cartItems)
    return {
      status: 200,
      message: "장바구니에 담긴 상품이 없습니다.",
      data: null,
    };

  /**
   ** 상품정보+수량을 같이 리턴함
   */
  const cartItemsInfo: CartItemInfo[] = await Promise.all(
    cartItems.map(
      async (item: { id: number; product_id: number; quantity: number }) => {
        const { data: productInfo } = await fetchProductById(item.product_id);
        return {
          quantity: item.quantity,
          cartItemId: item.id,
          ...productInfo!,
        };
      }
    )
  );

  const groupBySellerStore = (cartItems: CartItemInfo[]): GroupedCartItems => {
    return cartItems.reduce((acc: GroupedCartItems, item: CartItemInfo) => {
      const { seller_store } = item;
      if (!acc[seller_store]) {
        acc[seller_store] = [];
      }
      acc[seller_store].push(item);
      return acc;
    }, {});
  };

  return {
    status,
    message: "장바구니 아이템을 불러오는 데 성공했습니다.",
    data: { count: cartItems?.length, cart: groupBySellerStore(cartItemsInfo) },
  };
}

export const deleteCartItem = async (productId: number) => {
  const supabase = createClient();
  const res = await supabase
    .from("cart_item")
    .delete()
    .eq("product_id", productId);

  revalidatePath("/cart");
  return res;
};

export const updateCartItemQuantity = async (
  productId: number,
  quantity: number
) => {
  const supabase = createClient();
  const { data } = await supabase
    .from("cart_item")
    .update({ quantity: quantity })
    .eq("product_id", productId)
    .select()
    .single();
  revalidatePath("/cart");
  return data;
};
