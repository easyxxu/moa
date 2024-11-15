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
        prompt: "consent",
      },
      redirectTo: "http://localhost:3000/auth/callback",
    },
  });

  if (error) {
    console.log("#server error: ", error);
    redirect("/auth/callback");
  }
  redirect(data.url);
};
