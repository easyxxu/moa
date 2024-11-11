import { useEffect, useState } from "react";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";
import { Tables } from "@/types/database.types";
import Button from "../common/button/Button";
import ExpandImage from "../common/ExpandImage";
import { usePathname } from "next/navigation";
import StarRating from "../common/StarRating";

interface ReviewsWithUserName extends Tables<"review"> {
  user: { name: string } | null;
}

export default function ProductReviews() {
  const productId = usePathname().split("/").pop();
  const supabase = createClient();
  const [reviews, setReviews] = useState<ReviewsWithUserName[]>([]);
  const [page, setPage] = useState(1);
  const [isExpand, setIsExpand] = useState(false);
  const [imageOrder, setImageOrder] = useState(0);
  const [isEnd, setIsEnd] = useState(true);

  const handleMoreBtn = () => {
    setPage((prev) => prev + 1);
  };

  const handleExpandImg = (order: number) => {
    setIsExpand((prev) => !prev);
    setImageOrder(order);
  };

  const fetchReviews = async () => {
    const start = (page - 1) * 10;
    const end = start + 9;
    const { data, count, error } = await supabase
      .from("review")
      .select(`*, user(name)`, { count: "exact" })
      .range(start, end)
      .eq("product_id", productId!);

    if (error) {
      console.error(error);
      throw new Error("서버에서 문제가 생겼습니다.");
    }

    // 더보기 버튼 활성화 여부
    if (count! > end) {
      setIsEnd(false);
    } else {
      setIsEnd(true);
    }

    setReviews((prev) => [...prev, ...data]);
  };

  useEffect(() => {
    fetchReviews();
  }, [page]);

  useEffect(() => {
    if (isExpand) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [isExpand]);

  return (
    <div>
      <ul>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className="border-inherit">
              <li className="flex flex-col gap-2 p-2 border-b border-border-grey">
                <div className="flex justify-between text-sm font-extralight">
                  <div className="flex items-end gap-1">
                    <StarRating rating={review.star_rating} size={20} />
                    <p className="text-gray-600 ">{review.user?.name}</p>
                  </div>
                  <p>{new Date(review.created_at).toLocaleDateString()}</p>
                </div>
                <p>{review.content}</p>
                {review.images && (
                  <div className="flex gap-2">
                    {review.images?.map((image, idx) => (
                      <div key={idx}>
                        <Image
                          src={image}
                          alt="리뷰 이미지"
                          width={100}
                          height={100}
                          // fill={true}
                          onClick={() => handleExpandImg(idx)}
                          className="object-cover cursor-pointer aspect-square"
                        />
                      </div>
                    ))}
                    {isExpand && (
                      <ExpandImage
                        images={review.images!}
                        order={imageOrder}
                        onClose={() => setIsExpand(false)}
                      />
                    )}
                  </div>
                )}
              </li>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center h-72">
            작성된 후기가 없습니다.
          </div>
        )}
      </ul>
      <div className="flex justify-center">
        {!isEnd && (
          <Button
            onClick={handleMoreBtn}
            type="button"
            style="line"
            custom="px-10 py-1 font-semibold mt-6"
          >
            더보기
          </Button>
        )}
      </div>
    </div>
  );
}
