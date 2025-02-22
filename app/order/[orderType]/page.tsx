import OrderForm from "@/components/order/OrderForm";
import OrderList from "@/components/order/OrderList";
import OrderTotalPrice from "@/components/order/OrderTotalPrice";
import TableHeader from "@/components/common/table/TableHeader";

const ORDER_HEADER = ["상품정보", "할인", "배송비", "주문금액"];

export default function OrderPage() {
  return (
    <div className="px-2">
      <h2 className="my-3 text-center">주문</h2>
      <table className="w-full">
        <TableHeader headers={ORDER_HEADER} />
        <OrderList />
      </table>
      <OrderTotalPrice />
      <OrderForm />
    </div>
  );
}
