"use client";

import { useRef, useState } from "react";

import TabButton from "./TabButton";
import Image from "next/image";
import ProductReviews from "./ProductReviews";
import QuestionForm from "./QuestionForm";
import QuestionList, { QAsType } from "./QuestionList";
import ReturnExchangeInfo from "./ReturnExchangeInfo";

interface Props {
  description: string | null;
  image: string[];
}
export default function DetailContent({ description, image }: Props) {
  const scrollRef = useRef<(HTMLDivElement | null)[]>([]);
  const [isOpenQForm, setIsOpenQForm] = useState(false);
  const [qas, setQas] = useState<QAsType>({ data: [], count: 0 });
  return (
    <div className="flex flex-col gap-10">
      <TabButton scrollRef={scrollRef} />
      {/* 상품정보 */}
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
      {/* 상품후기 */}
      <div className="" ref={(ref) => (scrollRef.current[1] = ref)}>
        <h3 className="pb-1 text-xl font-semibold border-b-2 border-black">
          상품 후기
        </h3>
        <ProductReviews />
      </div>
      {/* 상품문의 */}
      <div className="" ref={(ref) => (scrollRef.current[2] = ref)}>
        <div className="flex justify-between pb-1 border-b-2 border-black">
          <h3 className="text-xl font-semibold">상품 문의</h3>
          <button
            type="button"
            onClick={() => setIsOpenQForm(true)}
            className="font-medium underline"
          >
            문의 작성
          </button>
        </div>
        {isOpenQForm && (
          <div className="mt-4">
            <QuestionForm setIsOpenQForm={setIsOpenQForm} setQas={setQas} />
          </div>
        )}
        <QuestionList setQas={setQas} qas={qas} />
      </div>
      {/* 반품/교환정보 */}
      <div ref={(ref) => (scrollRef.current[3] = ref)}>
        <ReturnExchangeInfo />
      </div>
    </div>
  );
}
