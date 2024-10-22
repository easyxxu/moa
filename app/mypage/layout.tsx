import Header from "@/components/common/Header";
import Link from "next/link";

const MY_MENU: { [key: string]: { href: string; title: string }[] } = {
  "나의 쇼핑": [
    { href: "/mypage/order", title: "주문조회" },
    { href: "/mypage/review", title: "리뷰조회" },
  ],
  "나의 정보": [
    { href: "/mypage/myinfo", title: "개인정보수정" },
    { href: "/mypage/coupon", title: "쿠폰" },
  ],
  "나의 문의": [
    { href: "/mypage/qa", title: "상품 Q/A" },
    { href: "/mypage/notice", title: "공지사항" },
  ],
};
export default function MyPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="flex gap-4 py-8">
        <div className="w-1/5">
          <h2 className="mb-6">마이</h2>
          <div>
            {Object.keys(MY_MENU).map((menu, index) => (
              <div key={index} className="mb-6">
                <h3 className="mb-2 text-xl font-semibold ">{menu}</h3>
                <div className="flex flex-col gap-2 text-lg font-extralight">
                  {MY_MENU[menu].map(
                    (item: { href: string; title: string }, idx) => (
                      <Link href={item.href} key={idx}>
                        {item.title}
                      </Link>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        {children}
      </main>
    </>
  );
}
