"use client";

import Button from "@/components/common/button/Button";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, []);
  return (
    <html>
      <body>
        <h2>서버에서 문제가 생겼습니다.</h2>
        <Button
          type="button"
          style="point"
          custom="px-3 py-2"
          onClick={() => reset()}
        >
          다시 시도하기
        </Button>
      </body>
    </html>
  );
}
