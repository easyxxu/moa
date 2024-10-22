"use client";

import { useRef } from "react";

import TabButton from "../common/button/TabButton";
import Image from "next/image";
import ProductReviews from "./ProductReviews";

interface Props {
  description: string | null;
  image: string[];
}
export default function DetailContent({ description, image }: Props) {
  const scrollRef = useRef<(HTMLDivElement | null)[]>([]);

  return (
    <div className="">
      <TabButton scrollRef={scrollRef} />
      <div
        className="flex flex-col items-center py-3"
        ref={(ref) => (scrollRef.current[0] = ref)}
      >
        {description && <p className="mb-2">{description}</p>}
        {image.map((img, idx) => (
          <Image
            src={img}
            alt=""
            width={300}
            height={300}
            className="w-1/3"
            key={idx}
          />
        ))}
      </div>
      <div className="" ref={(ref) => (scrollRef.current[1] = ref)}>
        <ProductReviews />
      </div>
      <div className="h-[500px]" ref={(ref) => (scrollRef.current[2] = ref)}>
        문의
      </div>
      <div ref={(ref) => (scrollRef.current[3] = ref)}>
        <p className="text-xl font-semibold">반품/교환정보 안내</p>
        <div className="py-2 pl-4">
          <ul className="leading-7 list-disc">
            <li>상품 수령 후 7일 이내 교환/반품을 요청해야 합니다.</li>
            <li>
              교환/반품 시 반품비용은 선결제함으로 동제하지 마시고, 동봉하여
              발송하신 경우 확인 후 반품비 환불 처리됩니다.
            </li>
            <li>
              고객님의 사유로 교환 진행 중인 상품이 품절될 경우, 반품비가 발생할
              수 있으며 이를 제외한 결제금액이 환불 처리됩니다.
            </li>
            <li>
              반품 주소지는 브랜드(업체)마다 다르므로 확인 후 각각 보내셔야
              합니다.
            </li>
            <li>
              수령하신 택배사가 아닌 다른 택배사로 발송하는 경우(신규 택배 접수
              포함) 추가 비용이 발생할 수 있습니다.
            </li>
            <li>
              상품을 반환받은 날로부터 영업일 기준 3일 내 지급받은 대금을
              환급합니다.
            </li>
            <li>
              도서산간 지역의 경우 결제사힌 시본 교환/반품 배소입 외에 편도 기준
              최대 8천원(왕복 기준 최대 16천원)까지 추가 비용이 발생할 수
              있습니다. 택배사, 판매업체, 지역별로 도서산간 발생 금액이 상이해
              구매 시점에서는 정확한 금액 안내가 어렵습니다.
            </li>
          </ul>
        </div>
        <p className="text-lg font-semibold">교환/반품이 불가능한 경우</p>
        <div className="py-2 pl-4">
          <ul className="leading-7 list-disc">
            <li>반품 요청 기간(수령 후 7일 이내)이 경과한 경우</li>
            <li>
              상품을 사용(또는 착용, 착화) 혹은 훼손하여 재판매가 어려울 정도로
              상품가치가 현저히 감소한 경우
            </li>
            <li>
              상품의 택 또는 라벨 제거, 분리, 분실, 훼손하거나 세트 구성품을
              누락한 경우
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
