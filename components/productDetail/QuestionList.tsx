import { Tables } from "@/types/database.types";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ArrowIcon from "@/public/assets/icon/icon-arrow.svg";
import Pagination from "../common/Pagination";

interface QuestionWithAnswer extends Tables<"question"> {
  answer: Tables<"answer"> | null;
}
interface QAs {
  data: QuestionWithAnswer[];
  count: number;
}
export default function QuestionList() {
  const productId = usePathname().split("/").pop();
  const [page, setPage] = useState(1);
  const [qas, setQas] = useState<QAs>({ data: [], count: 0 });
  const [openAnswers, setOpenAnswers] = useState<{ [key: number]: boolean }>(
    {}
  );
  const [showFullContent, setShowFullContent] = useState<{
    [key: number]: boolean;
  }>({});

  const fetchQA = async () => {
    const supabase = createClient();
    const start = (page - 1) * 10;
    const end = start + 9;
    const { data, count, error } = await supabase
      .from("question")
      .select(`*, answer!question_answer_id_fkey(*)`, { count: "exact" })
      .range(start, end)
      .eq("product_id", productId!);
    if (error) {
      console.error(error);
      throw new Error("데이터를 불러오는데 실패했습니다. 다시 시도해주세요.");
    }
    setQas({ data, count: count || 0 });
  };

  useEffect(() => {
    fetchQA();
  }, [page]);

  const toggleAnswer = (id: number) => {
    setOpenAnswers((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleContent = (id: number) => {
    setShowFullContent((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div>
      <ul>
        {qas.data.length > 0 ? (
          <ul>
            {qas.data.map((qa) => (
              <li key={qa.id} className="px-2 py-3 border-b border-border-grey">
                <div>
                  <div className="flex items-center justify-between">
                    <div className="w-[calc(100vw-120px)]">
                      <p className="mb-1 font-regular">
                        [
                        {qa.title === "PRODUCT"
                          ? "상품 문의"
                          : qa.title === "SHIPPING"
                          ? "배송 문의"
                          : "기타 문의"}
                        ]{" "}
                        <span className="text-sm font-light text-gray-500">
                          {new Date(qa.created_at).toLocaleString()}
                        </span>
                      </p>
                      <p
                        className={`w-full ${
                          !showFullContent[qa.id] && "ellipsis-1 cursor-pointer"
                        }`}
                        onClick={() => toggleContent(qa.id)}
                      >
                        {qa.content}
                      </p>
                    </div>
                    <p className="px-2 py-1 font-semibold text-center rounded text-nowrap shadow-out text-font-grey-bold bg-primary">
                      {qa.answer_status ? "답변 완료" : "답변 대기"}
                    </p>
                  </div>
                  {qa.answer_status && (
                    <button type="button" className="w-full mt-2">
                      <div
                        className="flex gap-1"
                        onClick={() => toggleAnswer(qa.id)}
                      >
                        <Image
                          src={ArrowIcon}
                          alt="더보기"
                          width={18}
                          height={18}
                          className={`${
                            openAnswers[qa.id] ? "rotate-90" : "-rotate-90"
                          }`}
                        />
                        답변 보기
                      </div>
                    </button>
                  )}
                </div>

                {openAnswers[qa.id] && qa.answer_status && qa.answer?.id && (
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
      <div className="flex justify-center mt-4">
        <Pagination total={qas.count} setPage={setPage} />
      </div>
    </div>
  );
}
