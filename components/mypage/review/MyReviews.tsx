import StarRating from "@/components/common/StarRating";
import { Tables } from "@/types/database.types";
import Image from "next/image";
import Link from "next/link";
import DeleteButton from "./DeleteButton";

interface ReviewsWithProductInfo extends Tables<"review"> {
  product: {
    id: number;
    name: string;
    image: string[];
    seller_store: string;
    seller_id: string;
  } | null;
}

interface Props {
  reviews: ReviewsWithProductInfo[];
}

export default async function MyReviews({ reviews }: Props) {
  return (
    <ul className="space-y-6">
      {reviews?.length === 0 ? (
        <p className="text-center">작성한 리뷰가 없습니다.</p>
      ) : (
        reviews?.map((review) => (
          <li
            key={review.id}
            className="flex justify-between p-4 transition-shadow duration-300 border border-gray-400 rounded-lg shadow-sm hover:shadow-md"
          >
            <div>
              <p className="mb-2 text-sm font-light text-gray-500">
                {new Date(review.created_at).toLocaleDateString()}
              </p>
              <Link href={`/products/${review.product?.id}`}>
                <div className="flex gap-4 mb-4">
                  <Image
                    src={review.product?.image[0]!}
                    alt="상품 이미지"
                    width={70}
                    height={70}
                    className="object-cover rounded-lg"
                  />
                  <div className="flex flex-col justify-center">
                    <p className="text-xs text-gray-500">
                      {review.product?.seller_store}
                    </p>
                    <p className="text-lg font-semibold">
                      {review.product?.name}
                    </p>
                  </div>
                </div>
              </Link>
              <div className="my-3">
                <StarRating size={20} rating={review.star_rating} />
              </div>
              <p>{review.content}</p>
              {review.images?.length! > 0 && (
                <div className="flex gap-2 mt-4">
                  {review.images?.map((image, idx) => (
                    <Image
                      src={image}
                      alt="리뷰 이미지"
                      width={80}
                      height={80}
                      key={idx}
                      className="object-cover rounded-md aspect-square"
                    />
                  ))}
                </div>
              )}
            </div>
            <div className="flex items-center self-start gap-2">
              <Link
                href={`/mypage/review/modify/${review.id}`}
                className="relative px-3 py-2 text-nowrap text-sm font-medium after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-black after:w-0 hover:after:w-full after:transition-all after:duration-300"
              >
                수정
              </Link>

              <DeleteButton reviewId={review.id} />
            </div>
          </li>
        ))
      )}
    </ul>
  );
}
