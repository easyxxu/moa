import StarRating from "@/components/common/StarRating";
import { Tables } from "@/types/database.types";
import Image from "next/image";
import Link from "next/link";

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
      {reviews.map((review) => (
        <li
          key={review.id}
          className="p-4 transition-shadow duration-300 border border-gray-200 rounded-lg shadow-sm hover:shadow-md"
        >
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
                <p className="text-lg font-semibold">{review.product?.name}</p>
              </div>
            </div>
          </Link>
          <div className="my-3">
            <StarRating size={20} rating={review.star_rating} />
          </div>
          <p className="text-gray-700">{review.content}</p>
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
        </li>
      ))}
    </ul>
  );
}
