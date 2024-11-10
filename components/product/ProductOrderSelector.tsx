"use client";

import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import ArrowIcon from "@/public/assets/icon/icon-arrow.svg";
import { ORDER_OPTIONS } from "@/utils/constants/filterOptions";

export default function ProductOrderSelector() {
  const searchParams = useSearchParams();
  const currentPath = usePathname();
  const { replace } = useRouter();
  const [isSelectBoxOpen, setIsSelectBoxOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(ORDER_OPTIONS[0].name);

  const selectedOrderText = ORDER_OPTIONS.find(
    (item) => item.name === selectedOrder
  )?.text;

  const handleSelectOrder = (name: string) => {
    setSelectedOrder(name);
    setIsSelectBoxOpen(false); // 옵션 선택 후 select box 닫기
    const params = new URLSearchParams(searchParams);

    if (name) {
      params.set("order", name);
    } else {
      params.delete("order");
    }
    replace(`${currentPath}?${params.toString()}`);
  };

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={() => setIsSelectBoxOpen((prev) => !prev)}
        className="flex items-center justify-between w-32 px-2 py-2 text-gray-700 border rounded"
      >
        {selectedOrderText}
        <Image
          src={ArrowIcon}
          alt="더보기"
          width={18}
          height={18}
          className={isSelectBoxOpen ? "rotate-90" : "-rotate-90"}
        />
      </button>

      {isSelectBoxOpen && (
        <ul className="absolute w-full mt-2 bg-white border rounded shadow-lg">
          {ORDER_OPTIONS.map((option) => (
            <li
              key={option.name}
              onClick={() => handleSelectOrder(option.name)}
              className="px-5 py-2 cursor-pointer text-nowrap hover:bg-gray-100"
            >
              {option.text}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
