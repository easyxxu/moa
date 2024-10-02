"use client";
import { useCartCheckItems } from "@/contexts/CartContext";

export default function OrderTotalPrice() {
  const { price } = useCartCheckItems();

  return (
    <div className="bg-primary rounded-2xl flex justify-around">
      <p>상품금액: {price.productsPrice}</p>
      <p>배송비: {price.shippingFee}</p>
      <p>총 결제 금액: {price.totalPrice}</p>
    </div>
  );
}
