"use server";

import { ERROR_MESSAGE } from "@/utils/constants/errorMessage";
import { createClient } from "@/utils/supabase/server";
import { uploadImgs } from "./apis";
import { revalidatePath } from "next/cache";

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
    .eq("user_id", userId)
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

/** 리뷰 수정 API */
export const modifyReview = async (reviewId: number, formData: FormData) => {
  const supabase = createClient();
  const content = formData.get("content") as string;
  const starRating = Number(formData.get("starRating")) as number;
  const files: File[] = [];
  const prevImages: string[] = [];

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
