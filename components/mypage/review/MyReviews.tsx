import { Tables } from "@/types/database.types";
import Image from "next/image";

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
    <ul>
      {reviews.map((review) => (
        <li key={review.id} className="py-2 border-b">
          <p className="mb-2 text-lg font-semibold">
            {new Date(review.created_at).toLocaleDateString()}
          </p>
          <div>
            <div className="flex gap-2">
              <Image
                src={review.product?.image[0]!}
                alt="상품 이미지"
                width={60}
                height={60}
              />
              <div className="flex flex-col justify-center">
                <p className="text-sm text-font-grey">
                  {review.product?.seller_store}
                </p>
                <p className="font-semibold">{review.product?.name}</p>
              </div>
            </div>
            <div className="flex gap-1 my-2">
              {Array.from({ length: 5 }).map((_, idx) => (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 33 33"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="cursor-pointer"
                >
                  <path
                    d="M15.3251 4.48207C15.7046 3.35733 17.2954 3.35733 17.6749 4.48208L19.7901 10.7508C19.9586 11.2501 20.4242 11.5884 20.9511 11.5943L27.5667 11.6688C28.7536 11.6822 29.2452 13.1952 28.2928 13.9037L22.9845 17.8525C22.5617 18.167 22.3839 18.7143 22.541 19.2173L24.5145 25.5321C24.8686 26.6651 23.5816 27.6002 22.6134 26.9133L17.2175 23.0851C16.7878 22.7802 16.2122 22.7802 15.7825 23.0851L10.3866 26.9133C9.41843 27.6002 8.13143 26.6651 8.48551 25.5321L10.459 19.2173C10.6161 18.7143 10.4383 18.167 10.0155 17.8525L4.7072 13.9037C3.75478 13.1952 4.24637 11.6822 5.43335 11.6688L12.0489 11.5943C12.5758 11.5884 13.0414 11.2501 13.2099 10.7508L15.3251 4.48207Z"
                    fill={review.star_rating! < idx + 1 ? "#C2C2C2" : "#FFD700"}
                  />
                </svg>
              ))}
            </div>
            <p>{review.content}</p>
            {review.images?.length! > 0 && (
              <div className="flex gap-2 mt-2">
                {review.images?.map((image) => (
                  <Image src={image} alt="리뷰 이미지" width={60} height={60} />
                ))}
              </div>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
