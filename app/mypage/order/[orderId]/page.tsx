import Link from "next/link";
import OrderProductItem from "@/components/mypage/OrderProductItem";
import StatusChip from "@/components/mypage/StatusChip";
import TableHeader from "@/components/common/table/TableHeader";
import { createClient } from "@/utils/supabase/server";

const HEADER_TITLES = ["주문정보", "배송비", "주문상태", "리뷰작성"];
const ORDERER_INFO_TH_STYLE =
  "w-1/4 px-4 py-2 text-gray-800 border-r border-gray-900 font-normal";

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
    <div className="flex flex-col w-full gap-6 px-2 ">
      {/* 주문 상세 정보 */}
      <section className="space-y-2">
        <h3 className="pb-2 text-xl font-semibold border-b-4 border-gray-900 sm:text-2xl">
          주문상세내역
        </h3>
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
      <section className="space-y-2">
        <h4 className="text-lg font-semibold sm:text-xl">주문상품정보</h4>
        <div className="border-b border-gray-900 ">
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
        </div>
        <p className="text-lg font-semibold text-right">
          총 결제금액: {order.total_price.toLocaleString()} 원
        </p>
      </section>

      {/* 주문자 정보 */}
      <section className="space-y-2">
        <h4 className="text-lg font-semibold sm:text-xl">주문자정보</h4>
        <table className="w-full text-left border border-gray-900">
          <tbody>
            <tr>
              <th className={`${ORDERER_INFO_TH_STYLE}`}>이름</th>
              <td className="px-4 py-2">{order.customer_name}</td>
            </tr>
            <tr>
              <th className={`${ORDERER_INFO_TH_STYLE}`}>전화번호</th>
              <td className="px-4 py-2">{order.customer_phone}</td>
            </tr>
            <tr>
              <th className={`${ORDERER_INFO_TH_STYLE}`}>이메일</th>
              <td className="px-4 py-2">{order.customer_email}</td>
            </tr>
            <tr>
              <th className={`${ORDERER_INFO_TH_STYLE}`}>주소</th>
              <td className="px-4 py-2">{order.customer_address}</td>
            </tr>
            <tr>
              <th className={`${ORDERER_INFO_TH_STYLE}`}>배송메세지</th>
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
