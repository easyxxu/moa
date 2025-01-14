"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import Loading from "@/components/common/Loading";
import Pagination from "@/components/common/Pagination";
import { Tables } from "@/types/database.types";

import { getMyQuestions } from "@/api/qaApis";
import { answerTitleMap } from "@/utils/answerTitleMap";

interface QuestionWithProduct extends Tables<"question"> {
  product: Tables<"product"> | null;
}

interface Question {
  questions: QuestionWithProduct[];
  count: number;
}

const headers = ["상품정보", "문의내역", "작성날짜", "더보기"];

export default function QAPage() {
  const [data, setData] = useState<Question>({ questions: [], count: 0 });
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const loadMyQuestions = async () => {
    setIsLoading(true);
    const res = await getMyQuestions(page);
    if (res.status > 400 && res.status < 500) {
      throw new Error(res.message);
    }
    setData({ questions: res.data?.questions!, count: res.data?.count! });
    setIsLoading(false);
  };

  useEffect(() => {
    loadMyQuestions();
  }, [page]);

  return (
    <div className="h-full space-y-4">
      <h2 className="text-2xl font-bold text-center">상품 Q/A</h2>
      {isLoading ? (
        <Loading />
      ) : data.count === 0 ? (
        <div className="flex flex-col items-center mt-8 space-y-2">
          <p className="text-lg text-gray-600">작성된 문의가 없습니다.</p>
          <p className="text-gray-500">
            궁금한 점이 있으시면 문의를 작성해보세요!
          </p>
        </div>
      ) : (
        <div className="border-b border-gray-900">
          <table className="w-full border-collapse">
            <thead className="text-center border-t-4 border-gray-900 border-y text-nowrap">
              <tr>
                {headers.map((header) => (
                  <th key={header} className="px-4 py-3">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-sm text-center sm:text-base">
              {data.questions.map((question) => (
                <tr key={question.id} className="border-b">
                  <td className="flex flex-col gap-4 px-4 py-4 sm:items-center sm:flex-row">
                    <Image
                      src={question.product?.image[0]!}
                      alt={`${question.product?.name} 이미지`}
                      width={100}
                      height={100}
                      className="rounded-md shadow"
                    />
                    <span className="text-left">{question.product?.name}</span>
                  </td>
                  <td className="px-4 py-4">
                    {answerTitleMap[question?.title!]}
                  </td>
                  <td className="px-4 py-4 text-center">
                    {new Date(question.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-4 text-center">
                    <Link href={`/mypage/qa/${question.id}`}>
                      <p className="px-3 py-2 text-blue-400 underline transition-transform duration-200 ease-out text-nowrap underline-offset-4 hover:-translate-y-1">
                        더보기
                      </p>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {data.count > 10 && (
            <div className="flex justify-center">
              <Pagination total={data?.count} setPage={setPage} page={page} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
