type RecentMonthsDataType = {
  [month: number]: {
    totalPrice: number;
    totalCount: number;
  };
};
// 현재 날짜 기준으로 최근 6개월의 키를 가진 객체 생성
export const getRecentMonthsData = () => {
  const recentMonthsData: RecentMonthsDataType = {};
  const currentDate = new Date();

  for (let i = 0; i < 6; i++) {
    const month =
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - i,
        1
      ).getMonth() + 1;
    recentMonthsData[month] = { totalPrice: 0, totalCount: 0 };
  }
  return recentMonthsData;
};

type OrderItemDataType = {
  price: number;
  order: { created_at: string } | null;
};
// 데이터 가공 함수
export const processData = (data: OrderItemDataType[]) => {
  const recentMonthsData = getRecentMonthsData();

  data.forEach((item: any) => {
    const date = new Date(item.order.created_at);
    const month = date.getMonth() + 1;

    // 해당 월의 데이터 업데이트
    if (recentMonthsData[month]) {
      recentMonthsData[month].totalPrice += item.price;
      recentMonthsData[month].totalCount += 1;
    }
  });

  return recentMonthsData;
};

export const getChartDataArrays = (recentMonthsData: RecentMonthsDataType) => {
  const labels = [];
  const totalPriceData = [];
  const totalCountData = [];

  // recentMonthsData 객체를 순회하며 필요한 데이터 추출
  for (const [month, data] of Object.entries(recentMonthsData)) {
    labels.push(month); // labels 배열에 달 추가
    totalPriceData.push(data.totalPrice); // totalPriceData 배열에 전체 매출 추가
    totalCountData.push(data.totalCount); // totalCountData 배열에 전체 주문수 추가
  }

  return { labels, totalPriceData, totalCountData };
};
