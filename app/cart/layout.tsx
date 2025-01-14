import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import MobileNavigation from "@/components/common/MobileNavigation";
import ProductNav from "@/components/common/ProductNav";

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header />
      <ProductNav />
      <main>{children}</main>
      <Footer />
      <MobileNavigation />
    </div>
  );
}
