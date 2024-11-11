"use client";
import { useCartCheckItems } from "@/contexts/CartContext";

export default function OrderTotalPrice() {
  const { price } = useCartCheckItems();

  return (
    <div className="flex justify-end gap-4 px-10 py-2 border-gray-900 border-y">
      <div className="flex gap-4">
        <p>상품금액: {price.productsPrice.toLocaleString()} 원</p>+
        <p>배송비: {price.shippingFee.toLocaleString()} 원</p>
      </div>
      =<p>총 결제 금액: {price.totalPrice.toLocaleString()} 원</p>
    </div>
  );
}
