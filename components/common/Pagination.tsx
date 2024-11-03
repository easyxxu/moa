"use client";

import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

import ArrowIcon from "@/public/assets/icon/icon-arrow.svg";

interface Props {
  /** 총 아이템 개수 */
  total: number;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}
export default function Pagination({ total, page, setPage }: Props) {
  const startPage = Math.floor((page - 1) / 10) * 10 + 1;
  const lastPage = Math.floor((total - 1) / 10) + 1;
  const endPage = Math.min(startPage + 9, lastPage);

  const handlePrevious = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (page < lastPage) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePage = (page: number) => {
    setPage(page);
  };

  return (
    <div className="flex gap-3">
      <button type="button" onClick={handlePrevious}>
        <Image src={ArrowIcon} alt="이전" width={20} height={20} />
      </button>
      <ul className="flex gap-2 text-lg font-light">
        {Array.from({ length: endPage - startPage + 1 }, (_, idx) => (
          <li key={idx}>
            <button
              type="button"
              onClick={() => handlePage(startPage + idx)}
              className={`${
                page === startPage + idx
                  ? "border-b border-slate-800 leading-tight font-semibold"
                  : ""
              }`}
            >
              {startPage + idx}
            </button>
          </li>
        ))}
      </ul>
      <button type="button" onClick={handleNext}>
        <Image
          src={ArrowIcon}
          alt="다음"
          width={20}
          height={20}
          className="rotate-180"
        />
      </button>
    </div>
  );
}
