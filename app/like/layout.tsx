import Footer from "@/components/common/Footer";
import Header from "@/components/common/header/Header";
import MobileNavigation from "@/components/common/header/MobileNavigation";
import ProductCategoryList from "@/components/common/ProductCategoryList";

export default function LikeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="sticky top-0">
        <Header />
        <ProductCategoryList />
      </div>
      <main className="mx-auto my-4 max-w-7xl h-4/5">{children}</main>
      <Footer />
      <MobileNavigation />
    </div>
  );
}
