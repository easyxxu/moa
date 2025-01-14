import { Tables } from "@/types/database.types";
import OrderProductItem from "./OrderProductItem";

interface Product {
  image: string[];
  name: string;
  price: number;
  seller_store: string;
  shipping_fee: number;
}

interface OrderItem extends Tables<"order_item"> {
  product: Product | null;
}

interface Order extends Tables<"order"> {
  order_item: OrderItem[];
}

interface Props {
  order: Order;
}

export default function OrderItem({ order }: Props) {
  return (
    <div className="px-2 py-2 sm:py-3">
      {/* 주문 일자 */}
      <p className="text-sm font-medium sm:text-lg">
        {new Date(order.created_at).toLocaleString()}
      </p>
      {/* 주문한 제품 내역 */}
      <ul>
        {order.order_item.map((item) => (
          <li key={item.id}>
            <OrderProductItem
              image={item.product?.image[0]!}
              name={item.product?.name!}
              price={item.price}
              seller_store={item.product?.seller_store!}
              quantity={item.quantity}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
