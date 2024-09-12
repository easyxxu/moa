"use client";
import Image from "next/image";
import PlusIcon from "@/public/assets/icon/icon-plus-round-white.svg";
import MinusIcon from "@/public/assets/icon/icon-minus-round-white.svg";
import ResultIcon from "@/public/assets/icon/icon-result-round-white.svg";
import { useCartCheckItems } from "@/contexts/CartContext";

export default function CartTotalPrice() {
  const { checkedItems } = useCartCheckItems();

  const productsPrice = checkedItems.reduce((acc, cur) => {
    //  각 store별로 배송비는 한번만 추가
    const existingStore = acc.find((item) => item.store === cur.store);

    if (existingStore) {
      existingStore.totalPrice += cur.price * cur.quantity;
    } else {
      acc.push({
        store: cur.store,
        totalPrice: cur.price * cur.quantity,
        shippingFee: cur.shipping_fee,
      });
    }

    return acc;
  }, [] as { store: string; totalPrice: number; shippingFee: number }[]);

  const totalProductPrice = productsPrice.reduce(
    (sum, item) => sum + item.totalPrice,
    0
  );

  const totalShippingFee = productsPrice.reduce(
    (sum, item) => sum + item.shippingFee,
    0
  );

  const finalPrice = productsPrice.reduce(
    (sum, item) => sum + item.totalPrice + item.shippingFee,
    0
  );

  return (
    <div className="w-full flex bg-primary shadow-out rounded-2xl justify-around *:py-12">
      <div className="total-price-box">
        <p>총 상품금액</p>
        <p>
          <strong className="text-2xl font-bold">
            {totalProductPrice.toLocaleString()}
          </strong>
          원
        </p>
      </div>
      <Image src={PlusIcon} alt="더하기 아이콘" />
      <div className="total-price-box">
        <p>상품 할인</p>
        <p>
          <strong className="text-2xl font-bold">0</strong>원
        </p>
      </div>
      <Image src={MinusIcon} alt="빼기 아이콘" />
      <div className="total-price-box">
        <p>배송비</p>
        <p>
          <strong className="text-2xl font-bold">
            {totalShippingFee.toLocaleString()}
          </strong>
          원
        </p>
      </div>
      <Image src={ResultIcon} alt="결과 아이콘" />
      <div className="total-price-box">
        <p>결제 예정 금액</p>
        <p>
          <strong className="text-2xl font-bold">
            {finalPrice.toLocaleString()}
          </strong>
          원
        </p>
      </div>
    </div>
  );
}
