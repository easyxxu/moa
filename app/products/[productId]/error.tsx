"use client";

import Image from "next/image";
import ErrorIcon from "@/public/assets/icon/icon-error.svg";

export default function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center mt-40">
      <Image src={ErrorIcon} alt="오류" />
      <p>데이터를 가져오는데 오류가 발생했습니다.</p>
      <p>잠시 후에 다시 시도해주세요.</p>
    </div>
  );
}
