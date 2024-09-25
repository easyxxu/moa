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
        fieldName="이메일"
        fieldId="email"
        type="text"
        style="box"
        error={state.errorMsg?.email}
      />
      <InputLabel
        fieldName="비밀번호"
        fieldId="password"
        type="password"
        style="box"
        error={state.errorMsg?.password}
      />
      <InputLabel
        fieldName="이름"
        fieldId="name"
        type="text"
        style="box"
        error={state.errorMsg?.name}
      />
      <InputLabel
        fieldName="전화번호"
        fieldId="phone"
        type="tel"
        placeholder="-은 제외하고 입력해주세요."
        style="box"
        error={state.errorMsg?.phone}
      />
      <span className="text-sm text-red-400">{state.errorMsg?.server}</span>
    </Form>
  );
}
