"use server";

import { ERROR_MESSAGE } from "@/utils/constants/errorMessage";
import { createClient } from "@/utils/supabase/server";
import { uploadImgs } from "./imageApis";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

/** 유저의 전체 작성 리뷰 조회 API */
export const getReviewsWithProductByUser = async () => {
  const supabase = createClient();

  const { data: user, error: getUserError } = await supabase.auth.getUser();

  if (getUserError) {
    console.error("getUser 에러", getUserError);
    return { status: 404, message: ERROR_MESSAGE.getUserError };
  }

  const userId = user.user?.id;

  const {
    status,
    data: reviews,
    error: getReviewError,
  } = await supabase
    .from("review")
    .select(`*, product(id, name, image, seller_store, seller_id)`)
    .eq("writer_id", userId)
    .order("created_at", { ascending: false });

  if (getReviewError) {
    console.error("getReview 에러", getReviewError);
    return { status, message: ERROR_MESSAGE.serverError };
  }

  return {
    status,
    message: "getReview 성공",
    data: reviews,
  };
};

/** orderItemId를 활용해 product 정보도 함께 조회 API */
export const getOrderItemWithProduct = async (orderItemId: number) => {
  const supabase = createClient();

  const { status, data, error } = await supabase
    .from("order_item")
    .select(`*,product(id, name, image)`)
    .eq("id", orderItemId)
    .single();

  if (error) {
    console.error("getOrderWithProduct 에러", error);
    return { status, message: ERROR_MESSAGE.serverError };
  }

  return { status, message: "getOrderWithProduct 성공", data };
};

/** 리뷰 조회(by reviewId) API */
export const getReviewById = async (reviewId: number) => {
  const supabase = createClient();

  const { status, data, error } = await supabase
    .from("review")
    .select(`*, product(id, name, image)`)
    .eq("id", reviewId)
    .single();
  if (error) {
    console.error("getReviewById 에러", error);
    return { status, message: ERROR_MESSAGE.serverError };
  }

  return { status, message: "리뷰를 가져오는 데 성공했습니다.", data };
};

export const addReview = async (productId: number, formData: FormData) => {
  const supabase = createClient();

  const content = formData.get("content") as string;
  const starRating = Number(formData.get("starRating")) as number;
  const orderItemId = Number(formData.get("orderItemId")) as number;
  const images = [];
  for (let i = 0; i < 3; i++) {
    const image = formData.get(`images[${i}]`) as File | null;
    if (image) {
      images.push(image);
    }
  }

  if (!content || content.trim().length === 0 || content.length < 15) {
    return { status: 400, message: "리뷰는 최소 15자 이상 작성해주세요." };
  }
  if (starRating === 0) {
    return { status: 400, message: "별점을 선택해주세요." };
  }
  let uploadedImgUrls;

  // 이미지 storage에 업로드
  if (images.length !== 0) {
    uploadedImgUrls = await uploadImgs(images, "review");
  }

  //review 작성
  const { data, error, status } = await supabase
    .from("review")
    .insert({
      content: content,
      order_item_id: orderItemId,
      product_id: productId,
      star_rating: starRating,
      images: uploadedImgUrls || null,
    })
    .select()
    .single();

  if (error) {
    console.log("리뷰를 작성 실패했습니다", error);
    return { status, message: "리뷰를 작성하는데 실패했습니다.", error };
  }
  // order_item 업데이트
  const { error: updatedError, status: updatedStatus } = await supabase
    .from("order_item")
    .update({
      review_id: data.id,
      review_status: true,
    })
    .eq("id", orderItemId);

  if (updatedError) {
    console.log("order_item 업데이트 실패", updatedError);
    return {
      updatedStatus,
      message: "order_item 업데이트 실패",
      updatedError,
    };
  }
  console.log("리뷰 작성 완료 ", data);
  redirect("/mypage/review");
};

/** 리뷰 수정 API */
export const modifyReview = async (reviewId: number, formData: FormData) => {
  const supabase = createClient();
  const content = formData.get("content") as string;
  const starRating = Number(formData.get("starRating")) as number;
  const files: File[] = [];
  const prevImages: string[] = [];
  console.log("modify", content, content.length);
  // form validation
  if (!content || content.trim().length === 0 || content.length < 15) {
    return {
      status: 400,
      message: "리뷰는 최소 15자 이상 작성해주세요.",
    };
  }

  if (starRating === 0) {
    return {
      status: 400,
      message: "별점을 선택해주세요.",
    };
  }
  for (let i = 0; i < 3; i++) {
    const image = formData.get(`images[${i}]`) as File | string | null;
    if (image instanceof File) {
      files.push(image);
    } else if (typeof image == "string") {
      prevImages.push(image);
    }
  }

  const uploadedImgUrls: string[] = [];

  // 이미지 storage에 업로드
  if (files.length !== 0) {
    const res = await uploadImgs(files, "review");
    res.forEach((img) => uploadedImgUrls.push(img));
  }

  const updateImages =
    [...prevImages, ...uploadedImgUrls].length > 0
      ? [...prevImages, ...uploadedImgUrls]
      : null;

  const { status, error } = await supabase
    .from("review")
    .update({
      content,
      star_rating: starRating,
      images: updateImages,
    })
    .eq("id", reviewId);

  if (error) {
    console.error("modifyReview 에러: ", error);
    return {
      status,
      message: ERROR_MESSAGE.serverError,
      error,
    };
  }
  revalidatePath("/mypage/review");
  return {
    status,
    message: "modifyReview 성공",
  };
};

/** 리뷰 삭제 API */
export const deleteReview = async (reviewId: number) => {
  const supabase = createClient();

  const { status, error } = await supabase
    .from("review")
    .delete()
    .eq("id", reviewId);

  if (error) {
    console.error("deleteReview Error: ", error);
    return {
      status,
      message: ERROR_MESSAGE.serverError,
    };
  }
  revalidatePath("/mypage/review");

  return {
    status,
    message: "리뷰를 삭제했습니다.",
  };
};
