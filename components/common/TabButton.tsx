"use client";

import { useState } from "react";

const TabList = ["상품정보", "후기", "문의", "반품/교환정보"];

export default function TabButton() {
  const [tabIdx, setTabIdx] = useState(0);

  const handleTabActive = (idx: number) => {
    setTabIdx(idx);
  };

  return (
    <div className="flex [&_button]:tab-btn-active">
      {TabList.map((item, idx) => (
        <button
          key={idx}
          onClick={() => handleTabActive(idx)}
          className={`${
            tabIdx === idx ? "border-b-primary" : "border-inherit"
          }`}
        >
          {item}
        </button>
      ))}
    </div>
  );
}
