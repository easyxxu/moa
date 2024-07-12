import Image from "next/image";
import HeartIcon from "@/public/assets/icon/icon-unheart.svg";
import Button from "../common/Button";
interface CardItemProps {
  src: string;
  name: string;
  price: number;
}
export default function CardItem({ src, name, price }: CardItemProps) {
  return (
    <div className="w-64 shadow-out rounded-xl">
      <Image src={src} alt={name} width={268} height={270} className="w-full" />
      <div className="px-4 py-3 bg-white rounded-b-xl font-extralight">
        <div className="flex justify-between">
          <p>{name}</p>
          <button type="button">
            <Image src={HeartIcon} alt="좋아요" />
          </button>
        </div>
        <p>{price} 원</p>
      </div>
    </div>
  );
}
