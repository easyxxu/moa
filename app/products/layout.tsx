import Footer from "@/components/common/Footer";
import Header from "@/components/common/header/Header";
import MobileNavigation from "@/components/common/header/MobileNavigation";
import Category from "@/components/common/ProductCategoryList";

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <div className="sticky top-0 z-10">
        <Header />
        <Category />
      </div>
      <main className="mb-10">{children}</main>
      <Footer />
      <MobileNavigation />
    </div>
  );
}
