"use client";

import { ErrorMsg, updateUserInfo } from "@/api/apis";
import Button from "@/components/common/button/Button";
import InputLabel from "@/components/common/InputLabel";
import { useToast } from "@/contexts/toastContext";
import { ERROR_MESSAGE } from "@/utils/constants/errorMessage";
import { TOAST_MESSAGE } from "@/utils/constants/toastMessage";
import { useFormState } from "react-dom";

export default function ModifyMyInfo() {
  const { openToast } = useToast();
  const [state, formAction] = useFormState(updateUserInfo, {
    status: 0,
    message: "",
  });

  if (state.status >= 400 || state.status < 500) {
    openToast({
      type: "ERROR",
      content:
        state.status === 400
          ? ERROR_MESSAGE.required
          : ERROR_MESSAGE.serverError,
    });
  }
  if (state.status === 200) {
    openToast({
      type: "SUCCESS",
      content: TOAST_MESSAGE.MYPAGE.PROFILE.NAME_CONTACT_CHANGE,
    });
  }
  return (
    <div className="w-full">
      <h2 className="mb-8 text-center">정보 수정하기</h2>
      <form action={formAction} className="w-full">
        <InputLabel
          type="text"
          fieldId="name"
          fieldName="name"
          labelText="이름"
          style="box"
          custom="flex-grow"
          error={(state.error as ErrorMsg)?.name}
        />
        <InputLabel
          type="text"
          fieldId="phone"
          fieldName="phone"
          labelText="전화번호"
          style="box"
          custom="flex-grow"
          error={(state.error as ErrorMsg)?.phone}
        />
        <Button type="submit" style="point" custom="w-full py-2 mt-4">
          저장
        </Button>
      </form>
    </div>
  );
}
