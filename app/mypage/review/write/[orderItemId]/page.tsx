import { fetchProductForReview } from "@/api/reviewApis";
import CardItem from "@/components/common/productCard/CardItem";
import ReviewForm from "@/components/mypage/reviewWrite/ReviewForm";

export default async function ReviewWrite({
  params: { orderItemId },
}: {
  params: { orderItemId: number };
}) {
  const { status, message, data } = await fetchProductForReview(orderItemId);
  if (status > 400 && status < 500) {
    throw new Error(message);
  }

  return (
    <div className="w-full px-2">
      <h2 className="">리뷰 작성하기</h2>
      <p className="mb-2 text-lg font-medium text-center sm:text-xl">
        상품은 어떠셨나요?
      </p>
      <div className="flex flex-col items-center w-full gap-8">
        <div className="w-64">
          <CardItem
            id={data?.id!}
            src={data?.product?.image[0]!}
            name={data?.product?.name!}
          />
        </div>
        <ReviewForm productId={data?.item_id} />
      </div>
    </div>
  );
}
