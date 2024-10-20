import { loadProductById } from "@/api/apis";
import CardItem from "@/components/card/CardItem";
import ReviewForm from "@/components/mypage/reviewWrite/ReviewForm";

export default async function ReviewWrite({
  params,
}: {
  params: { productId: string };
}) {
  const productId = +params.productId;
  const res = await loadProductById(productId);

  return (
    <div className="w-full">
      <h2 className="text-2xl font-semibold">리뷰 작성하기</h2>
      <p className="mb-2 text-xl font-medium text-center">상품은 어떠셨나요?</p>
      <div className="flex flex-col items-center gap-8 w-full">
        <div className="w-64">
          <CardItem
            id={res.data.id}
            src={res.data.image[0]}
            name={res.data.name}
          />
        </div>
        <ReviewForm />
      </div>
    </div>
  );
}
