"use client";

import { MutableRefObject, useEffect, useState } from "react";

const TabList = ["상품정보", "후기", "문의", "반품/교환정보"];

export default function TabButton({
  scrollRef,
}: {
  scrollRef: MutableRefObject<(HTMLDivElement | null)[]>;
}) {
  const [tabIdx, setTabIdx] = useState<null | number>(null);

  const handleTabActive = (idx: number) => {
    setTabIdx(idx);
    const y = scrollRef.current[idx]?.offsetTop! - 180;
    window.scrollTo(0, y);
  };

  // scroll 위치에 따라 탭 버튼 스타일 변경
  useEffect(() => {
    const changeTabBtnStyle = () => {
      scrollRef.current.forEach((ref: HTMLDivElement | null, idx: number) => {
        if (ref && ref.getBoundingClientRect().y < 181) {
          setTabIdx(idx);
        }
      });
    };
    window.addEventListener("scroll", changeTabBtnStyle);
    return () => {
      window.removeEventListener("scroll", changeTabBtnStyle);
    };
  }, [scrollRef]);

  return (
    <div className="bg-background flex [&_button]:tab-btn-active sticky top-[88px] sm:top-[104px]">
      {TabList.map((item, idx) => (
        <button
          key={idx}
          type="button"
          onClick={() => handleTabActive(idx)}
          className={`${
            tabIdx === idx ? "border-b-black font-semibold" : "border-inherit"
          }`}
        >
          {item}
        </button>
      ))}
    </div>
  );
}
