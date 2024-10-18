import { loadProductById } from "@/api/apis";
import ReviewForm from "@/components/review/ReviewForm";
import Image from "next/image";

export default async function ReviewWrite({
  params,
}: {
  params: { productId: string };
}) {
  const productId = +params.productId;
  const res = await loadProductById(productId);

  return (
    <div className="w-full">
      <h2 className="text-2xl font-semibold text-center">리뷰 작성하기</h2>
      <p className="mb-2 text-xl font-medium">상품은 어떠셨나요?</p>
      <div className="flex gap-8">
        <div>
          <div className="w-64 shadow-out rounded-xl">
            <Image
              src={res.data.image[0]}
              alt={`${res.data.name} 이미지`}
              width={300}
              height={300}
              className="rounded-t-xl"
            />
            <p className="px-4 py-3 bg-white rounded-b-xl font-extralight">
              {res.data.name}
            </p>
          </div>
        </div>
        <ReviewForm />
      </div>
    </div>
  );
}
