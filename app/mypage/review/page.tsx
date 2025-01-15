import MyReviews from "@/components/mypage/review/MyReviews";

import { getReviewsWithProductByUser } from "@/api/reviewApis";

export default async function ReviewPage() {
  const { status, message, data } = await getReviewsWithProductByUser();

  if (status > 400 && status < 500) {
    throw new Error(message);
  }

  return (
    <div className="w-full">
      <h2 className="pb-4 text-center">리뷰조회</h2>
      <MyReviews reviews={data!} />
    </div>
  );
}
