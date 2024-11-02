"use client";

import { deleteQuestion } from "@/api/qaApis";
import { useRouter } from "next/navigation";

interface Props {
  questionId: number;
}

export default function DeleteButton({ questionId }: Props) {
  const router = useRouter();
  const handleDelete = async () => {
    const res = await deleteQuestion(questionId);
    if (res.status > 400 && res.status < 500) {
      throw new Error(res.message);
    }
    /**
     * TODO 삭제 완료 토스트 알림 추가하기
     */
    // console.log(res);
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
