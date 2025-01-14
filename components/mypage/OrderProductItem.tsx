import Image from "next/image";

interface Props {
  image: string;
  name: string;
  seller_store: string;
  price: number;
  quantity: number;
}

export default function OrderProductItem({
  image,
  name,
  seller_store,
  price,
  quantity,
}: Props) {
  return (
    <div className="flex flex-col gap-1 my-2 text-sm sm:text-base sm:flex-row sm:gap-4 sm:my-3">
      <Image
        src={image}
        alt={`${name} 이미지`}
        width={100}
        height={100}
        className="w-20 h-20 sm:w-24 sm:h-24"
      />
      <div className="flex flex-col gap-0.5">
        <p className="text-font-grey">{seller_store}</p>
        <p className="font-medium sm:font-semibold sm:text-base">{name}</p>
        <p>{price.toLocaleString()}원</p>
        <p className="">수량 {quantity}개</p>
      </div>
    </div>
  );
}
