"use client";

import Image from "next/image";
import Link from "next/link";

import ArchiveIcon from "@/public/assets/icon/icon-archive.svg";
import ChartIcon from "@/public/assets/icon/icon-chart.svg";
import QaIcon from "@/public/assets/icon/icon-qa.svg";
import ReceiptIcon from "@/public/assets/icon/icon-receipt.svg";
import ShopIcon from "@/public/assets/icon/icon-seller-shop.svg";
import HomeIcon from "@/public/assets/icon/icon-home.svg";
import MoALogo from "@/public/assets/moa-logo.svg";
import LogoutIcon from "@/public/assets/icon/icon-seller-sign-out.svg";

import { useUserDispatch } from "@/contexts/UserContext";

const MENU_ITEMS = [
  { title: "홈", icon: HomeIcon, path: "/sellercenter" },
  { title: "상품관리", icon: ArchiveIcon, path: "/sellercenter/product" },
  { title: "주문관리", icon: ReceiptIcon, path: "/sellercenter/order" },
  { title: "문의관리", icon: QaIcon, path: "/sellercenter/qa" },
  { title: "통계", icon: ChartIcon, path: "/sellercenter/analytics" },
  { title: "스토어 설정", icon: ShopIcon, path: "/sellercenter/setting" },
];

export default function Menu() {
  const userDispatch = useUserDispatch();

  return (
    <nav className="h-full bg-white border-t sm:border-r">
      <ul className="flex flex-col justify-between h-full">
        <div className="flex flex-col gap-2 px-2">
          <Image
            src={MoALogo}
            alt="모아로고"
            height={50}
            className="w-full px-3 py-4 max-w-24"
          />
          {MENU_ITEMS.map((item, idx) => (
            <li
              key={idx}
              className="transition-colors duration-200 rounded-sm hover:bg-gray-200"
            >
              <Link href={`${item.path}`}>
                <div className="flex items-center gap-2 px-2 py-3">
                  <Image
                    src={item.icon}
                    alt={item.title}
                    width={30}
                    height={30}
                    className=""
                  />
                  <p className="pr-6 text-nowrap">{item.title}</p>
                </div>
                <span></span>
              </Link>
            </li>
          ))}
          <li>
            <button
              type="button"
              className="flex w-full items-center gap-2 px-2 py-3 transition-colors duration-200 rounded-sm hover:bg-gray-200"
              onClick={() => userDispatch?.logout()}
            >
              <Image
                src={LogoutIcon}
                alt="로그아웃 아이콘"
                width={30}
                height={30}
              />
              <span className="pr-6 text-nowrap">로그아웃</span>
            </button>
          </li>
        </div>
      </ul>
    </nav>
  );
}
