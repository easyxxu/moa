"use client";

import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import ArrowIcon from "@/public/assets/icon/icon-arrow.svg";
import { ORDER_OPTIONS } from "@/utils/constants/filterOptions";

export default function ProductOrderSelector() {
  const searchParams = useSearchParams();
  const currentPath = usePathname();
  const currentFilter = searchParams.get("order");
  const { replace } = useRouter();
  const [isSelectBoxOpen, setIsSelectBoxOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(ORDER_OPTIONS[0].name);

  const selectedOrderText = ORDER_OPTIONS.find(
    (item) => item.name === selectedOrder
  )?.text;

  const handleSelectOrder = (name: string) => {
    setSelectedOrder(name);
    setIsSelectBoxOpen(false);
    const params = new URLSearchParams(searchParams);

    if (name) {
      params.set("order", name);
    } else {
      params.delete("order");
    }
    replace(`${currentPath}?${params.toString()}`);
  };

  useEffect(() => {
    if (currentFilter) {
      setSelectedOrder(currentFilter);
    } else {
      setSelectedOrder(ORDER_OPTIONS[0].name);
    }
  }, [currentFilter]);
  return (
    <div className="relative border-l border-l-gray-500">
      <button
        type="button"
        onClick={() => setIsSelectBoxOpen((prev) => !prev)}
        className="flex items-center justify-between w-32 px-3 py-2 text-gray-700"
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
        <ul className="absolute right-0 z-10 w-full mt-1 bg-white rounded-sm shadow-lg">
          {ORDER_OPTIONS.map((option) => (
            <li
              key={option.name}
              onClick={() => handleSelectOrder(option.name)}
              className="px-5 py-2 cursor-pointer text-nowrap hover:text-blue-400"
            >
              {option.text}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
