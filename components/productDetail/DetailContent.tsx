"use client";

import { useRef } from "react";

import TabButton from "../common/TabButton";

export default function DetailContent() {
  const scrollRef = useRef<(HTMLDivElement | null)[]>([]);

  return (
    <div>
      <TabButton scrollRef={scrollRef} />
      <div
        className="border-4 h-[500px]"
        ref={(ref) => (scrollRef.current[0] = ref)}
      >
        상품정보
      </div>
      <div
        className="border-4 h-[500px]"
        ref={(ref) => (scrollRef.current[1] = ref)}
      >
        상품 후기
      </div>
      <div
        className="border-4 h-[500px]"
        ref={(ref) => (scrollRef.current[2] = ref)}
      >
        문의
      </div>
      <div
        className="border-4 h-[500px]"
        ref={(ref) => (scrollRef.current[3] = ref)}
      >
        반품/교환정보
      </div>
    </div>
  );
}
