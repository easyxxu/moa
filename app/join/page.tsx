"use client";

import { useFormState } from "react-dom";

import Form from "@/components/authForm/Form";
import InputLabel from "@/components/common/InputLabel";

import { joinAction } from "@/actions/actions";

export default function Join() {
  const [state, formAction] = useFormState(joinAction, {});

  return (
    <Form formType="join" onSubmit={formAction}>
      <InputLabel
        name="이메일"
        label="email"
        type="text"
        style="box"
        error={state.errorMsg?.email}
      />
      <InputLabel
        name="비밀번호"
        label="password"
        type="password"
        style="box"
        error={state.errorMsg?.password}
      />
      <InputLabel
        name="이름"
        label="name"
        type="text"
        style="box"
        error={state.errorMsg?.name}
      />
      <InputLabel
        name="전화번호"
        label="phone"
        type="tel"
        placeholder="-은 제외하고 입력해주세요."
        style="box"
        error={state.errorMsg?.phone}
      />
      <span className="text-sm text-red-400">{state.errorMsg?.server}</span>
    </Form>
  );
}
