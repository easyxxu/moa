"use client";
import Image from "next/image";
import Button from "../common/Button";
import SearchIcon from "@/public/assets/icon/icon-search.svg";
import { useRouter } from "next/navigation";

export default function SearchInput() {
  const router = useRouter();
  return (
    <form className="flex gap-3 mr-2">
      <div className="w-80 min-w-30 h-12 p-3 rounded-xl shadow-in">
        <label className="w-1/3">
          <input
            type="text"
            placeholder="상품을 검색해보세요!"
            className="bg-inherit font-regular w-full"
          />
        </label>
      </div>
      <Button
        type="submit"
        custom="w-12 h-12"
        onClick={() => router.push("/search")}
      >
        <Image src={SearchIcon} alt="검색" />
      </Button>
    </form>
  );
}
