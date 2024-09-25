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
        user_type: state.userData?.user_type!,
      };

      // localStorage.setItem(
      //   "userState",
      //   JSON.stringify({
      //     id: userData.id,
      //     name: userData.name,
      //     user_type: userData.user_type,
      //     isLogin: true,
      //   })
      // );

      userDispatch({
        type: "LOGIN",
        payload: userData,
      });
      router.push("/");
    }
  }, [state.code]);

  return (
    <Form formType="login" onSubmit={formAction}>
      <InputLabel fieldName="이메일" fieldId="email" type="text" style="line" />
      <InputLabel
        fieldName="비밀번호"
        fieldId="password"
        type="password"
        style="line"
      />
      <p className="text-sm text-red-400">{state.errorMsg?.login}</p>
    </Form>
  );
}
