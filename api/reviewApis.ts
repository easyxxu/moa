"use server";

import { ERROR_MESSAGE } from "@/utils/constants/errorMessage";
import { createClient } from "@/utils/supabase/server";
import { uploadImgs } from "./apis";
import { revalidatePath } from "next/cache";

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
