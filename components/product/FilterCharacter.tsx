"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { CHARACTER_OPTIONS } from "@/utils/constants/filterOptions";

export default function FilterCharacter() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const currentPath = usePathname();
  const selectedCharacter = searchParams.get("character");

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
    <div className="border-gray-900 border-y sm:border-none text-nowrap sm:w-36">
      <p className="hidden sm:block text-2xl px-1 py-0.5 font-semibold border-b-4 border-gray-900">
        캐릭터
      </p>

      <ul className="flex px-1 py-2 sm:flex-col">
        {CHARACTER_OPTIONS.map((item, i) => (
          <li key={i} className="px-2 sm:py-1.5">
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
    </div>
  );
}
