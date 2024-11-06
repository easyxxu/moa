"use client";

import { deleteReview } from "@/api/reviewApis";

interface Props {
  reviewId: number;
}
export default function DeleteButton({ reviewId }: Props) {
  const handleDelete = async () => {
    const res = await deleteReview(reviewId);
    if (res.status > 400 && res.status < 500) {
      throw new Error(res.message);
    }
  };
  return (
    <button type="button" onClick={handleDelete}>
      삭제
    </button>
  );
}
