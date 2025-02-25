type MonthlyStats = {
  [month: string]: {
    totalPrice: number;
    totalCount: number;
  };
};
/** 최근 N개월 동안의 월별 통계 객체를 초기화 */
export const initializeMonthlyStats = (month: number = 6) => {
  const monthlyStats: MonthlyStats = {};
  const currentDate = new Date();

  for (let i = month - 1; i >= 0; i--) {
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - i,
      1
    );

    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}`; // YYYY-MM 형식

    monthlyStats[key] = { totalPrice: 0, totalCount: 0 };
  }
  return monthlyStats;
};

type OrderItem = {
  price: number;
  order: { created_at: string } | null;
};
/** 주문 데이터를 월별로 집계 */
export const aggregateOrderDataByMonth = (
  data: OrderItem[],
  month: number = 6
) => {
  const monthlyStats = initializeMonthlyStats(month);

  // 월별 데이터 업데이트
  data.forEach((item: any) => {
    const date = new Date(item.order.created_at);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}`;

    if (monthlyStats[key]) {
      monthlyStats[key].totalPrice += item.price;
      monthlyStats[key].totalCount += 1;
    }
  });
  return monthlyStats;
};

/** 월별 통계를 차트 데이터 형태로 변환 */
export const convertStatsToChartData = (recentMonthsData: MonthlyStats) => {
  const monthLabels = [];
  const totalOrderPrice = [];
  const totalOrderCount = [];

  for (const [month, data] of Object.entries(recentMonthsData)) {
    monthLabels.push(month);
    totalOrderPrice.push(data.totalPrice);
    totalOrderCount.push(data.totalCount);
  }

  return { monthLabels, totalOrderPrice, totalOrderCount };
};
