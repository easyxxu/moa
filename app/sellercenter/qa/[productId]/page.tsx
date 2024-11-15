import { getQuestionsByProductId } from "@/api/qaApis";
import TableHeader from "@/components/table/TableHeader";
import TableCell from "@/components/table/TableItem";
import { answerTitleMap } from "@/utils/answerTitleMap";
import Image from "next/image";
import Link from "next/link";

const headers = ["문의내용", "답변상태", "답변관리"];

export default async function ProductAnswerPage({
  params,
}: {
  params: { productId: string };
}) {
  const productId = +params.productId;
  const { status, message, data } = await getQuestionsByProductId(productId);

  if (status === 404) {
    throw new Error(message);
  }
  return (
    <div className="w-full p-6 shadow-sm bg-gray-50">
      <div className="flex items-center gap-4 p-4 mb-4 bg-white rounded-lg shadow">
        <Image
          src={data?.product.image[0]!}
          alt={`${data?.product.name} 이미지`}
          width={80}
          height={80}
          className="rounded-lg shadow-sm"
        />
        <p className="text-lg text-gray-800">
          현재 문의 대상 상품 :{" "}
          <strong className="text-gray-700">{data?.product.name}</strong>
        </p>
      </div>
      <table className="w-full overflow-hidden bg-white rounded-lg shadow-md">
        <TableHeader headers={headers} />
        <tbody className="bg-white">
          {data?.questions.map((question) => (
            <tr key={question.id} className="border-b last:border-none">
              <TableCell.TextCell text={answerTitleMap[question.title]} />
              <td className="py-2 text-center">
                <p
                  className={`w-5 h-5 mx-auto text-sm text-white rounded-full font-light ${
                    question.answer_status ? "bg-green-500" : "bg-gray-300"
                  }`}
                >
                  {question.answer_status ? "Y" : "N"}
                </p>
              </td>
              <td className="text-center">
                <Link
                  href={
                    question.answer_status
                      ? `/sellercenter/qa/${productId}/${question.id}`
                      : `/sellercenter/qa/${productId}/${question.id}/answer`
                  }
                >
                  <div className="px-4 py-2 text-blue-500 rounded-md hover:bg-gray-100">
                    {question.answer_status ? "답변확인" : "답변달기"}
                  </div>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
