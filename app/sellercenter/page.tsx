import AlarmIcon from "@/public/assets/icon/icon-alarm.svg";
import QaIcon from "@/public/assets/icon/icon-qa.svg";
import ReceiptIcon from "@/public/assets/icon/icon-receipt.svg";
import BoxIcon from "@/public/assets/icon/icon-box.svg";
import Image from "next/image";
import Link from "next/link";
import { BarChart, LineChart } from "@/components/sellercenter/Chart";
import { getOrderDataWithChartFormat } from "@/api/chartApis";

export default async function SellerCenter() {
  const { status, message, data } = await getOrderDataWithChartFormat();
  if ((status >= 400 && status < 500) || !data) {
    throw new Error(message);
  }
  return (
    <div className="px-4 py-4 space-y-10">
      <div className="flex gap-10">
        <div className="w-1/2 px-2 py-2 border rounded-sm">
          <LineChart
            chartTitle="매출현황"
            labels={data.labels}
            totalPriceData={data.totalPriceData}
          />
        </div>
        <div className="w-1/2 px-2 py-2 border rounded-sm">
          <BarChart
            chartTitle="주문건수"
            labels={data.labels}
            totalCountData={data.totalCountData}
          />
        </div>
      </div>
      <div className="space-y-1">
        <p className="mb-2 text-lg font-semibold">주요현황</p>
        <div className="flex w-full gap-10">
          <div className="w-1/2 border rounded-sm">
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
                    5
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
                    3
                  </Link>{" "}
                  개
                </div>
                <div className="text-center">
                  <p className="mb-1 font-medium">품절상품</p>
                  <Link
                    href="/sellercenter/product"
                    className="text-red-400 underline underline-offset-2"
                  >
                    2
                  </Link>{" "}
                  개
                </div>
              </div>
            </div>
          </div>

          <div className="w-1/2 border rounded-sm ">
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
