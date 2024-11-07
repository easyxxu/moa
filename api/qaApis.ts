"use server";

import { createClient } from "@/utils/supabase/server";

import { getUserInfo } from "./apis";
import { ERROR_MESSAGE } from "@/utils/constants/errorMessage";

/**
 * 작성자의 문의 GET API
 *
 * 로그인 사용자 ID를 기반으로 사용자가 작성한 문의 목록을 불러오는 API입니다.
 * Supabase의 `question` 테이블에서 해당 사용자와 관련된 문의 데이터를 조회합니다.
 *
 * @param page - 요청할 문의 데이터의 페이지 번호
 * @returns 문의 데이터 배열 또는 에러 메시지
 *
 * @example
 * const myQuestions = await getQuestions(page);
 */
export const getMyQuestions = async (page: number) => {
  const supabase = createClient();
  const start = (page - 1) * 10;
  const end = start + 9;
  // 현재 로그인 유저 정보 얻어오기
  const res = await getUserInfo();
  if (res.status > 400 && res.status < 500) {
    throw new Error(res.message);
  }

  const {
    data: questions,
    error,
    status,
    count,
  } = await supabase
    .from("question")
    .select(`*, product(*)`, { count: "exact" })
    .eq("writer_id", res.user?.id!)
    .range(start, end);

  if (error) {
    console.error("작성한 문의글을 불러오는 데 실패했습니다.");
    return { status, message: ERROR_MESSAGE.serverError, error };
  }

  return {
    status: 200,
    message: "작성한 문의글을 불러오는 데 성공했습니다.",
    data: {
      questions,
      count,
    },
  };
};

/**
 * 상품 상세 페이지에서 문의와 답변을 불러오는 API
 */
export const getQuestionsWithAnswer = async (
  productId: number,
  page: number
) => {
  const supabase = createClient();
  const start = (page - 1) * 10;
  const end = start + 9;
  const {
    data: qas,
    count,
    error,
    status,
  } = await supabase
    .from("question")
    .select(`*, answer!question_answer_id_fkey(*)`, { count: "exact" })
    .range(start, end)
    .eq("product_id", productId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return { status, message: ERROR_MESSAGE.serverError, error };
  }

  return {
    status,
    message: "문의와 답변을 성공적으로 불러왔습니다.",
    data: {
      qas: qas,
      count,
    },
  };
};
/**
 * 문의 작성 API
 */
export const addQuestion = async (prevState: any, formData: FormData) => {
  const supabase = createClient();
  const productId = formData.get("productId") as string;
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  if (!content || content.trim().length === 0) {
    return {
      status: 400,
      message: ERROR_MESSAGE.inputInvalid,
    };
  }

  if (content.length < 5) {
    return {
      status: 400,
      message: ERROR_MESSAGE.questionInvalid,
    };
  }

  const { data, error } = await supabase
    .from("question")
    .insert({
      title,
      content,
      product_id: +productId,
      answer_status: false,
    })
    .select()
    .single();

  if (error) {
    console.error("문의 작성 실패", error);
    return {
      status: 404,
      message: ERROR_MESSAGE.serverError,
      error,
    };
  }

  const dataWithAnswer = { ...data, answer: null };

  return {
    status: 200,
    message: "문의를 작성하는데 성공했습니다.",
    data: dataWithAnswer,
  };
};

/** 문의 DELETE API */
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
