"use server";

import { redirect } from "next/navigation";
import { ERROR_MESSAGE } from "@/utils/constants/errorMessage";
import { emailRegex, passwordRegex } from "@/utils/constants/validation";
import { createClient } from "@/utils/supabase/server";
import { Provider, User } from "@supabase/supabase-js";
import { defaultUrl } from "@/app/layout";

export type ErrorMsg = {
  email?: string;
  password?: string;
  name?: string;
  phone?: string;
  server?: string;
  login?: string;
};

export type State = {
  errorMsg?: ErrorMsg;
};

export async function userJoin(
  prevState: State,
  formData: FormData
): Promise<State> {
  const userType = formData.get("userType") as string;
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

  if (Object.keys(errorMsg).length > 0) {
    return { errorMsg };
  }
  return redirect("/login");
}

export type LoginState = State & {
  code?: "SUCCESS" | "FAILED";
  userData?: {
    id: string;
    name: string;
    user_type: "BUYER" | "SELLER";
    moreUserData: User;
  };
};

export async function userLogin(
  prevState: State,
  formData: FormData
): Promise<LoginState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const userType = formData.get("userType") as string;
  const supabase = createClient();
  const errorMsg: ErrorMsg = {};

  if (!email || email.trim().length === 0) {
    errorMsg.email = ERROR_MESSAGE.required;
  }
  if (!password || password.trim().length === 0) {
    errorMsg.password = ERROR_MESSAGE.required;
  }
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    errorMsg.login = ERROR_MESSAGE.loginInvalid;
  }

  const { data: userData, error: userError } = await supabase
    .from("user")
    .select()
    .eq("id", data.user?.id!)
    .single();

  if (userError) {
    errorMsg.login = ERROR_MESSAGE.getUserError;
  }

  if (userData?.user_type !== userType) {
    errorMsg.login = ERROR_MESSAGE.loginUserType;
  }

  if (Object.keys(errorMsg).length > 0) {
    return { code: "FAILED", errorMsg };
  }

  return {
    code: "SUCCESS",
    userData: {
      id: data.user?.id!,
      name: data.user?.user_metadata.name,
      user_type: data.user?.user_metadata.user_type,
      moreUserData: data.user!,
    },
  };
}

export async function userLogOut() {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("Error Signing Out: ", error);
  }
  redirect("/");
}

export const signInWithOAuth = async (provider: Provider) => {
  const supabase = createClient();
  console.log("defaultUrl: ", defaultUrl);
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
      redirectTo: `${defaultUrl}/auth/callback`,
    },
  });

  if (error) {
    console.log("#server error: ", error);
    redirect("/auth/callback");
  }
  redirect(data.url);
};

export const updateEmail = async (
  prevState: any,
  formData: FormData
): Promise<any> => {
  const supabase = createClient();
  const newEmail = formData.get("newEmail") as string;
  const errorMsg: ErrorMsg = {};

  // email 유효성 검사
  if (!newEmail || newEmail.trim().length === 0) {
    errorMsg.email = ERROR_MESSAGE.required;
  }
  if (!emailRegex.test(newEmail)) {
    errorMsg.email = ERROR_MESSAGE.emailInvalid;
  }

  if (Object.keys(errorMsg).length > 0) {
    return {
      status: 400,
      message: ERROR_MESSAGE.inputInvalid,
      error: errorMsg,
    };
  }
  // auth update
  const { data: authData, error: authUserError } =
    await supabase.auth.updateUser({
      email: newEmail,
      data: {
        email: newEmail,
      },
    });
  console.log("authData:", authData, authUserError);
  if (authUserError?.code === "email_exists") {
    errorMsg.email = ERROR_MESSAGE.emailAlreadyExists;
    return {
      status: 404,
      message: ERROR_MESSAGE.serverError,
      error: errorMsg,
    };
  }

  if (authUserError) {
    return {
      status: 404,
      message: ERROR_MESSAGE.serverError,
      error: authUserError,
    };
  }

  // user update
  const { data: userData, error: userError } = await supabase
    .from("user")
    .update({
      email: newEmail,
    })
    .eq("id", authData.user?.id);

  if (userError) {
    return {
      status: 404,
      message: ERROR_MESSAGE.serverError,
      error: userError,
    };
  }
  console.log("user update success: ", userData);

  redirect("/mypage");
};

export const checkEmailConfirm = async (email: string) => {
  const supabase = createClient();
  const { error } = await supabase.auth.updateUser({ email });
  if (error) {
    console.error("이메일 업데이트 실패");
    throw new Error("서버 문제 발생");
  }
  return { status: 200, message: "이메일 인증이 완료되었습니다." };
};

export const updateUserInfo = async (
  prevState: any,
  formData: FormData
): Promise<any> => {
  const supabase = createClient();
  const name = formData.get("name") as string;
  const phone = formData.get("phone") as string;
  const errorMsg: ErrorMsg = {};

  // form 유효성 검사
  if (!name || name.trim().length === 0) {
    errorMsg.name = ERROR_MESSAGE.required;
  }
  if (!phone || phone.trim().length === 0) {
    errorMsg.phone = ERROR_MESSAGE.required;
  }

  if (Object.keys(errorMsg).length > 0) {
    return {
      status: 400,
      message: ERROR_MESSAGE.inputInvalid,
      error: errorMsg,
    };
  }

  // auth update
  const { data: authData, error: authUserError } =
    await supabase.auth.updateUser({
      data: {
        name,
        phone,
      },
    });

  if (authUserError) {
    console.error("Auth 수정 실패: ", authUserError);
    return {
      status: 404,
      message: ERROR_MESSAGE.serverError,
      error: authUserError,
    };
  }
  console.log("1. Auth 수정 성공", authData);

  // user update
  const { data: userData, error: userError } = await supabase
    .from("user")
    .update({
      name,
      phone,
    })
    .eq("id", authData.user?.id);

  if (userError) {
    console.error("회원정보 수정 실패: ", userError);
    return {
      status: 404,
      message: ERROR_MESSAGE.serverError,
      error: userError,
    };
  }
  console.log("2. 회원정보 수정 성공", userData);
  // redirect("/mypage");
  return { status: 200, message: "회원정보를 수정하였습니다." };
};

export const getUserInfo = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error("유저 정보를 불러오는 데 실패했습니다.", error);
    return {
      status: 404,
      message: "유저 정보를 불러오는 데 실패했습니다.",
      error,
    };
  }

  console.log(data);
  return {
    status: 200,
    message: "유저 정보를 불러오는 데 성공했습니다.",
    user: data.user,
  };
};
