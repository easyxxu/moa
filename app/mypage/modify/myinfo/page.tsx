"use client";

import { ErrorMsg, updateUserInfo } from "@/api/apis";
import Button from "@/components/common/button/Button";
import InputLabel from "@/components/common/InputLabel";
import { useFormState } from "react-dom";

export default function ModifyMyInfo() {
  const [state, formAction] = useFormState(updateUserInfo, {
    status: 0,
    message: "",
  });

  if (state.status === 404) {
    throw new Error(state.message);
  }

  return (
    <div className="w-full">
      <h2 className="text-center mb-8">정보 수정하기</h2>
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
        <Button type="submit" custom="bg-primary w-full py-2 mt-4">
          저장
        </Button>
      </form>
    </div>
  );
}
