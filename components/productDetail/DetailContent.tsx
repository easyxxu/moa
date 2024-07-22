"use client";

import { useRef } from "react";

import TabButton from "../common/button/TabButton";
import Image from "next/image";

interface Props {
  description: string;
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
        <p className="mb-2">{description}</p>
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
      <div className="h-[500px]" ref={(ref) => (scrollRef.current[1] = ref)}>
        상품 후기
      </div>
      <div className="h-[500px]" ref={(ref) => (scrollRef.current[2] = ref)}>
        문의
      </div>
      <div className="h-[500px]" ref={(ref) => (scrollRef.current[3] = ref)}>
        반품/교환정보
      </div>
    </div>
  );
}
