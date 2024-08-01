"use client";

import { useEffect } from "react";
import Image from "next/image";

import ErrorIcon from "@/public/assets/icon/icon-error.svg";
import Button from "@/components/common/button/Button";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col gap-1 items-center justify-center h-screen">
      <Image src={ErrorIcon} alt="오류" />
      <p className="text-lg">데이터를 가져오는데 오류가 발생했습니다.</p>
      <Button
        onClick={() => reset()}
        type="button"
        custom="px-3 py-2 bg-primary font-semibold text-xl"
      >
        다시 시도하기
      </Button>
    </div>
  );
}
