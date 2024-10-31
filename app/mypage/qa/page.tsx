import { getMyQuestions } from "@/api/apis";
import { answerTitleMap } from "@/app/sellercenter/qa/[productId]/page";
import Image from "next/image";
import Link from "next/link";

const headers = ["상품정보", "문의내역", "작성날짜", "더보기"];
export default async function QAPage() {
  const res = await getMyQuestions();

  return (
    <div className="w-full">
      <h2 className="mb-6 text-2xl font-bold text-center">상품 Q/A</h2>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-200">
            {headers.map((header) => (
              <th key={header} className="px-4 py-3 text-center text-gray-700">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {res.data?.map((question) => (
            <tr key={question.id} className="border-b">
              <td className="flex items-center px-4 py-4 space-x-4">
                <Image
                  src={question.product?.image[0]!}
                  alt={`${question.product?.name} 이미지`}
                  width={80}
                  height={80}
                  className="rounded-md shadow"
                />
                <span className="font-medium">{question.product?.name}</span>
              </td>
              <td className="px-4 py-4 text-center ">
                {answerTitleMap[question?.title!]}
              </td>
              <td className="px-4 py-4 text-center ">
                {new Date(question.created_at).toLocaleDateString()}
              </td>
              <td className="px-4 py-4 text-center">
                <Link href={`/mypage/qa/${question.id}`}>
                  <p className="px-3 py-2 text-blue-400 underline transition-transform duration-200 ease-out underline-offset-4 hover:-translate-y-1">
                    더보기
                  </p>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
