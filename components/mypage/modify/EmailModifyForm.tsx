"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";

import Button from "@/components/common/button/Button";
import InputLabel from "@/components/common/InputLabel";
import { modifyEmail } from "@/api/userApis";
import { useToast } from "@/contexts/ToastContext";
import { useUserState } from "@/contexts/UserContext";
import { ERROR_MESSAGE } from "@/utils/constants/errorMessage";

export default function EmailModifyForm() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const router = useRouter();
  const { openToast } = useToast();
  const nowEmail = useUserState().moreUserData?.email || "";
  const [state, formAction] = useFormState(modifyEmail, {
    status: 0,
    message: "",
  });
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (state.status === 500) {
      openToast({ type: "ERROR", content: ERROR_MESSAGE.serverError });
    }
    if (state.status === 202) {
      setPending(true);
    }
  }, [state]);

  useEffect(() => {
    const verifyEmail = async () => {
      if (code) {
        try {
          const res = await fetch(`/mypage/modify/email?code=${code}`);
          if (res.status === 200) {
            openToast({
              type: "SUCCESS",
              content: "이메일 인증에 성공하였습니다.",
            });
            router.push("/mypage");
          } else {
            openToast({
              type: "ERROR",
              content: "이메일 인증에 실패하였습니다.",
            });
          }
        } catch (error) {
          openToast({
            type: "ERROR",
            content: "서버와의 통신 중 오류가 발생했습니다.",
          });
        }
      }
    };

    verifyEmail();
  }, [code]);

  return (
    <form action={formAction}>
      <div className="flex flex-col gap-2">
        <InputLabel
          type="text"
          fieldId="email"
          fieldName="email"
          labelText="현재 이메일"
          style="box"
          value={nowEmail}
          custom="flex-grow"
          readOnly
        />
        <InputLabel
          type="text"
          fieldId="newEmail"
          fieldName="newEmail"
          labelText="새 이메일"
          style="box"
          custom="flex-grow"
          error={state.error?.email}
        />
        <Button
          type="submit"
          style="point"
          disable={pending}
          custom={`py-2 ${pending ? "bg-gray-300" : ""}`}
        >
          {pending ? "이메일 인증을 해주세요." : "변경하기"}
        </Button>
      </div>
    </form>
  );
}
