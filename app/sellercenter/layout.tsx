"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import SellerHeader from "@/components/common/SellerHeader";
import Menu from "@/components/sellercenter/Menu";

interface Props {
  children: React.ReactNode;
}

export default function SellerLayout({ children }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <div className="relative flex h-full overflow-hidden">
      {/* 데스크탑 사이드 메뉴 */}
      <div className="hidden sm:block">
        <Menu />
      </div>
      {/* 모바일 슬라이딩 사이드 메뉴 */}
      <div
        onMouseOver={() => setIsMenuOpen(true)}
        onMouseLeave={() => setIsMenuOpen(false)}
        className={`absolute top-0 right-0 h-full shadow-lg sm:hidden ${
          isMenuOpen ? "menu-slide-left" : "menu-slide-right"
        }`}
      >
        <Menu />
      </div>
      <div className="w-full h-full">
        <SellerHeader isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        <main className="w-full h-full max-w-full mx-0 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
