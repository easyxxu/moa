"use server";

import { ERROR_MESSAGE } from "@/utils/constants/errorMessage";
import { createClient } from "@/utils/supabase/server";
import { Provider } from "@supabase/supabase-js";

export const signInWithOAuth = async (provider: Provider) => {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      queryParams: {
        access_type: "offline",
        prompt: "login",
      },
      redirectTo: "http://localhost:3000/auth/callback",
    },
  });
  console.log("#data: ", data);
  if (error) {
    console.log("#error: ", error);
    return { status: 404, message: ERROR_MESSAGE.serverError, error };
  }
  return { status: 200, data };
};
