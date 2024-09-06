import Image from "next/image";
import PlusIcon from "@/public/assets/icon/icon-plus-round-white.svg";
import MinusIcon from "@/public/assets/icon/icon-minus-round-white.svg";
import ResultIcon from "@/public/assets/icon/icon-result-round-white.svg";

export default function CartTotalPrice() {
  return (
    <div className="w-full flex bg-primary shadow-out rounded-2xl justify-around *:py-12">
      <div className="total-price-box">
        <p>총 상품금액</p>
        <p>
          <strong className="font-bold text-2xl">100,000</strong>원
        </p>
      </div>
      <Image src={PlusIcon} alt="더하기 아이콘" />
      <div className="total-price-box">
        <p>상품 할인</p>
        <p>
          <strong className="font-bold text-2xl">100,000</strong>원
        </p>
      </div>
      <Image src={MinusIcon} alt="빼기 아이콘" />
      <div className="total-price-box">
        <p>배송비</p>
        <p>
          <strong className="font-bold text-2xl">100,000</strong>원
        </p>
      </div>
      <Image src={ResultIcon} alt="결과 아이콘" />
      <div className="total-price-box">
        <p>결제 예정 금액</p>
        <p>
          <strong className="font-bold text-2xl">100,000</strong>원
        </p>
      </div>
    </div>
  );
}
