"use client";

import { CATEGORY_OPTIONS } from "@/utils/constants/filterOptions";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

export default function FilterProduct() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const currentPath = usePathname();
  const selectedCategory = searchParams.get("category") || "all";
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
    <div className="w-full pr-32">
      <ul className="flex text-nowrap overflow-y-auto [&::-webkit-scrollbar]:hidden">
        {CATEGORY_OPTIONS.map((item, i) => (
          <li key={i} className="px-3 py-2 sm:border-r sm:border-r-gray-500">
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
