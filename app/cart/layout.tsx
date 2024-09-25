import Header from "@/components/common/Header";
import { CartProvider } from "@/contexts/CartContext";

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}
