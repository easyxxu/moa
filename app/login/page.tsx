"use client";

import { useFormState } from "react-dom";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import Form from "@/components/authForm/Form";
import InputLabel from "@/components/common/InputLabel";

import { useUserDispatch } from "@/contexts/UserContext";
import { userLogin } from "@/api/userApis";

export default function Login() {
  const [state, formAction] = useFormState(userLogin, {
    status: 0,
  });
  const userDispatch = useUserDispatch();
  const router = useRouter();

  useEffect(() => {
    if (state.status === 200) {
      userDispatch?.login();
      router.push("/");
    }
  }, [state.status]);

  return (
    <div className="relative flex justify-center h-full">
      <Form formType="login" onSubmit={formAction}>
        <InputLabel
          labelText="이메일"
          fieldName="email"
          fieldId="email"
          type="text"
          style="line"
        />
        <InputLabel
          labelText="비밀번호"
          fieldName="password"
          fieldId="password"
          type="password"
          style="line"
        />
        <p className="text-sm text-red-400">{state.errorMsg?.login}</p>
      </Form>
    </div>
  );
}
