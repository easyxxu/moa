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
    <div className="w-full flex flex-col gap-4 items-center">
      <h2>정보를 수정하는데 문제가 발생했습니다.</h2>
      <p>{error.message}</p>
      <Button
        type="button"
        onClick={() => reset()}
        custom="bg-primary px-3 py-2"
      >
        새로고침하기
      </Button>
    </div>
  );
}
