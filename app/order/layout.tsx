import Footer from "@/components/common/Footer";
import Header from "@/components/common/header/Header";

export default function OrderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
