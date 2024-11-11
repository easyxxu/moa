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
      <Header />
      <Category />
      <main className="mt-4 mb-10">{children}</main>
      <Footer />
    </div>
  );
}
