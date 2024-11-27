"use client";

import { deleteReview } from "@/api/reviewApis";
import { useToast } from "@/contexts/ToastContext";
import { TOAST_MESSAGE } from "@/utils/constants/toastMessage";

interface Props {
  reviewId: number;
}
export default function DeleteButton({ reviewId }: Props) {
  const { openToast } = useToast();
  const handleDelete = async () => {
    const res = await deleteReview(reviewId);
    if (res.status > 400 && res.status < 500) {
      throw new Error(res.message);
    }
    openToast({ type: "SUCCESS", content: TOAST_MESSAGE.MYPAGE.REVIEW.DELETE });
  };
  return (
    <button
      type="button"
      onClick={handleDelete}
      className="relative px-3 py-2 text-sm font-medium after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-black after:w-0 hover:after:w-full after:transition-all after:duration-300"
    >
      삭제
    </button>
  );
}
