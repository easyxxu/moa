import Footer from "@/components/common/Footer";
import Header from "@/components/common/header/Header";
import MobileNavigation from "@/components/common/header/MobileNavigation";
import ProductCategoryList from "@/components/common/ProductCategoryList";

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header />
      <ProductCategoryList />
      <main>{children}</main>
      <Footer />
      <MobileNavigation />
    </div>
  );
}
