import MyReviews from "@/components/mypage/review/MyReviews";
import { createClient } from "@/utils/supabase/server";

export default async function ReviewPage() {
  const supabase = createClient();
  const { data: user, error: userError } = await supabase.auth.getUser();
  if (userError) {
    console.error(
      "리뷰를 불러오기 위한 사용자 정보를 불러오는데 실패했습니다.",
      userError
    );
    throw new Error("서버에서 문제가 생겼습니다.");
  }
  const userId = user.user?.id;

  const { data, error } = await supabase
    .from("review")
    .select(
      `
    *, product(id, name, image, seller_store, seller_id)
  `
    )
    .eq("user_id", userId!);

  if (!data || data.length === 0) return <p>작성한 리뷰가 없습니다.</p>;
  if (error) {
    console.error("리뷰를 불러오는데 실패했습니다.", error);
    throw new Error("서버에서 문제가 생겼습니다.");
  }

  return (
    <div className="w-full">
      <h2 className="pb-8 mb-4 text-center border-b-4 border-black">
        리뷰조회
      </h2>
      <MyReviews reviews={data} />
    </div>
  );
}
