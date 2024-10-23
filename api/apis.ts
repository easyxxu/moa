"use server";

import { CartItemInfo, GroupedCartItems } from "@/types/cart";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { UserType } from "@/types/user";
import { User  } from "@supabase/supabase-js";
import { Tables } from "@/types/database.types";

export type ErrorMsg = {
  email?: string;
  password?: string;
  name?: string;
  phone?: string;
  server?: string;
  login?: string;
};

export type State = {
  errorMsg?: ErrorMsg;
};

const emailRegex = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

const ERROR_MESSAGE = {
  required: "필수 입력입니다.",
  emailInvalid: "이메일 형식에 맞지 않는 메일 주소 입니다. 다시 입력해주세요.",
  emailAlreadyExists: "이미 사용 중인 이메일입니다.",
  passwordInvalid:
    "비밀번호는 6글자 이상, 최소 1글자의 영어 대소문자, 숫자, 특수문자가 들어가야 합니다.",
  phoneInvalid: "전화번호는 숫자만 입력 가능합니다.",
  serverError: "서버 에러가 발생했습니다. 잠시 후 다시 시도해 주세요.",
  tooManyRequests:
    "요청이 많아 에러가 발생했습니다. 잠시 후 다시 시도해 주세요.",
  loginInvalid: "이메일 또는 비밀번호가 잘못되었습니다. 다시 입력해주세요.",
  loginUserType: "로그인 유형(판매자 또는 구매자)을 다시 확인해주세요.",
  getUserError:
    "로그인 정보를 가져오는 데 실패했습니다. 잠시 후 다시 시도해 주세요.",
};

export async function joinAction(
  prevState: State,
  formData: FormData
): Promise<State> {
  const userType = formData.get("userType") as UserType;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;
  const phone = formData.get("phone") as string;
  const supabase = createClient();
  const errorMsg: ErrorMsg = {};
  // form validation for user
  if (!email || email.trim().length === 0) {
    errorMsg.email = ERROR_MESSAGE.required;
  }
  if (!password || password.trim().length === 0) {
    errorMsg.password = ERROR_MESSAGE.required;
  }
  if (!name || name.trim().length === 0) {
    errorMsg.name = ERROR_MESSAGE.required;
  }
  if (!phone || phone.trim().length === 0) {
    errorMsg.phone = ERROR_MESSAGE.required;
  }
  if (!emailRegex.test(email)) {
    errorMsg.email = ERROR_MESSAGE.emailInvalid;
  }
  if (!passwordRegex.test(password)) {
    errorMsg.password = ERROR_MESSAGE.passwordInvalid;
  }
  if (isNaN(Number(phone))) {
    errorMsg.phone = ERROR_MESSAGE.phoneInvalid;
  }
  // if (Object.keys(errorMsg).length > 0) {
  //   return { errorMsg };
  // }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        user_type: userType,
        phone,
      },
    },
  });

  if (error?.code === "user_already_exists") {
    errorMsg.email = ERROR_MESSAGE.emailAlreadyExists;
  }
  if (error?.code === "weak_password") {
    errorMsg.password = ERROR_MESSAGE.passwordInvalid;
  }
  if (error?.code === "validation_failed") {
    errorMsg.email = ERROR_MESSAGE.emailInvalid;
  }
  if (error?.status === 429) {
    errorMsg.server = ERROR_MESSAGE.tooManyRequests;
  }
  if (error?.status?.toString().startsWith("50")) {
    errorMsg.server = ERROR_MESSAGE.serverError;
    console.error(`SignUp Server Error(${error.status}): ${error.code}`);
  }

  if (Object.keys(errorMsg).length > 0) {
    return { errorMsg };
  }
  return redirect("/login");
}

export type LoginState = State & {
  code?: "SUCCESS" | "FAILED";
  userData?: {
    id: string;
    name: string;
    user_type: "BUYER" | "SELLER";
    moreUserData: User;
  };
};

