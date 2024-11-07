"use client";

import { useRouter } from "next/navigation";

import { deleteQuestion } from "@/api/qaApis";
import { useToast } from "@/contexts/toastContext";
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
      content: TOAST_MESSAGE.MYPAGE.QUETION.DELETE,
    });
    router.push("/mypage/qa");
  };
  return (
    <button
      type="button"
      className="px-3 py-2 font-semibold text-white bg-gray-300 rounded-lg shadow hover:bg-gray-400"
      onClick={() => handleDelete()}
    >
      삭제
    </button>
  );
}
