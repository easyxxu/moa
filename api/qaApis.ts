"use server";

import { createClient } from "@/utils/supabase/server";
import { ERROR_MESSAGE } from "@/utils/constants/errorMessage";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getUserInfo } from "./userApis";

export const fetchMyQuestions = async (page: number) => {
  const supabase = createClient();
  const start = (page - 1) * 10;
  const end = start + 9;

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
    .eq("writer_id", res.data?.id!)
    .range(start, end)
    .order("created_at", { ascending: false });

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

export const fetchQuestionsWithAnswer = async (
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

export const createQuestion = async (prevState: any, formData: FormData) => {
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

export const deleteAnswer = async (answerId: number) => {
  const supabase = createClient();

  const { error, status } = await supabase
    .from("answer")
    .delete()
    .eq("id", answerId);

  if (error) {
    console.error("답변을 삭제하는 데 에러가 발생했습니다.", error);
    return { status, message: ERROR_MESSAGE.serverError };
  }

  revalidatePath("/sellercenter/qa/[questionId]", "page");
  return {
    status,
    message: "답변을 삭제했습니다.",
  };
};

export const fetchSellerProductsWithQuestions = async () => {
  const supabase = createClient();

  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError) {
    console.error("유저 정보를 불러오는데 실패했습니다.", userError);
    return {
      status: 404,
      message: ERROR_MESSAGE.serverError,
    };
  }

  const { data: products, error: productError } = await supabase
    .from("product")
    .select(
      `
    *,
    question(*)
  `
    )
    .eq("seller_id", userData.user?.id);

  if (productError) {
    console.error("판매자의 상품을 불러오는데 실패했습니다.", productError);
    return { status: 404, message: ERROR_MESSAGE.serverError };
  }

  const sortedProducts = products.sort(
    (a, b) => b.question.length - a.question.length
  );

  return {
    status: 200,
    message: "데이터를 불러오는데 성공했습니다.",
    data: sortedProducts,
  };
};

export const fetchQuestionsByProductId = async (productId: number) => {
  const supabase = createClient();
  const { data: productData, error: productError } = await supabase
    .from("product")
    .select()
    .eq("id", productId)
    .single();

  if (productError) {
    console.error("상품 정보를 불러오는데 실패했습니다.", productError);
    return {
      status: 404,
      message: ERROR_MESSAGE.serverError,
    };
  }
  const { data: questionData, error: questionError } = await supabase
    .from("question")
    .select()
    .eq("product_id", productId)
    .order("answer_status");

  if (questionError) {
    console.error("상품별 문의를 불러오는데 실패했습니다.", questionError);
    return { status: 404, message: ERROR_MESSAGE.serverError };
  }

  return {
    status: 200,
    message: "데이터를 불러오는데 성공했습니다.",
    data: { product: productData, questions: questionData },
  };
};

export const fetchQuestionsById = async (questionId: number) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("question")
    .select(`*, answer!question_answer_id_fkey(*)`)
    .eq("id", questionId)
    .single();

  if (error) {
    console.error("문의를 불러오는 데 실패했습니다.", error);
    return { status: 404, message: ERROR_MESSAGE.serverError, error };
  }

  return { status: 200, message: "데이터를 불러오는 데 성공했습니다.", data };
};

export const createAnswer = async (
  prevState: any,
  formData: FormData
): Promise<any> => {
  const supabase = createClient();
  const content = formData.get("answer") as string;
  const questionId = formData.get("questionId") as string;
  const productId = formData.get("productId") as string;

  // 답변 작성
  const { data, error, status } = await supabase
    .from("answer")
    .insert({ content, question_id: +questionId })
    .select()
    .single();

  if (error) {
    console.error("문의에 대한 답변을 작성하는 데 실패했습니다.", error);
    return {
      status,
      message: ERROR_MESSAGE.serverError,
      error,
    };
  }
  // 문의 상태 업데이트
  const {
    data: updateData,
    error: updateError,
    status: updateStatus,
  } = await supabase
    .from("question")
    .update({
      answer_id: data?.id,
      answer_status: true,
    })
    .eq("id", data.question_id)
    .select();

  if (updateError) {
    console.error("문의 상태를 업데이트하는 데 실패했습니다.", updateError);
    return {
      status: updateStatus,
      message: ERROR_MESSAGE.serverError,
      error: updateError,
    };
  }

  revalidatePath("/sellercenter/qa/[productId]", "layout");
  redirect(`/sellercenter/qa/${productId}/${questionId}`);
};
