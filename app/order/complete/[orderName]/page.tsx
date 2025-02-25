import { fetchOrderDetail } from "@/api/orderApis";
import CardItem from "@/components/common/productCard/CardItem";
import Link from "next/link";

export default async function OrderComplete({
  params: { orderName },
}: {
  params: { orderName: string };
}) {
  const res = await fetchOrderDetail(orderName);
  if (res.status !== 200) {
    throw new Error(res.message);
  }
  const orderProducts = res.data?.order_item.map((item) => item.product);

  return (
    <div className="flex flex-col items-center justify-center gap-8 px-6 py-24 text-gray-800">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-bold">주문이 완료되었습니다!</h2>
        <p className="text-gray-600 ">
          <span className="font-semibold">주문번호:</span> {orderName}{" "}
          <span className="font-semibold">주문 일자: </span>
          {new Date(res.data?.created_at!).toLocaleString("ko-KR", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>

      <div className="flex justify-center gap-4">
        {orderProducts && orderProducts.length > 0 ? (
          orderProducts.map((product) => (
            <div key={product?.id} className="">
              <CardItem
                id={product?.id!}
                src={product?.image[0]!}
                name={product?.name!}
              />
            </div>
          ))
        ) : (
          <p className="text-gray-500">주문한 상품이 없습니다.</p>
        )}
      </div>

      <div className="flex mt-8 space-x-4">
        <Link
          href={`/mypage/order/${res.data?.id}`}
          className="px-6 py-3 transition-shadow duration-300 border border-black rounded-sm hover:shadow-md"
        >
          주문상세보기
        </Link>
        <Link
          href={`/`}
          className="px-6 py-3 text-white transition-shadow duration-300 bg-black rounded-sm hover:shadow-md"
        >
          쇼핑 계속하기
        </Link>
      </div>
    </div>
  );
}
