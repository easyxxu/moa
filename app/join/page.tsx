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
  );
}
