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
    <form className="min-w-48 mr-4 sm:mr-0 sm:w-80">
      <div className="rounded-full bg-gray-100 py-2 pl-4 pr-4 flex gap-2">
        <label className="w-full">
          <input
            type="text"
            name="search"
            placeholder="상품을 검색해보세요!"
            className="bg-inherit font-regular align-middle w-full"
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
