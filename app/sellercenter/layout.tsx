import Header from "@/components/common/Header";
import SellerHeader from "@/components/common/SellerHeader";
import Menu from "@/components/sellercenter/Menu";

interface Props {
  children: React.ReactNode;
}

export default function SellerLayout({ children }: Props) {
  return (
    <div className="flex h-full overflow-hidden">
      <Menu />
      <div className="w-full h-full">
        <SellerHeader />
        <main className="w-full h-full max-w-full mx-0 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
