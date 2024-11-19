"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CHARACTER_OPTIONS } from "@/utils/constants/filterOptions";
import Link from "next/link";

const CATEGORYS = [
  { text: "BEST", src: "order=mostOrders" },
  { text: "NEW", src: "order=latest" },
  { text: "CHARACTER", src: "" },
];

export default function ProductNav() {
  const pathname = usePathname();
  const isProductDetailPage = /^\/products\/\d+$/.test(pathname);
  const { replace } = useRouter();
  const [isDropDownVisible, setIsDropDownVisible] = useState<boolean>(false);
  const [category, setCategory] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const handleMoveFilterPage = (filterType: string, filterName: string) => {
    const params = new URLSearchParams();

    if (filterType && filterName) {
      params.set(filterType, filterName);
    } else {
      params.delete(filterType);
    }
    replace(`/products?${params.toString()}`);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div
      className={`bg-white sticky top-[87px] z-20 ${
        isScrolled && !isProductDetailPage ? "shadow-md" : ""
      }`}
    >
      <div className="mx-auto max-w-7xl">
        <ul
          onMouseEnter={() => {
            setIsDropDownVisible(true);
          }}
          onMouseLeave={() => {
            setIsDropDownVisible(false);
            // setCategory(null);
          }}
          className="flex gap-4 px-2 pb-2 text-2xl cursor-pointer font-extralight"
        >
          {CATEGORYS.map((category, i) => (
            <li
              key={i}
              onMouseEnter={() => setCategory(category.text)}
              className="transition-colors duration-200 hover:text-blue-500"
            >
              <Link href={`/products?${category.src}`}>{category.text}</Link>
            </li>
          ))}
        </ul>

        {isDropDownVisible && category === "CHARACTER" && (
          <div
            onMouseEnter={() => setIsDropDownVisible(true)}
            onMouseLeave={() => setIsDropDownVisible(false)}
            className="fixed left-0 w-full bg-white shadow-md"
          >
            <ul className="mx-auto mb-2 max-w-7xl">
              {CHARACTER_OPTIONS.map((option, idx) => (
                <li
                  key={idx}
                  className="px-2 py-2 transition-colors duration-200 cursor-pointer hover:text-blue-500"
                  value={option.name}
                  onClick={() =>
                    handleMoveFilterPage(
                      category === "CHARACTER" ? "character" : "category",
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
    </div>
  );
}
