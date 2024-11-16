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
    <div className="flex flex-col items-center justify-center h-screen gap-2">
      <Image src={ErrorIcon} alt="오류" width={200} height={200} />
      <p className="text-2xl">서버에서 오류가 발생했습니다.</p>
      <Button
        onClick={() => reset()}
        type="button"
        custom="px-3 py-2 font-semibold text-xl"
        style="point"
      >
        다시 시도하기
      </Button>
    </div>
  );
}
