import OrderTableHeader from "@/components/mypage/OrderTableHeader";
import OrderProductItem from "@/components/mypage/OrderProductItem";
import StatusChip from "@/components/mypage/StatusChip";
import { OrderWithOrderItem } from "@/types/order";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

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

  const orderData: OrderWithOrderItem = order;

  return (
    <div className="flex flex-col w-full gap-4 p-4 shadow-out rounded-xl">
      <div>
        <div className="text-sm">
          <h3 className="mb-4 text-2xl font-medium">주문상세내역</h3>
          <span className="block w-full h-1 my-4 bg-gray-800" />
          <span className="mr-4">
            주문일자{" "}
            <strong>
              {new Date(orderData.created_at).toLocaleDateString()}
            </strong>
          </span>
          <span>
            주문번호 <strong>{orderData.order_name}</strong>
          </span>
        </div>
      </div>
      <div>
        <h3 className="my-4 text-2xl font-medium">주문상품정보</h3>
        <table className="w-full">
          <OrderTableHeader titles={HEADER_TITLES} />
          <tbody>
            {orderData.order_item?.map((item) => (
              <tr>
                <td>
                  <Link href={`/products/${item.item_id}`}>
                    <OrderProductItem
                      image={item.product.image[0]}
                      name={item.product.name}
                      price={item.price}
                      seller_store={item.product.seller_store}
                      quantity={item.quantity}
                    />
                  </Link>
                </td>
                <td className="text-center">
                  {item.shipping_fee.toLocaleString()} 원
                </td>
                <td className="text-center">
                  <StatusChip status={order.order_status} />
                </td>
                <td className="text-center">
                  <Link href={`/`}>작성하기</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <span className="block w-full h-1 my-4 bg-gray-800" />
        <p className="text-right">
          총 결제금액:{" "}
          <span className="font-semibold">
            {orderData.total_price.toLocaleString()}{" "}
          </span>
          원
        </p>
      </div>
      <div>
        <h3 className="my-4 text-2xl font-medium">주문자정보</h3>
        <span className="block w-full h-1 my-4 bg-gray-800" />
        <div>
          <table>
            <colgroup>
              <col width={100} />
              <col />
            </colgroup>
            <tbody>
              <tr>
                <th className="px-2 py-1 text-start">이름</th>
                <td>{orderData.customer_name}</td>
              </tr>
              <tr>
                <th className="px-2 py-1 text-start">전화번호</th>
                <td>{orderData.customer_phone}</td>
              </tr>
              <tr>
                <th className="px-2 py-1 text-start">이메일</th>
                <td>{orderData.customer_email}</td>
              </tr>
              <tr>
                <th className="px-2 py-1 text-start">주소</th>
                <td>{orderData.customer_address}</td>
              </tr>
              <tr>
                <th className="px-2 py-1 text-start">배송메세지</th>
                <td>
                  {orderData.customer_delivery_message?.length === 0
                    ? "-"
                    : orderData.customer_delivery_message}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
