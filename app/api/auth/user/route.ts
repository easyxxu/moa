import { createClient } from "@/utils/supabase/server";

export async function GET() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    return Response.json(
      {
        status: error.status,
        message: "유저 정보를 불러오는데 실패했습니다.",
        error,
      },
      { status: error.status }
    );
  }
  return Response.json(
    {
      status: 200,
      message: "유저 정보를 불러오는데 성공했습니다.",
      userData: data,
    },
    { status: 200 }
  );
}
