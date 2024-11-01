import OrderItem from "@/components/mypage/OrderItem";
import OrderTableHeader from "@/components/mypage/OrderTableHeader";
import StatusChip from "@/components/mypage/StatusChip";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

const HEADER_TITLES = ["주문정보", "총 결제금액", "주문상태"];

export default async function MyOrder() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: orders, error } = await supabase
    .from("order")
    .select(
      `
    *,
    order_item (
      *,
      product ( name, price, image, seller_store, shipping_fee )
    )
  `
    )
    .eq("customer_id", user?.id!);

  if (!orders || orders.length === 0) {
    return <p className="text-center">주문내역이 없습니다.</p>;
  }
  if (error) {
    console.error("마이페이지 주문조회 에러", error);
  }

  return (
    <div>
      <h2 className="mb-8 text-center">주문배송조회</h2>
      <table className="w-full">
        <OrderTableHeader titles={HEADER_TITLES} />
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
    </div>
  );
}
