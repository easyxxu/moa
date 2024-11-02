"use server";

import { createClient } from "@/utils/supabase/server";

/** 문의 삭제 API */
export const deleteQuestion = async (questionId: number) => {
  const supabase = createClient();

  const { error: deleteError, status } = await supabase
    .from("question")
    .delete()
    .eq("id", questionId);

  if (deleteError) {
    console.error("작성한 문의를 삭제하는데 에러가 발생했습니다.", deleteError);
    return { status, message: "작성한 문의를 삭제하는데 에러가 발생했습니다." };
  }

  return {
    status,
    message: "작성한 문의를 삭제했습니다.",
  };
};
