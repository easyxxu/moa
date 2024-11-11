import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import DetailContent from "@/components/productDetail/DetailContent";
import ProductPurchaseOptions from "@/components/productDetail/ProductPurchaseOptions";
import StarRating from "@/components/common/StarRating";
import { loadProductById } from "@/api/apis";

type Props = {
  params: Promise<{ productId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = (await params).productId;

  const res = await loadProductById(+id);

  const productImage = res.data.image[0] || "";

  return {
    title: res.data.name,
    openGraph: {
      images: [productImage],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: { productId: string };
}) {
  const productId = +params.productId;
  const { data } = await loadProductById(productId);
  if (!data) return;

  return (
    <div className="space-y-4">
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
          <div>
            <h2 className="mb-2">{data.name}</h2>
            <StarRating rating={data.average_rating!} size={24} />
          </div>
          <div>
            <p>배송비: {data.shipping_fee.toLocaleString()} 원</p>
            <ProductPurchaseOptions
              price={data.price}
              likedCnt={data.liked_count}
              likedList={data.liked_list}
            />
          </div>
        </div>
      </div>
      <DetailContent description={data.description} image={data.image} />
    </div>
  );
}
