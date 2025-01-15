"use client";

import EmailModifyForm from "@/components/mypage/modify/EmailModifyForm";
import { Suspense } from "react";

export default function ModifyEmail({ params }: { params: { code: string } }) {
  return (
    <div className="w-full">
      <h2 className="pb-4 mb-4 text-center border-b-4 border-gray-900">
        이메일 변경
      </h2>
      <div className="px-2 sm:px-0">
        <Suspense fallback={<p>Loading...</p>}>
          <EmailModifyForm />
        </Suspense>
      </div>
    </div>
  );
}
