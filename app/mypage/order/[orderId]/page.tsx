import Link from "next/link";
import OrderProductItem from "@/components/mypage/OrderProductItem";
import StatusChip from "@/components/mypage/StatusChip";
import TableHeader from "@/components/table/TableHeader";
import { createClient } from "@/utils/supabase/server";

const HEADER_TITLES = ["주문정보", "배송비", "주문상태", "리뷰작성"];

export default async function OrderDetailPage({
  params,
}: {
  params: { orderId: string };
}) {
  const orderId = params.orderId;
  const supabase = createClient();

  const { data: order, error } = await supabase
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
    .eq("id", orderId)
    .single();

  if (error) {
    throw new Error("서버에서 문제가 발생했습니다.");
  }
  if (!order) {
    return;
  }
  return (
    <div className="flex flex-col w-full gap-6 ">
      {/* 주문 상세 정보 */}
      <section className="pb-4 border-b-2">
        <h3 className="mb-4 text-2xl font-semibold">주문상세내역</h3>
        <p className="text-sm text-gray-700">
          주문일자{" "}
          <span className="font-medium">
            {new Date(order.created_at).toLocaleDateString()}
          </span>
          &nbsp;|&nbsp; 주문번호{" "}
          <span className="font-medium">{order.order_name}</span>
        </p>
      </section>

      {/* 주문 상품 정보 */}
      <section className="pb-4 border-b-2">
        <h3 className="mb-4 text-2xl font-semibold">주문상품정보</h3>
        <table className="w-full">
          <TableHeader headers={HEADER_TITLES} />
          <tbody>
            {order.order_item?.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="px-4 py-4">
                  <Link href={`/products/${item.item_id}`}>
                    <OrderProductItem
                      image={item.product?.image[0]!}
                      name={item.product?.name!}
                      price={item.price}
                      seller_store={item.product?.seller_store!}
                      quantity={item.quantity}
                    />
                  </Link>
                </td>
                <td className="px-4 py-4 text-center">
                  {item.shipping_fee.toLocaleString()} 원
                </td>
                <td className="px-4 py-4 text-center">
                  <StatusChip status={order?.order_status!} />
                </td>
                <td className="px-4 py-4 text-center">
                  {item.review_status ? (
                    "작성완료"
                  ) : (
                    <Link
                      href={`/mypage/review/write/${item.id}`}
                      className="text-blue-500 underline hover:text-blue-600"
                    >
                      작성하기
                    </Link>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-4 text-lg font-semibold text-right">
          총 결제금액: {order.total_price.toLocaleString()} 원
        </p>
      </section>

      {/* 주문자 정보 */}
      <section>
        <h3 className="mb-4 text-2xl font-semibold">주문자정보</h3>
        <table className="w-full text-left border border-gray-300">
          <tbody>
            <tr>
              <th className="w-1/4 px-4 py-2 text-gray-700 bg-gray-100">
                이름
              </th>
              <td className="px-4 py-2">{order.customer_name}</td>
            </tr>
            <tr>
              <th className="w-1/4 px-4 py-2 text-gray-700 bg-gray-100">
                전화번호
              </th>
              <td className="px-4 py-2">{order.customer_phone}</td>
            </tr>
            <tr>
              <th className="w-1/4 px-4 py-2 text-gray-700 bg-gray-100">
                이메일
              </th>
              <td className="px-4 py-2">{order.customer_email}</td>
            </tr>
            <tr>
              <th className="w-1/4 px-4 py-2 text-gray-700 bg-gray-100">
                주소
              </th>
              <td className="px-4 py-2">{order.customer_address}</td>
            </tr>
            <tr>
              <th className="w-1/4 px-4 py-2 text-gray-700 bg-gray-100">
                배송메세지
              </th>
              <td className="px-4 py-2">
                {order.customer_delivery_message?.length === 0
                  ? "-"
                  : order.customer_delivery_message}
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
}
