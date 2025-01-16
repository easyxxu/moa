"use client";

import { useCartCheckItems } from "@/contexts/CartContext";

export default function MobileCartTotalPrice() {
  const { price } = useCartCheckItems();
  return (
    <div className="flex flex-col gap-3 px-2 text-lg sm:hidden">
      <PriceItem priceType="총 상품 금액" price={price.productsPrice} />
      <PriceItem priceType="상품 할인" price={0} />
      <PriceItem priceType="배송비" price={price.productsPrice} />
      <PriceItem priceType="결제 예정 금액" price={price.totalPrice} />
    </div>
  );
}

function PriceItem({ priceType, price }: { priceType: string; price: number }) {
  const isFinalPrice = priceType === "결제 예정 금액";
  return (
    <div className="flex justify-between">
      <span className="font-medium text-gray-800">{priceType}</span>
      <span className="font-semibold">{price.toLocaleString()}원</span>
    </div>
  );
}
