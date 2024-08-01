import Button from "@/components/common/button/Button";
import DetailContent from "@/components/productDetail/DetailContent";
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import Link from "next/link";
import LikeIcon from "@/public/assets/icon/icon-heart.svg";
import UnLikeIcon from "@/public/assets/icon/icon-unheart.svg";
import QuantityButton from "@/components/common/button/QuantityButton";
import { loadProductById } from "@/api/apis";
import ProductPurchaseOptions from "@/components/productDetail/ProductPurchaseOptions";

interface ProductType {
  name: string;
  price: number;
  description: string;
  shipping_fee: number;
  stock: number;
  image: string;
  seller: string;
  seller_store: string;
}
export default async function ProductPage({
  params,
}: {
  params: { productId: string };
}) {
  const productId = params.productId;
  const { data } = await loadProductById(+productId);
  if (!data) return;

  return (
    <div className="flex flex-col gap-3 mx-auto my-0 max-w-7xl">
      <div className="my-5">
        <Link href={`/${data.seller_store}`}>{data.seller_store}</Link>
      </div>
      <div className="flex gap-12">
        <Image
          src={data.image[0]}
          alt={data.name}
          width={300}
          height={300}
          className="w-2/5 shadow-out rounded-2xl"
        />
        <div className="flex flex-col justify-between w-3/5">
          <div className="">
            <h2 className="text-2xl font-bold">{data.name}</h2>
            <p>평점</p>
          </div>
          <div>
            <p>배송비: {data.shipping_fee.toLocaleString()} 원</p>
            <ProductPurchaseOptions price={data.price} />
          </div>
        </div>
      </div>
      <DetailContent description={data.description} image={data.image} />
    </div>
  );
}
