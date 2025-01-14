"use client";

import { useRouter } from "next/navigation";

import { deleteQuestion } from "@/api/qaApis";
import { useToast } from "@/contexts/ToastContext";
import { TOAST_MESSAGE } from "@/utils/constants/toastMessage";

interface Props {
  questionId: number;
}

export default function DeleteButton({ questionId }: Props) {
  const router = useRouter();
  const { openToast } = useToast();
  const handleDelete = async () => {
    const res = await deleteQuestion(questionId);
    if (res.status >= 400 && res.status < 500) {
      throw new Error(res.message);
    }
    openToast({
      type: "SUCCESS",
      content: TOAST_MESSAGE.MYPAGE.QUESTION.DELETE,
    });
    router.push("/mypage/qa");
  };
  return (
    <button
      type="button"
      className="px-2 py-1.5 font-semibold text-nowrap text-white bg-gray-400 rounded-lg shadow hover:bg-gray-900"
      onClick={() => handleDelete()}
    >
      삭제
    </button>
  );
}
