"use server";

import { CartItemInfo, GroupedCartItems } from "@/types/cart";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

interface ProductForm {
  name: string;
  price: string;
  stock: string;
  description: string;
  image: string[];
}

export async function addProduct(formData: ProductForm) {
  const supabase = createClient();
  const image = formData.image;
  // console.log("#입력된 formData: ", formData);

  const { error } = await supabase
    .from("product")
    .insert({ ...formData, image });

  if (error) {
    return error;
  }

  redirect("/sellercenter/product");
}

export async function loadProductById(productId: number) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("product")
    .select(
      "name, price, description, shipping_fee, stock, image, seller_store"
    )
    .eq("id", productId)
    .single();

  if (error) {
    // console.log("상품 ID별 정보를 불러오는데 실패했습니다.", error);
    throw new Error(
      `상품 ID별 정보를 불러오는데 실패했습니다. 
      메시지: ${error.message}
      코드: ${error.code}
      힌트: ${error.hint}
      세부 사항: ${error.details}`
    );
  }

  return { data };
}

export async function updateProduct(formData: any, productId: number) {
  const supabase = createClient();
  const { error } = await supabase
    .from("product")
    .update({ ...formData })
    .eq("id", productId);

  return error;
}

export async function createCart(userId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("cart")
    .insert({ user_id: userId })
    .select()
    .single();

  return data.id;
}

export async function getCartId(userId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("cart")
    .select("id")
    .eq("user_id", userId)
    .single();
  // if (!data) console.log("no data");
  return data?.id;
}

interface CartItem {
  cartId: number;
  productId: number;
  quantity: number;
}
export async function addCartItem(cartItem: CartItem) {
  const supabase = createClient();
  const { cartId, productId, quantity } = cartItem;

  const { data, error } = await supabase
    .from("cart_item")
    .insert({ cart_id: cartId, product_id: productId, quantity })
    .select();

  revalidatePath("/cart");

  return { data, error };
}

export async function checkCartItem(cartId: number, productId: number) {
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

export async function getCartItem(cartId: number) {
  const supabase = createClient();

  const { data: cartItems, error } = await supabase
    .from("cart_item")
    .select()
    .eq("cart_id", cartId)
    .order("product_id");

  if (cartItems?.length === 0 || !cartItems) return;

  /**
   ** 상품정보+수량을 같이 리턴함
   */
  const cartItemsInfo = await Promise.all(
    cartItems?.map(
      async (cartItem: { product_id: number; quantity: number }) => {
        const { data: productInfo } = await loadProductById(
          cartItem["product_id"]
        );

        return {
          id: cartItem["product_id"],
          quantity: cartItem["quantity"],
          ...productInfo,
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

  return { count: cartItems?.length, cart: groupBySellerStore(cartItemsInfo) };
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

export const updateQuantity = async (productId: number, quantity: number) => {
  const supabase = createClient();
  const { data } = await supabase
    .from("cart_item")
    .update({ quantity: quantity })
    .eq("product_id", productId)
    .select()
    .single();
  return data;
};
