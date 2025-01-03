import { getOrderDataWithChartFormat } from "@/api/chartApis";
import { BarChart, LineChart } from "@/components/sellercenter/Chart";

export default async function AnalyticsDashboard() {
  const { status, message, data } = await getOrderDataWithChartFormat();
  if ((status >= 400 && status < 500) || !data) {
    throw new Error(message);
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center w-full gap-6 px-4 my-6 mb-10">
        <div className="w-3/4">
          <LineChart
            chartTitle="매출현황"
            labels={data.labels}
            totalPriceData={data.totalPriceData}
          />
        </div>
        <div className="w-3/4">
          <BarChart
            chartTitle="주문수"
            labels={data.labels}
            totalCountData={data.totalCountData}
          />
        </div>
      </div>
    </>
  );
}
