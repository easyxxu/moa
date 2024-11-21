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
    <div className="text-nowrap w-36">
      <p className="text-2xl px-1 py-0.5 font-semibold border-b-4 border-gray-900">
        캐릭터
      </p>

      <ul className="py-2 px-1">
        {CHARACTER_OPTIONS.map((item, i) => (
          <li key={i} className="py-1.5">
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
