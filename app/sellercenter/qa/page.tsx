import { getSellerProductsWithQuestions } from "@/api/apis";
import TableHeader from "@/components/table/TableHeader";
import TableCell from "@/components/table/TableItem";
import Link from "next/link";

const headers = ["상품정보", "문의개수", "답변대기", "답변관리"];

export default async function QADashboard() {
  const { status, message, data } = await getSellerProductsWithQuestions();
  if (status === 404) {
    throw new Error(message);
  }

  return (
    <div className="w-full">
      <table className="w-full shadow-md">
        <TableHeader headers={headers} />
        <tbody className="w-full">
          {data?.map((product) => (
            <tr key={product.id} className="bg-white border-b">
              <TableCell.TextWithImgCell
                src={product.image[0]}
                text={product.name}
              />
              <TableCell.TextCell text={product.question.length} />
              <td className="text-center">
                <p
                  className={`w-6 h-6 mx-auto text-white rounded-full font-extralight ${
                    product.question.some((item) => !item.answer_status)
                      ? "bg-red-500"
                      : "bg-gray-300"
                  }`}
                >
                  {
                    product.question.filter((item) => !item.answer_status)
                      .length
                  }
                </p>
              </td>
              <td className="text-center">
                {product.question.length > 0 ? (
                  <Link href={`/sellercenter/qa/${product.id}`}>
                    <p className="px-3 py-2 text-blue-400 underline transition-transform duration-200 ease-out underline-offset-4 hover:-translate-y-1">
                      답변등록
                    </p>
                  </Link>
                ) : (
                  <p className="px-3 py-2 text-gray-400">답변등록</p>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
