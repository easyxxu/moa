import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import MobileNavigation from "@/components/common/MobileNavigation";
import ProductNav from "@/components/common/ProductNav";

export default function LikeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="sticky top-0">
        <Header />
        <ProductNav />
      </div>
      <main className="mx-auto my-4 max-w-7xl h-4/5">{children}</main>
      <Footer />
      <MobileNavigation />
    </div>
  );
}
