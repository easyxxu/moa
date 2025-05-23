import AlarmIcon from "@/public/assets/icon/icon-alarm.svg";
import QaIcon from "@/public/assets/icon/icon-qa.svg";
import ReceiptIcon from "@/public/assets/icon/icon-receipt.svg";
import BoxIcon from "@/public/assets/icon/icon-box.svg";
import Image from "next/image";
import Link from "next/link";
import { BarChart, LineChart } from "@/components/sellercenter/Chart";
import { fetchOrderChartData } from "@/api/chartApis";
import { getStockCount } from "@/api/productApis";
import { getSellerProductsWithQuestions } from "@/api/qaApis";

export default async function SellerCenter() {
  const { status, message, data } = await fetchOrderChartData();
  if ((status >= 400 && status < 500) || !data) {
    throw new Error(message);
  }
  // 매진 임박 상품 개수 알림
  const {
    status: getStockStatus,
    message: getStockMsg,
    data: getStockCountData,
  } = await getStockCount();
  if (getStockStatus >= 400 && getStockStatus < 500) {
    throw new Error(getStockMsg);
  }
  // 답변 대기 개수 알림
  const {
    status: productsWithQuestionStatus,
    message: productsWithQuestionMsg,
    data: productsWithQuestionData,
  } = await getSellerProductsWithQuestions();
  if (productsWithQuestionStatus === 404) {
    throw new Error(productsWithQuestionMsg);
  }
  let waitingQuestionsCount = 0;
  productsWithQuestionData?.forEach(
    (product) =>
      (waitingQuestionsCount += product.question.filter(
        (q) => !q.answer_status
      ).length)
  );
  return (
    <div className="px-4 pt-4 pb-20 space-y-10 sm:pb-4">
      <div className="flex flex-col gap-10 sm:flex-row">
        <div className="w-full px-2 py-2 border rounded-sm sm:w-1/2">
          <LineChart
            chartTitle="매출현황"
            labels={data.monthLabels}
            totalPriceData={data.totalOrderPrice}
          />
        </div>
        <div className="w-full px-2 py-2 border rounded-sm sm:w-1/2">
          <BarChart
            chartTitle="주문건수"
            labels={data.monthLabels}
            totalCountData={data.totalOrderCount}
          />
        </div>
      </div>
      <div className="space-y-1">
        <p className="mb-2 text-lg font-semibold">주요현황</p>
        <div className="flex flex-col w-full gap-10 sm:flex-row">
          <div className="w-full border rounded-sm sm:w-1/2">
            <div className="px-4 py-3 space-y-2">
              <div className="flex justify-between">
                <Image
                  src={QaIcon}
                  alt="문의"
                  width={36}
                  height={36}
                  className=""
                />
                <div className="text-center ">
                  <p className="mb-1 font-medium">답변대기</p>
                  <Link
                    href="/sellercenter/qa"
                    className="text-red-400 underline underline-offset-2"
                  >
                    {waitingQuestionsCount}
                  </Link>{" "}
                  건
                </div>
              </div>
            </div>
            <div className="px-4 py-3 space-y-2 border-t">
              <div className="flex justify-between">
                <Image
                  src={AlarmIcon}
                  alt="알림"
                  width={36}
                  height={28}
                  className=""
                />
                <div className="text-center">
                  <p className="mb-1 font-medium">품절임박상품</p>
                  <Link
                    href="/sellercenter/product"
                    className="text-red-400 underline underline-offset-2"
                  >
                    {getStockCountData?.lowStockCount}
                  </Link>{" "}
                  개
                </div>
                <div className="text-center">
                  <p className="mb-1 font-medium">품절상품</p>
                  <Link
                    href="/sellercenter/product"
                    className="text-red-400 underline underline-offset-2"
                  >
                    {getStockCountData?.outOfStockCount}
                  </Link>{" "}
                  개
                </div>
              </div>
            </div>
          </div>

          <div className="w-full border rounded-sm sm:w-1/2 ">
            <div className="px-4 py-3 space-y-2">
              <div className="flex justify-between">
                <Image
                  src={ReceiptIcon}
                  alt="주문아이콘"
                  width={36}
                  height={36}
                  className=""
                />
                <div className="text-center">
                  <p className="mb-1 font-medium">미접수주문</p>
                  <Link
                    href="/sellercenter/order"
                    className="text-red-400 underline underline-offset-2"
                  >
                    5
                  </Link>{" "}
                  건
                </div>
                <div className="text-center">
                  <p className="mb-1 font-medium">접수주문</p>
                  <Link
                    href="/sellercenter/order"
                    className="text-red-400 underline underline-offset-2"
                  >
                    5
                  </Link>{" "}
                  건
                </div>
              </div>
            </div>
            <div className="px-4 py-3 space-y-2 border-t">
              <div className="flex justify-between">
                <Image
                  src={BoxIcon}
                  alt="배송아이콘"
                  width={36}
                  height={28}
                  className=""
                />
                <div className="text-center">
                  <p className="mb-1 font-medium">미출고</p>
                  <Link
                    href="/sellercenter/order"
                    className="text-red-400 underline underline-offset-2"
                  >
                    3
                  </Link>{" "}
                  개
                </div>
                <div className="text-center">
                  <p className="mb-1 font-medium">출고완료</p>
                  <Link
                    href="/sellercenter/order"
                    className="text-red-400 underline underline-offset-2"
                  >
                    2
                  </Link>{" "}
                  개
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