export async function loginAction(
  prevState: State,
  formData: FormData
): Promise<LoginState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const userType = formData.get("userType") as string;
  const supabase = createClient();
  const errorMsg: ErrorMsg = {};

  if (!email || email.trim().length === 0) {
    errorMsg.email = ERROR_MESSAGE.required;
  }
  if (!password || password.trim().length === 0) {
    errorMsg.password = ERROR_MESSAGE.required;
  }
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    errorMsg.login = ERROR_MESSAGE.loginInvalid;
  }

  const { data: userData, error: userError } = await supabase
    .from("user")
    .select()
    .eq("id", data.user?.id!)
    .single();

  if (userError) {
    errorMsg.login = ERROR_MESSAGE.getUserError;
  }

  if (userData?.user_type !== userType) {
    errorMsg.login = ERROR_MESSAGE.loginUserType;
  }

  if (Object.keys(errorMsg).length > 0) {
    return { code: "FAILED", errorMsg };
  }

  return { code: "SUCCESS", userData:{
    id: data.user?.id!,
    name: data.user?.user_metadata.name,
    user_type: data.user?.user_metadata.user_type,
    moreUserData: data.user!,
  }};
}

export async function logOutAction() {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("Error Signing Out: ", error);
  }
  redirect("/");
}

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
    .select()
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
      async (cartItem: {
        id: number;
        product_id: number;
        quantity: number;
      }) => {
        const { data: productInfo } = await loadProductById(
          cartItem["product_id"]
        );
        return {
          id: cartItem["product_id"],
          quantity: cartItem["quantity"],
          cartItemId: cartItem["id"],
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
  revalidatePath("/cart");
  return data;
};

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

export const uploadImgs = async (files: File[], fileCategory: string) => {
  const supabase = createClient();
  const fileFolder = crypto.randomUUID();
  const uploadedImgUrls = [];
  try {
    for (let i = 0; i < files.length; i++) {
      // 이미지 업로드
      const { data, error } = await supabase.storage
        .from("Image")
        .upload(`/${fileCategory}/${fileFolder}/${i}`, files[i]);
      if (error) {
        console.log("이미지 업로드 실패: ", error);
        throw { message: "이미지 업로드 실패", error };
      }
      // 이미지 url 로드
      const {
        data: { publicUrl },
      } = await supabase.storage.from("Image").getPublicUrl(data.path);
      uploadedImgUrls.push(publicUrl);
    }

    return uploadedImgUrls;
  } catch (e) {
    console.error("[ERROR] ", e);
    return { message: "서버에서 문제가 생겼습니다." };
  }
};

export const addReview = async (productId: number, formData: FormData) => {
  const supabase = createClient();
  try {
    const content = formData.get("content");
    const starRating = Number(formData.get("starRating"));
    const orderItemId = Number(formData.get("orderItemId"));
    const images = [];
    for (let i = 0; i < 3; i++) {
      const image = formData.get(`images[${i}]`) as File | null;
      if (image) {
        images.push(image);
      }
    }

    let uploadedImgUrls;

    // 이미지 storage에 업로드
    if (images.length !== 0) {
      uploadedImgUrls = await uploadImgs(images, "review");
    }

    //review 작성
    const { data, error } = await supabase
      .from("review")
      .insert({
        product_id: productId,
        order_item_id: orderItemId,
        content: content,
        star_rating: starRating,
        images: uploadedImgUrls,
      })
      .select()
      .single();

    if (error) {
      console.log("리뷰를 작성 실패했습니다", error);
      throw { message: "리뷰를 작성하는데 실패했습니다.", error };
    }
    // order_item 업데이트
    const { error: updatedError } = await supabase
      .from("order_item")
      .update({
        review_id: data.id,
        review_status: true,
      })
      .eq("id", orderItemId);

    if (updatedError) {
      console.log("order_item 업데이트 실패", updatedError);
      throw { message: "order_item 업데이트 실패", updatedError };
    }
    console.log("리뷰 작성 완료 ", data);
  } catch (e) {
    console.error("[ERROR] ", e);
    return { message: "서버에서 문제가 생겼습니다.", e };
  }
  redirect("/mypage/review");
};
