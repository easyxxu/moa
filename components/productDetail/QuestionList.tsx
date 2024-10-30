import { Tables } from "@/types/database.types";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ArrowIcon from "@/public/assets/icon/icon-arrow.svg";

interface QuestionWithAnswer extends Tables<"question"> {
  answer: Tables<"answer"> | null;
}
export default function QuestionList() {
  const productId = usePathname().split("/").pop();
  const [page, setPage] = useState(1);
  const [qas, setQas] = useState<QuestionWithAnswer[]>([]);
  const [isOpenAnswer, setIsOpenAnswer] = useState(false);
  const [isMoreContent, setIsMoreContent] = useState(false);
  const fetchQA = async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("question")
      .select(`*, answer!question_answer_id_fkey(*)`)
      .eq("product_id", productId!);
    if (error) {
      console.error(error);
      throw new Error("데이터를 불러오는데 실패했습니다. 다시 시도해주세요.");
    }

    setQas(data);
  };

  useEffect(() => {
    fetchQA();
  }, [page]);
  return (
    <div>
      <ul>
        {qas.length > 0 ? (
          <ul>
            {qas.map((qa) => (
              <li key={qa.id} className="px-2 py-3 border-b">
                <div>
                  <div className="flex items-center justify-between">
                    <div className="w-[calc(100vw-120px)]">
                      <p className="mb-1 font-regular text-font-grey">
                        [
                        {qa.title === "PRODUCT"
                          ? "상품 문의"
                          : qa.title === "SHIPPING"
                          ? "배송 문의"
                          : "기타 문의"}
                        ]
                      </p>
                      <p
                        className={`w-full  cursor-pointer ${
                          !isMoreContent && "ellipsis-1"
                        }`}
                        onClick={() => setIsMoreContent(!isMoreContent)}
                      >
                        {qa.content}
                      </p>
                    </div>
                    <p className="w-24 py-1 text-center rounded text-nowrap shadow-out text-font-grey-bold bg-primary">
                      {qa.answer_status ? "답변 완료" : "답변 대기"}
                    </p>
                  </div>
                  {qa.answer_status && (
                    <button type="button" className="w-full mt-2">
                      <div
                        className="flex gap-1"
                        onClick={() => setIsOpenAnswer(!isOpenAnswer)}
                      >
                        <Image
                          src={ArrowIcon}
                          alt="더보기"
                          width={18}
                          height={18}
                          className={`${
                            isOpenAnswer ? "rotate-90" : "-rotate-90"
                          }`}
                        />
                        답변 보기
                      </div>
                    </button>
                  )}
                </div>

                {isOpenAnswer && qa.answer_status && qa.answer?.id && (
                  <p className="mt-2">
                    <strong>답변</strong>
                    <br />
                    {qa.answer.content}
                  </p>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex items-center justify-center h-72">
            <p className="">작성된 문의가 없습니다.</p>
          </div>
        )}
      </ul>
    </div>
  );
}
