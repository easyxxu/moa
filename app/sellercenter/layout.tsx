import Header from "@/components/common/Header";
import Menu from "@/components/sellercenter/Menu";

interface Props {
  children: React.ReactNode;
}

export default function SellerLayout({ children }: Props) {
  return (
    <>
      <Header />
      <main className="my-5">
        <div className="flex gap-6">
          <Menu />
          {children}
        </div>
      </main>
    </>
  );
}
