import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import MobileNavigation from "@/components/common/MobileNavigation";
import ProductNav from "@/components/common/ProductNav";
import Link from "next/link";

const MY_MENU: { [key: string]: { href: string; title: string }[] } = {
  "나의 쇼핑": [
    { href: "/mypage/order", title: "주문조회" },
    { href: "/mypage/review", title: "리뷰조회" },
  ],
  "나의 정보": [
    { href: "/mypage/modify", title: "개인정보수정" },
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
      <ProductNav />
      <main className="flex py-8 gap-7">
        <aside className="w-64 px-2">
          <h2 className="mb-6 text-2xl font-bold text-gray-800">마이페이지</h2>
          <nav className="space-y-6">
            {Object.keys(MY_MENU).map((menu, index) => (
              <div key={index}>
                <h3 className="mb-3 text-lg font-semibold border-b-2 border-gray-800">
                  {menu}
                </h3>
                <ul className="space-y-2">
                  {MY_MENU[menu].map((item, idx) => (
                    <li key={idx}>
                      <Link
                        href={item.href}
                        className="block px-2 py-1 transition-colors duration-150 rounded hover:text-blue-500"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </aside>
        <section className="flex-1 p-6 border border-gray-700 rounded-sm shadow-md">
          {children}
        </section>
      </main>
      <Footer />
      <MobileNavigation />
    </>
  );
}
