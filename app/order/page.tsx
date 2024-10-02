import OrderForm from "@/components/order/OrderForm";
import OrderList from "@/components/order/OrderList";
import OrderTotalPrice from "@/components/order/OrderTotalPrice";
import TableHeader from "@/components/table/TableHeader";

const ORDER_HEADER = ["상품정보", "할인", "배송비", "주문금액"];

export default function OrderPage() {
  return (
    <>
      <h2 className="text-2xl font-semibold my-3 text-center">주문</h2>
      <table className="w-full">
        <TableHeader headers={ORDER_HEADER} />
        <OrderList />
      </table>
      <OrderTotalPrice />
      <OrderForm />
    </>
  );
}
