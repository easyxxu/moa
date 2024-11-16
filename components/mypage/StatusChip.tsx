interface Props {
  status: string;
}

const statusMap: Record<string, string> = {
  PAYMENT_PENDING: "결제대기중",
  PAYMENT_COMPLETED: "결제완료",
  PAYMENT_FAILED: "결제실패",
  PAYMENT_CANCELED: "결제취소됨",
  PAYMENT_REFUNDED: "결제환불됨",
};

export default function StatusChip({ status }: Props) {
  return (
    <div className="py-1 font-light border border-gray-400 rounded-sm text-font-grey">
      <p>{statusMap[status]}</p>
    </div>
  );
}
