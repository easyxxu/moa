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
    <div className="relative h-full sm:flex">
      {/* 데스크탑 사이드 메뉴 */}
      <div className="hidden sm:block">
        <Menu />
      </div>
      {/* 모바일 슬라이딩 사이드 메뉴 */}
      <div
        className={`absolute top-0 w-full h-full bg-background-modal z-10 sm:hidden ${
          isMenuOpen ? "block" : "hidden"
        }`}
        role="presentation"
        onClick={() => setIsMenuOpen(false)}
      >
        <div
          className={`absolute left-0 bottom-0 w-full sm:hidden ${
            isMenuOpen ? "menu-slide-bottom" : "menu-slide-top"
          }`}
          role="navigation"
          aria-label="mobile navigation menu"
          aria-expanded={isMenuOpen ? true : false}
        >
          <Menu />
        </div>
      </div>
      <div className="w-full h-full overflow-hidden">
        <SellerHeader isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        <main className="w-full h-full max-w-full mx-0 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
