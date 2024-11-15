"use client";

import Button from "@/components/common/button/Button";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error("나 error.tsx!!", error);
  }, [error]);
  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-4">
      <h2>서버에서 문제가 발생했습니다.</h2>
      <Button
        type="button"
        style="point"
        onClick={() => reset()}
        custom="px-3 py-2"
      >
        새로고침하기
      </Button>
    </div>
  );
}
