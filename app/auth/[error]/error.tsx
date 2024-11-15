"use client";

import Button from "@/components/common/button/Button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthErrorPage({ error }: { error: Error }) {
  const router = useRouter();

  const handleReset = () => {
    router.push("/login");
  };
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <div className="flex justify-center items-center w-full h-screen flex-col gap-6">
      <h1 className="text-2xl">서버에서 문제가 발생했습니다.</h1>
      <Button
        type="button"
        style="point"
        onClick={handleReset}
        custom="px-3 py-2 text-lg"
      >
        로그인 다시 시도하기
      </Button>
    </div>
  );
}
