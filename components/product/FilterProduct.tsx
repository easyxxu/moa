"use client";

import { CATEGORY_OPTIONS } from "@/utils/constants/filterOptions";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

export default function FilterProduct() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const currentPath = usePathname();
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
    <div>
      <ul className="flex text-nowrap">
        {CATEGORY_OPTIONS.map((item, i) => (
          <li key={i} className="px-4 border-r border-r-gray-500">
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
