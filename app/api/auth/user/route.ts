import { createClient } from "@/utils/supabase/server";

export async function GET() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  // Logout
  if (!data.user && error?.status === 400) {
    return Response.json(
      {
        message: "유저가 로그아웃된 상태입니다.",
      },
      { status: 200 }
    );
  }
  // Error
  if (error) {
    return Response.json(
      {
        message: "유저 정보를 불러오는데 실패했습니다.",
        error,
      },
      { status: error.status }
    );
  }
  // Login
  return Response.json(
    {
      message: "유저 정보를 불러오는데 성공했습니다.",
      userData: data,
    },
    { status: 200 }
  );
}
