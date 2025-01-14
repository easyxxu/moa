import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import MobileNavigation from "@/components/common/MobileNavigation";
import ProductNav from "@/components/common/ProductNav";
import SideMenu from "@/components/mypage/SideMenu";

export default function MyPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="sticky top-0">
        <Header />
        <ProductNav />
      </div>
      <main className="flex sm:py-8 sm:px-2 sm:gap-7">
        <aside className="w-48 hidden sm:block">
          <h2 className="mb-6 text-2xl font-bold ">마이페이지</h2>
          <nav>
            <SideMenu />
          </nav>
        </aside>
        <section className="flex-1">{children}</section>
      </main>
      <Footer />
      <MobileNavigation />
    </>
  );
}
