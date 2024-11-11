import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import ProductNav from "@/components/common/ProductNav";

export default function LikeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <ProductNav />
      <main className="mx-auto my-4 max-w-7xl h-4/5">{children}</main>
      <Footer />
    </>
  );
}
