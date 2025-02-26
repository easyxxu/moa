"use client";

import { useRouter } from "next/navigation";

import { deleteQuestion } from "@/api/qaApis";
import { useToast } from "@/contexts/ToastContext";
import { RESPONSE_MESSAGE } from "@/utils/constants/responseMessage";

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
      content: RESPONSE_MESSAGE.SUCCESS.QUESTION.DELETE,
    });
    router.push("/mypage/qa");
  };
  return (
    <button
      type="button"
      className="relative px-3 text-nowrap py-2 text-sm font-medium after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-black after:w-0 hover:after:w-full after:transition-all after:duration-300"
      onClick={() => handleDelete()}
    >
      삭제
    </button>
  );
}
