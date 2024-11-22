"use client";

import { updateSellerInfo } from "@/api/userApis";
import Button from "@/components/common/button/Button";
import InputLabel from "@/components/common/InputLabel";
import { useUserDispatch, useUserState } from "@/contexts/UserContext";
import { useEffect } from "react";
import { useFormState } from "react-dom";

export default function SettingDashboard() {
  const userInfo = useUserState();
  const userDispatch = useUserDispatch();

  const [state, formAction] = useFormState(updateSellerInfo, null);

  useEffect(() => {
    if (state?.status === 200) {
      userDispatch({ type: "UPDATE", payload: { name: state.data?.name! } });
    }
  }, [state]);

  return (
    <form
      className="flex flex-col items-end w-full gap-4 px-4 py-4"
      action={formAction}
    >
      <InputLabel
        type="text"
        fieldName="name"
        fieldId="name"
        labelText="스토어명 변경"
        style="box"
        custom="w-full"
        defaultValue={userInfo.name!}
      />
      <Button
        type="submit"
        style="point"
        custom="px-4 py-2 text-sm w-full md:w-auto"
      >
        저장
      </Button>
    </form>
  );
}
