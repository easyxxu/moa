"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import SearchIcon from "@/public/assets/icon/icon-search.svg";

export default function SearchInput() {
  const router = useRouter();

  return (
    <form className="">
      <div className="w-80 min-w-30 h-10 rounded-full bg-gray-100  py-2 pl-4 pr-4 flex gap-2">
        <label className="w-full">
          <input
            type="text"
            name="search"
            placeholder="상품을 검색해보세요!"
            className="bg-inherit font-regular w-full"
          />
        </label>
        <button type="submit" onClick={() => router.push("/search")}>
          <Image src={SearchIcon} alt="검색" />
        </button>
      </div>
    </form>
  );
}
