import { createClient } from "@/utils/supabase/server";

import SideMenu from "@/components/mypage/SideMenu";

export default async function MyPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="px-2">
      <h2 className="mb-2 text-center sm:hidden">마이페이지</h2>
      <p className="mb-3 text-sm sm:text-xl sm:mt-2">
        <strong className="text-base sm:text-2xl">
          {user?.user_metadata.name}
        </strong>
        님, 안녕하세요
      </p>
      <nav className="block sm:hidden">
        <SideMenu />
      </nav>
    </div>
  );
}
