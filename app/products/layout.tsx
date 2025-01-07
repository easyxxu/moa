import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import Category from "@/components/common/ProductNav";

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
    </div>
  );
}
