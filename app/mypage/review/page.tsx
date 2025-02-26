import MyReviews from "@/components/mypage/review/MyReviews";

import { fetchUserReviewsWithProductInfo } from "@/api/reviewApis";

export default async function ReviewPage() {
  const { status, message, data } = await fetchUserReviewsWithProductInfo();

  if (status > 400 && status < 500) {
    throw new Error(message);
  }

  return (
    <div className="w-full px-2 sm:px-0">
      <h2 className="pb-4 text-center">리뷰조회</h2>
      <MyReviews reviews={data!} />
    </div>
  );
}
