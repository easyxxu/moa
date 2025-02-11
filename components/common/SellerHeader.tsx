"use client";

import { usePathname } from "next/navigation";
import { useUserState } from "@/contexts/UserContext";
import ShopIcon from "@/public/assets/icon/icon-seller-shop.svg";
import Image from "next/image";
import HamburgerIcon from "@/public/assets/icon/icon-hamburger.svg";

import { Dispatch, SetStateAction } from "react";
const HeaderPath: Record<string, string> = {
  "/sellercenter/product": "상품관리",
  "/sellercenter/order": "주문관리",
  "/sellercenter/qa": "문의관리",
  "/sellercenter/analytics": "통계",
  "/sellercenter/setting": "스토어 설정",
  "/sellercenter": "홈",
};

interface Props {
  isMenuOpen: boolean;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
}
export default function SellerHeader({ isMenuOpen, setIsMenuOpen }: Props) {
  const currentPath = usePathname();
  const userInfo = useUserState();
  const headerText = (() => {
    for (const [path, label] of Object.entries(HeaderPath).sort(
      (a, b) => b[0].length - a[0].length
    )) {
      if (currentPath.startsWith(path)) return label;
    }
    return "판매자센터";
  })();

  return (
    <header className="flex items-center justify-between w-full px-3 py-2 text-xl font-semibold border-b sm:px-4 sm:py-3 sm:text-2xl">
      <p>{headerText}</p>
      <div className="flex items-center gap-1">
        <Image
          src={ShopIcon}
          alt="샵 아이콘"
          className="w-5 h-5 sm:w-7 sm:h-7"
        />
        <p className="text-base sm:text-lg">{userInfo.name}</p>
      </div>
      <button
        type="button"
        className="w-8 h-8 sm:hidden"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <Image src={HamburgerIcon} alt="메뉴" />
      </button>
    </header>
  );
}
