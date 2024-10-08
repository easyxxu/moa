import OrderItem from "@/components/mypage/OrderItem";
import OrderTableHeader from "@/components/mypage/OrderTableHeader";
import StatusChip from "@/components/mypage/StatusChip";
import { OrderWithOrderItem } from "@/types/order";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

const HEADER_TITLES = ["주문정보", "총 결제금액", "주문상태", "리뷰작성"];

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
    .eq("customer_id", user?.id);

  if (!orders || orders.length === 0) {
    return <p className="text-center">주문내역이 없습니다.</p>;
  }
  if (error) {
    console.error("마이페이지 주문조회 에러", error);
  }
  const ordersData: OrderWithOrderItem[] = orders;
  return (
    <div className="w-4/5">
      <h2 className="mb-8 text-3xl font-semibold text-center">주문배송조회</h2>
      <table className="w-full">
        <OrderTableHeader titles={HEADER_TITLES} />
        <tbody>
          {ordersData?.map((order) => (
            <tr className="border-b">
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
              <td className="text-center">
                <Link href="/">작성하기</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
