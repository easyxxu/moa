import OrderList from "@/components/order/OrderList";
import TableHeader from "@/components/table/TableHeader";

const ORDER_HEADER = ["상품정보", "할인", "배송비", "주문금액"];

export default function OrderPage() {
  return (
    <>
      <h2>주문하기</h2>
      <table className="w-full">
        <TableHeader headers={ORDER_HEADER} />
        <OrderList />
      </table>
    </>
  );
}
