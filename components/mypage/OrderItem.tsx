import { OrderWithOrderItem } from "@/types/order";
import OrderProductItem from "./OrderProductItem";

interface Props {
  order: OrderWithOrderItem;
}
export default function OrderItem({ order }: Props) {
  const dateStr = order.order_name.split("_")[0];
  const timeStr = order.order_name.split("_")[1];

  const year = dateStr.slice(0, 4);
  const month = dateStr.slice(4, 6);
  const day = dateStr.slice(6, 8);

  const hours = timeStr.slice(0, 2);
  const minutes = timeStr.slice(2, 4);
  const seconds = timeStr.slice(4, 6);

  const orderTitleDate = `${year}.${month}.${day}`;
  const orderTitleTime = `${hours}:${minutes}:${seconds}`;
  return (
    <div className="my-4 border-b">
      <div className="flex items-center gap-2 mb-4">
        <p className="text-lg font-light">
          <strong className="mr-1 text-xl font-semibold ">
            {orderTitleDate}
          </strong>
          {orderTitleTime}
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
