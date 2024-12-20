import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import DetailContent from "@/components/productDetail/DetailContent";
import ProductPurchaseOptions from "@/components/productDetail/ProductPurchaseOptions";
import StarRating from "@/components/common/StarRating";
import ShopIcon from "@/public/assets/icon/icon-shop.svg";
import { loadProductById } from "@/api/productApis";

type Props = {
  params: Promise<{ productId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = (await params).productId;
  const res = await loadProductById(+id);
  const productImage = res.data?.image[0] || "";

  return {
    title: res.data?.name,
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
    <div className="px-2 space-y-4">
      <div className="flex flex-col w-full gap-6 sm:gap-12 sm:flex-row">
        <Image
          src={data.image[0]}
          alt={data.name}
          width={300}
          height={300}
          className="w-full rounded-sm aspect-square sm:w-2/5"
        />
        <div className="flex flex-col justify-between sm:w-3/5">
          <div className="mb-2">
            <div className="flex gap-2 mb-2">
              <Image src={ShopIcon} alt="샵 아이콘" width={20} height={20} />
              {data.seller_store}
            </div>
            <h2 className="mb-2">{data.name}</h2>
            <StarRating rating={data.average_rating!} size={24} />
          </div>
          <div>
            <p>배송비: {data.shipping_fee.toLocaleString()} 원</p>
            <ProductPurchaseOptions
              price={data.price}
              shippingFee={data.shipping_fee}
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
