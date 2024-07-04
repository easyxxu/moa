"use server";

import { UserType } from "@/types/user";
import { createClient } from "@/utils/supabase/server";

export type ErrorMsg = {
  email?: string;
  password?: string;
  name?: string;
  phone?: string;
  server?: string;
};

export type State = {
  errorMsg?: ErrorMsg;
};

const emailRegex = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

const ERROR_MESSAGE = {
  required: "필수 입력입니다.",
  emailInvalid: "이메일 형식에 맞지 않는 메일 주소 입니다. 다시 입력해주세요.",
  emailAlreadyExists: "이미 사용 중인 이메일입니다.",
  passwordInvalid:
    "비밀번호는 6글자 이상, 최소 1글자의 영어 대소문자, 숫자, 특수문자가 들어가야 합니다.",
  phoneInvalid: "전화번호는 숫자만 입력 가능합니다.",
  serverError: "서버 에러가 발생했습니다. 잠시 후 다시 시도해 주세요.",
  tooManyRequests:
    "요청이 많아 에러가 발생했습니다. 잠시 후 다시 시도해 주세요.",
};

export async function joinAction(
  prevState: State,
  formData: FormData
): Promise<State> {
  const userType = formData.get("userType") as UserType;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;
  const phone = formData.get("phone") as string;
  const supabase = createClient();
  const errorMsg: ErrorMsg = {};

  // form validation for user
  if (!email || email.trim().length === 0) {
    errorMsg.email = ERROR_MESSAGE.required;
  }
  if (!password || password.trim().length === 0) {
    errorMsg.password = ERROR_MESSAGE.required;
  }
  if (!name || name.trim().length === 0) {
    errorMsg.name = ERROR_MESSAGE.required;
  }
  if (!phone || phone.trim().length === 0) {
    errorMsg.phone = ERROR_MESSAGE.required;
  }
  if (!emailRegex.test(email)) {
    errorMsg.email = ERROR_MESSAGE.emailInvalid;
  }
  if (!passwordRegex.test(password)) {
    errorMsg.password = ERROR_MESSAGE.passwordInvalid;
  }
  if (isNaN(Number(phone))) {
    errorMsg.phone = ERROR_MESSAGE.phoneInvalid;
  }
  // if (Object.keys(errorMsg).length > 0) {
  //   return { errorMsg };
  // }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        user_type: userType,
        phone,
      },
    },
  });

  if (error?.code === "user_already_exists") {
    errorMsg.email = ERROR_MESSAGE.emailAlreadyExists;
  }
  if (error?.code === "weak_password") {
    errorMsg.password = ERROR_MESSAGE.passwordInvalid;
  }
  if (error?.code === "validation_failed") {
    errorMsg.email = ERROR_MESSAGE.emailInvalid;
  }
  if (error?.status === 429) {
    errorMsg.server = ERROR_MESSAGE.tooManyRequests;
  }
  if (error?.status?.toString().startsWith("50")) {
    errorMsg.server = ERROR_MESSAGE.serverError;
    console.error(`SignUp Server Error(${error.status}): ${error.code}`);
  }

  return { errorMsg };
}
