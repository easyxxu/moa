import ChangeMyInfo from "@/components/mypage/myinfo/ChangeMyInfo";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export default async function MyInfoPage() {
  const supabase = createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  return (
    <div className="w-full">
      <h2 className="mb-8 text-center">개인정보수정</h2>
      <ul className="font-regular border-t border-border-grey [&>li]:border-b [&>li]:py-4 [&>li]:border-border-grey">
        <li>
          <Link href="/mypage/modify/email">이메일 변경하기</Link>
        </li>
        <li>
          <Link href="/mypage/modify/myinfo">이름, 전화번호 변경하기</Link>
        </li>
      </ul>
    </div>
  );
}
