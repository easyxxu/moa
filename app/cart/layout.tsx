import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import ProductNav from "@/components/common/ProductNav";
import { CartProvider } from "@/contexts/CartContext";

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <ProductNav />
      <main>{children}</main>
      <Footer />
    </>
  );
}
