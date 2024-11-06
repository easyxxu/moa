import { getOrderItemWithProduct } from "@/api/reviewApis";
import CardItem from "@/components/card/CardItem";
import ReviewForm from "@/components/mypage/reviewWrite/ReviewForm";

export default async function ReviewWrite({
  params: { orderItemId },
}: {
  params: { orderItemId: number };
}) {
  const { status, message, data } = await getOrderItemWithProduct(orderItemId);
  if (status > 400 && status < 500) {
    throw new Error(message);
  }

  return (
    <div className="w-full">
      <h2>리뷰 작성하기</h2>
      <p className="mb-2 text-xl font-medium text-center">상품은 어떠셨나요?</p>
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
