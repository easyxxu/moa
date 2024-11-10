"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
  CATEGORY_OPTIONS,
  CHARACTER_OPTIONS,
} from "@/utils/constants/filterOptions";

export default function SideCategory() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const currentPath = usePathname();
  const selectedCharacter = searchParams.get("character");
  const selectedCategory = searchParams.get("category");

  const handleFilter = (filterType: string, filterName: string) => {
    const params = new URLSearchParams(searchParams);
    if (filterType && filterName) {
      params.set(filterType, filterName);
    } else {
      params.delete(filterType);
    }
    replace(`${currentPath}?${params.toString()}`);
  };

  return (
    <div className="text-nowrap">
      <p className="text-2xl font-semibold">캐릭터</p>
      <ul>
        {CHARACTER_OPTIONS.map((item, i) => (
          <li key={i} className="py-1">
            <button
              onClick={() => handleFilter("character", item.name)}
              className={`${
                selectedCharacter === item.name ? "font-semibold" : ""
              }`}
            >
              {item.text}
            </button>
          </li>
        ))}
      </ul>
      <p className="text-2xl font-semibold">카테고리</p>
      <ul>
        {CATEGORY_OPTIONS.map((item, i) => (
          <li key={i} className="py-1">
            <button
              onClick={() => handleFilter("category", item.name)}
              className={`${
                selectedCategory === item.name ? "font-semibold" : ""
              }`}
            >
              {item.text}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
