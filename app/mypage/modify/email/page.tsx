"use client";

import { ErrorMsg, updateEmail } from "@/api/userApis";
import InputLabel from "@/components/common/InputLabel";
import { useToast } from "@/contexts/ToastContext";
import { useUserState } from "@/contexts/UserContext";
import { ERROR_MESSAGE } from "@/utils/constants/errorMessage";
import { TOAST_MESSAGE } from "@/utils/constants/toastMessage";
import { useFormState, useFormStatus } from "react-dom";

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      className="w-full py-2 mb-2 bg-primary shadow-out rounded-2xl"
    >
      {pending ? "대기중... " : "이메일 인증"}
    </button>
  );
};

export default function ModifyEmail() {
  const { openToast } = useToast();
  const nowEmail = useUserState().moreUserData?.email || "";
  const [state, formAction] = useFormState(updateEmail, {
    status: 0,
    message: "",
  });

  if (state.status >= 400 && state.status < 500) {
    openToast({ type: "ERROR", content: ERROR_MESSAGE.serverError });
  }
  if (state.status === 200) {
    openToast({
      type: "SUCCESS",
      content: TOAST_MESSAGE.MYPAGE.PROFILE.EMAIL_CHANGE,
    });
  }
  return (
    <div className="w-full">
      <h2 className="mb-6 text-center">이메일 변경</h2>
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
            error={(state.error as ErrorMsg)?.email}
          />
          <SubmitButton />
        </div>
      </form>
    </div>
  );
}
