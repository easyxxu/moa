import Button from "@/components/common/button/Button";
import DetailContent from "@/components/productDetail/DetailContent";
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import Link from "next/link";
import LikeIcon from "@/public/assets/icon/icon-heart.svg";
import UnLikeIcon from "@/public/assets/icon/icon-unheart.svg";
import QuantityButton from "@/components/common/button/QuantityButton";

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
  const supabase = createClient();
  const { data } = await supabase
    .from("product")
    .select(
      "name, price, description, shipping_fee, stock, image, seller_store"
    )
    .eq("id", productId)
    .single();

  if (!data) return;

  // console.log("#data: ", data);
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
            <div>
              <p>배송비: {data.shipping_fee.toLocaleString("ko-KR")} 원</p>
              <hr className="my-5" />
              <QuantityButton />
              <hr className="my-5" />
            </div>
            <div className="flex items-center justify-between my-5">
              <p className="font-semibold">총 상품 금액</p>
              <div className="flex items-center">
                <span className="mr-5">수량 : 1</span>
                <span className="text-3xl before:content-[''] before:absolute before:w-px before:h-6 before:bg-font-hover before:-translate-x-2.5 before:translate-y-1.5">
                  <strong>{data.price.toLocaleString("ko-KR")}</strong> 원
                </span>
              </div>
            </div>
            <div className="flex gap-3">
              <Button type="button" custom="w-10">
                <Image src={UnLikeIcon} alt="좋아요" />
              </Button>
              <Button type="button" custom="w-1/2 py-3 font-semibold">
                장바구니 담기
              </Button>
              <Button
                type="button"
                custom="w-1/2 py-3 bg-primary font-semibold"
              >
                바로 구매
              </Button>
            </div>
          </div>
        </div>
      </div>
      <DetailContent description={data.description} image={data.image} />
    </div>
  );
}
