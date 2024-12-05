"use client";

import EmailModifyForm from "@/components/mypage/modify/EmailModifyForm";
import { Suspense } from "react";

export default function ModifyEmail({ params }: { params: { code: string } }) {
  return (
    <div className="w-full">
      <h2 className="mb-6 text-center">이메일 변경</h2>
      <Suspense fallback={<p>Loading...</p>}>
        <EmailModifyForm />
      </Suspense>
    </div>
  );
}
