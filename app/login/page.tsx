"use client";

import { useFormState } from "react-dom";

import Form from "@/components/authForm/Form";
import InputLabel from "@/components/common/InputLabel";

import { loginAction } from "@/actions/actions";

export default async function Login() {
  const [state, formAction] = useFormState(loginAction, {});

  return (
    <Form formType="login" onSubmit={formAction}>
      <InputLabel name="이메일" label="email" type="text" style="line" />
      <InputLabel
        name="비밀번호"
        label="password"
        type="password"
        style="line"
      />
      <p className="text-sm text-red-400">{state.errorMsg?.login}</p>
    </Form>
  );
}
