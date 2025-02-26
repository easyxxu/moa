"use client";

import { ErrorMsg, modifyUserInfo } from "@/api/userApis";
import Button from "@/components/common/button/Button";
import InputLabel from "@/components/common/InputLabel";
import { useToast } from "@/contexts/ToastContext";
import { useUserState } from "@/contexts/UserContext";
import { RESPONSE_MESSAGE } from "@/utils/constants/responseMessage";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormState } from "react-dom";

export default function ModifyMyInfo() {
  const router = useRouter();
  const userInfo = useUserState();
  const { openToast } = useToast();
  const [state, formAction] = useFormState(modifyUserInfo, {
    status: 0,
    message: "",
  });

  useEffect(() => {
    if (state.status >= 400 && state.status < 500) {
      openToast({
        type: "ERROR",
        content:
          state.status === 400
            ? RESPONSE_MESSAGE.ERROR.VALIDATION.REQUIRED
            : RESPONSE_MESSAGE.ERROR.SERVER.ERROR,
      });
    }
    if (state.status === 200) {
      openToast({
        type: "SUCCESS",
        content: RESPONSE_MESSAGE.SUCCESS.PROFILE.NAME_CONTACT_CHANGE,
      });
      router.push("/mypage");
    }
  }, [state, openToast]);
  return (
    <div className="w-full">
      <h2 className="pb-4 mb-4 text-center border-b-4 border-gray-900">
        정보 수정
      </h2>
      <form action={formAction} className="w-full px-2 sm:px-0">
        <InputLabel
          type="text"
          fieldId="name"
          fieldName="name"
          labelText="이름"
          style="box"
          custom="flex-grow"
          error={(state.error as ErrorMsg)?.name}
          defaultValue={userInfo.name!}
        />
        <InputLabel
          type="text"
          fieldId="phone"
          fieldName="phone"
          labelText="전화번호"
          style="box"
          custom="flex-grow"
          error={(state.error as ErrorMsg)?.phone}
          defaultValue={userInfo.moreUserData?.user_metadata.phone}
        />
        <Button type="submit" style="point" custom="w-full py-2 mt-4">
          저장
        </Button>
      </form>
    </div>
  );
}
