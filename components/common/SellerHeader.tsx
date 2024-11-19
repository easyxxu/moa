"use client";

import { usePathname } from "next/navigation";

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

  const headerText = (() => {
    for (const [path, label] of Object.entries(HeaderPath).sort(
      (a, b) => b[0].length - a[0].length
    )) {
      if (currentPath.startsWith(path)) return label;
    }
    return "판매자센터";
  })();

  return (
    <header className="w-full px-4 py-3 text-2xl font-semibold border-b">
      <p>{headerText}</p>
    </header>
  );
}
