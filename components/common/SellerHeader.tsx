"use client";

import { usePathname } from "next/navigation";
import { useUserState } from "@/contexts/UserContext";
import ShopIcon from "@/public/assets/icon/icon-seller-shop.svg";
import Image from "next/image";
const HeaderPath: Record<string, string> = {
  "/sellercenter/product": "상품관리",
  "/sellercenter/order": "주문관리",
  "/sellercenter/qa": "문의관리",
  "/sellercenter/analytics": "통계",
  "/sellercenter/setting": "스토어 설정",
  "/sellercenter": "홈",
};

export default function SellerHeader() {
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
    <header className="flex justify-between w-full px-4 py-3 text-2xl font-semibold border-b">
      <p>{headerText}</p>
      <div className="flex items-center gap-1">
        <Image src={ShopIcon} alt="샵 아이콘" width={30} height={30} />
        <p className="text-lg">{userInfo.name}</p>
      </div>
    </header>
  );
}
