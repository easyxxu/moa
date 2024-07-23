import Header from "@/components/common/Header";
import Menu from "@/components/sellercenter/Menu";

interface Props {
  children: React.ReactNode;
}

export default function SellerLayout({ children }: Props) {
  return (
    <>
      <Header />
      <div className="flex gap-6 mx-auto my-5 max-w-7xl">
        <Menu />
        {children}
      </div>
    </>
  );
}
