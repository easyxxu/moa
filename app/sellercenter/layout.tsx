"use client";
import Header from "@/components/common/Header";
import Menu from "@/components/sellercenter/Menu";
import { useUserState } from "@/contexts/UserContext";

interface Props {
  children: React.ReactNode;
}

export default function SellerLayout({ children }: Props) {
  const userState = useUserState();
  return (
    <>
      <Header />
      <main className="my-5">
        <h3 className="text-3xl font-medium mb-5">
          <strong className="text-font-hover">{userState.name}</strong> 's
          Dashboard
        </h3>
        <div className="flex gap-6">
          <Menu />
          {children}
        </div>
      </main>
    </>
  );
}
