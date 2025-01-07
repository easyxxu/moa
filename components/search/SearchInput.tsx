"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import SearchIcon from "@/public/assets/icon/icon-search.svg";
import { useState } from "react";

export default function SearchInput() {
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const [searchKeyword, setSerachKeyword] = useState("");

  const handleSearch = (keyword: string) => {
    const params = new URLSearchParams(searchParams);
    if (keyword) {
      params.set("searchKeyword", keyword);
    } else {
      params.delete("searchKeyword");
    }
    replace(`/products?${params.toString()}`);
  };

  return (
    <form className="mr-4 min-w-48 sm:mr-0 sm:w-80">
      <div className="flex gap-2 px-3 py-1 bg-gray-100 rounded-full sm:px-4 sm:py-2">
        <label className="w-full">
          <input
            type="text"
            name="search"
            placeholder="상품을 검색해보세요!"
            className="w-full text-sm sm:text-base sm:align-middle bg-inherit"
            onChange={(e) => setSerachKeyword(e.target.value)}
            defaultValue={searchParams.get("searchKeyword")?.toString()}
          />
        </label>
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            handleSearch(searchKeyword);
          }}
        >
          <Image src={SearchIcon} alt="검색" />
        </button>
      </div>
    </form>
  );
}
