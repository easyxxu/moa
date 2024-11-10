import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import Category from "@/components/common/Category";

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="mx-auto my-4 max-w-7xl">
        <Category />
        {children}
      </main>
      <Footer />
    </>
  );
}
