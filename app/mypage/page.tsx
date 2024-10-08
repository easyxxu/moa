import { createClient } from "@/utils/supabase/server";

export default async function MyPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div>
      <p className="text-xl">
        <strong className="text-2xl">{user?.user_metadata.name}</strong>님,{" "}
        안녕하세요
      </p>
    </div>
  );
}
