import { OrderStatus } from "@/types/order";

interface Props {
  status: OrderStatus;
}
export default function StatusChip({ status }: Props) {
  return (
    <div className="font-light text-font-grey">
      <p>{status === "PAYMENT_PENDING" ? "결제대기" : "결제완료"}</p>
    </div>
  );
}
