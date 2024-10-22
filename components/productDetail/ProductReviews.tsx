import { useEffect, useState } from "react";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";
import { Tables } from "@/types/database.types";
import Button from "../common/button/Button";
import ExpandImage from "../common/ExpandImage";
import { usePathname } from "next/navigation";

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
    const { data, error } = await supabase
      .from("review")
      .select(`*, user(name)`)
      .range(start, end)
      .eq("product_id", productId!);

    if (error) {
      console.error(error);
      throw new Error("서버에서 문제가 생겼습니다.");
    }
    console.log(data);
    setReviews(data);
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
        {reviews.map((review) => (
          <div key={review.id} className="border-t-2 border-inherit">
            <li className="flex flex-col gap-2 p-2">
              <div>
                <span className="mr-2 font-semibold">{review.user?.name}</span>
                <span className="font-extralight">
                  {new Date(review.created_at).toLocaleDateString()}
                </span>
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
        ))}
      </ul>
      <Button
        onClick={handleMoreBtn}
        type="button"
        custom="bg-secondary px-4 py-1 w-full font-semibold"
      >
        더보기
      </Button>
    </div>
  );
}
