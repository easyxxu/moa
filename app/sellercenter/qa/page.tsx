import { getSellerProductsWithQuestions } from "@/api/qaApis";
import TableHeader from "@/components/common/table/TableHeader";
import TableCell from "@/components/common/table/TableItem";
import Link from "next/link";

const headers = ["상품정보", "문의개수", "답변대기", "답변관리"];

export default async function QADashboard() {
  const { status, message, data } = await getSellerProductsWithQuestions();
  if (status === 404) {
    throw new Error(message);
  }

  return (
    <div className="w-full text-sm mb-14 sm:text-base">
      <table className="w-full">
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
                  className={`w-5 h-5 leading-5 sm:leading-6 sm:w-6 sm:h-6 mx-auto text-white rounded-full font-extralight ${
                    product.question.some((item) => !item.answer_status)
                      ? "bg-red-500"
                      : "bg-gray-300"
                  }`}
                >
                  <span>
                    {
                      product.question.filter((item) => !item.answer_status)
                        .length
                    }
                  </span>
                </p>
              </td>
              <td className="text-center">
                {product.question.length > 0 ? (
                  product.question.filter((x) => x.answer_status === false)
                    .length > 0 ? (
                    <div>
                      <Link href={`/sellercenter/qa/${product.id}`}>
                        <span className="relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-black after:w-0 hover:after:w-full after:transition-all after:duration-300">
                          답변등록
                        </span>
                      </Link>
                    </div>
                  ) : (
                    <Link href={`/sellercenter/qa/${product.id}`}>
                      <span className="text-gray-400 relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-gray-300 after:w-0 hover:after:w-full after:transition-all after:duration-300">
                        답변완료
                      </span>
                    </Link>
                  )
                ) : (
                  <p className="text-gray-400">문의없음</p>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
