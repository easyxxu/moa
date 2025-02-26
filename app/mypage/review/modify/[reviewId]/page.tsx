import { fetchReviewById } from "@/api/reviewApis";
import CardItem from "@/components/common/productCard/CardItem";
import ReviewForm from "@/components/mypage/reviewWrite/ReviewForm";

export default async function ReviewModify({
  params: { reviewId },
}: {
  params: { reviewId: number };
}) {
  const res = await fetchReviewById(reviewId);
  return (
    <div>
      <h2>리뷰 수정하기</h2>
      <div className="flex flex-col items-center w-full gap-8">
        <div className="w-64">
          <CardItem
            id={res.data?.product?.id!}
            src={res.data?.product?.image[0]!}
            name={res.data?.product?.name!}
          />
        </div>
      </div>
      <ReviewForm reviewData={res.data} />
    </div>
  );
}
