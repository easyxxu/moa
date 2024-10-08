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
    <div className="flex gap-4 my-4">
      <Image src={image} alt={`${name} 이미지`} width={100} height={100} />
      <div className="flex flex-col gap-0.5">
        <p className="text-sm text-font-grey">{seller_store}</p>
        <p className="font-semibold">{name}</p>
        <p>{price.toLocaleString()}원</p>
        <p className="text-sm">수량 {quantity}개</p>
      </div>
    </div>
  );
}
