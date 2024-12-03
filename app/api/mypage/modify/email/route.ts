import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const requestUrl = new URL(req.url);
  const code = requestUrl.searchParams.get("code");
  const supabase = createClient();

  let success = false;
  let message = "이메일 인증에 실패하였습니다.";

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      success = true;
      message = "이메일 인증이 완료되었습니다.";
    }
  }

  return NextResponse.json(
    {
      success,
      message,
    },
    { status: success ? 200 : 400 }
  );
}
