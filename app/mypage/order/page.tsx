import Link from "next/link";

import OrderItem from "@/components/mypage/OrderItem";
import StatusChip from "@/components/mypage/StatusChip";
import TableHeader from "@/components/table/TableHeader";

import { getOrderByUser } from "@/api/orderApis";

const HEADER_TITLES = ["주문정보", "총 결제금액", "주문상태"];

export default async function MyOrder() {
  const { status, message, data } = await getOrderByUser();

  if (status > 400 && status < 500) {
    throw new Error(message);
  }
  const orders = data;

  return (
    <div>
      <h2 className="mb-8 text-center">주문배송조회</h2>
      {orders?.length === 0 ? (
        <p className="text-center">주문 내역이 없습니다.</p>
      ) : (
        <table className="w-full">
          <TableHeader headers={HEADER_TITLES} />
          <tbody>
            {orders?.map((order) => (
              <tr className="border-b" key={order.id}>
                <td>
                  <Link href={`/mypage/order/${order.id}`}>
                    <OrderItem order={order} />
                  </Link>
                </td>
                <td className="text-center">
                  {order.total_price.toLocaleString()} 원
                </td>
                <td className="text-center">
                  <StatusChip status={order.order_status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
