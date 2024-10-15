"use client";

import { useFormState } from "react-dom";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import Form from "@/components/authForm/Form";
import InputLabel from "@/components/common/InputLabel";

import { loginAction } from "@/actions/actions";
import { useUserDispatch, useUserState } from "@/contexts/UserContext";

export default function Login() {
  const [state, formAction] = useFormState(loginAction, {});
  const userDispatch = useUserDispatch();
  const router = useRouter();

  useEffect(() => {
    if (state.code === "SUCCESS") {
      const userData = {
        id: state.userData?.id!,
        name: state.userData?.name!,
        userType: state.userData?.user_type!,
        moreUserData: state.userData?.moreUserData!,
      };
      userDispatch({
        type: "LOGIN",
        payload: userData,
      });
      router.push("/");
    }
  }, [state.code]);

  return (
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
  );
}
