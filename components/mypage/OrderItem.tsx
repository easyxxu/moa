import { OrderWithOrderItem } from "@/types/order";
import OrderProductItem from "./OrderProductItem";

interface Props {
  order: OrderWithOrderItem;
}
export default function OrderItem({ order }: Props) {
  return (
    <div className="px-2 py-3">
      <div className="flex items-center gap-2 mb-4">
        <p className="text-lg font-medium">
          {new Date(order.created_at).toLocaleString()}
        </p>
      </div>
      <ul>
        {order.order_item.map((item) => (
          <li key={item.id}>
            <OrderProductItem
              image={item.product.image[0]}
              name={item.product.name}
              price={item.price}
              seller_store={item.product.seller_store}
              quantity={item.quantity}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
