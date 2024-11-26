"use client";

import { useRouter } from "next/navigation";
import { useFormState } from "react-dom";
import { useEffect } from "react";

import Form from "@/components/authForm/Form";
import InputLabel from "@/components/common/InputLabel";
import { userJoin } from "@/api/userApis";
import { useUserDispatch } from "@/contexts/UserContext";

export default function Join() {
  const router = useRouter();
  const userDispatch = useUserDispatch();
  const [state, formAction] = useFormState(userJoin, {
    status: 0,
  });

  useEffect(() => {
    if (state.status === 200) {
      userDispatch?.login();
      router.push("/");
    }
  }, [state.status]);

  return (
    <div className="flex justify-center h-screen my-10">
      <Form formType="join" onSubmit={formAction}>
        <InputLabel
          labelText="이메일"
          fieldName="email"
          fieldId="email"
          type="text"
          style="box"
          error={state.errorMsg?.email}
        />
        <InputLabel
          labelText="비밀번호"
          fieldName="password"
          fieldId="password"
          type="password"
          style="box"
          error={state.errorMsg?.password}
        />
        <InputLabel
          labelText="이름"
          fieldName="name"
          fieldId="name"
          type="text"
          style="box"
          error={state.errorMsg?.name}
        />
        <InputLabel
          labelText="전화번호"
          fieldName="phone"
          fieldId="phone"
          type="tel"
          placeholder="-은 제외하고 입력해주세요."
          style="box"
          error={state.errorMsg?.phone}
        />
        <span className="text-sm text-red-400">{state.errorMsg?.server}</span>
      </Form>
    </div>
  );
}
