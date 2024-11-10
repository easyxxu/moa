"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { CHARACTER_OPTIONS } from "@/utils/constants/filterOptions";

const CATEGORY_TITLE = ["BEST", "NEW", "캐릭터"];

export default function Category() {
  const { replace } = useRouter();
  const [isDropDownVisible, setIsDropDownVisible] = useState<boolean>(false);
  const [category, setCategory] = useState<string | null>(null);
  const handleMoveFilterPage = (filterType: string, filterName: string) => {
    const params = new URLSearchParams();

    if (filterType && filterName) {
      params.set(filterType, filterName);
    } else {
      params.delete(filterType);
    }
    replace(`/products?${params.toString()}`);
  };
  return (
    <div className="relative">
      <ul
        onMouseEnter={() => {
          setIsDropDownVisible(true);
        }}
        onMouseLeave={() => {
          setIsDropDownVisible(false);
          // setCategory(null);
        }}
        className="flex gap-4 pb-4 text-xl font-medium text-gray-700 cursor-pointer"
      >
        {CATEGORY_TITLE.map((title, i) => (
          <li
            key={i}
            onMouseEnter={() => setCategory(title)}
            className="transition-colors duration-200 hover:text-blue-500"
          >
            {title}
          </li>
        ))}
      </ul>

      {isDropDownVisible && category === "캐릭터" && (
        <div
          onMouseEnter={() => setIsDropDownVisible(true)}
          onMouseLeave={() => setIsDropDownVisible(false)}
          className="absolute left-0 z-10 w-full p-4 bg-white rounded-lg shadow-md top-full"
        >
          <ul>
            {CHARACTER_OPTIONS.map((option, idx) => (
              <li
                key={idx}
                className="px-4 py-2 rounded-md cursor-pointer hover:bg-gray-100"
                value={option.name}
                onClick={() =>
                  handleMoveFilterPage(
                    category === "캐릭터" ? "character" : "category",
                    option.name
                  )
                }
              >
                {option.text}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
