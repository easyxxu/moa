"use client";

import Link from "next/link";
import Button from "../common/button/Button";
import { useUserDispatch } from "@/contexts/UserContext";

const MY_MENU: { [key: string]: { href: string; title: string }[] } = {
  "나의 쇼핑": [
    { href: "/mypage/order", title: "주문조회" },
    { href: "/mypage/review", title: "리뷰조회" },
  ],
  "나의 정보": [
    { href: "/mypage/modify", title: "개인정보수정" },
    { href: "/mypage/coupon", title: "쿠폰" },
  ],
  "나의 문의": [
    { href: "/mypage/qa", title: "상품 Q/A" },
    { href: "/mypage/notice", title: "공지사항" },
  ],
};

export default function SideMenu() {
  const userDispatch = useUserDispatch();

  return (
    <div className="space-y-6">
      {Object.keys(MY_MENU).map((menu, index) => (
        <div key={index}>
          <h3 className="mb-3 text-xl font-semibold border-b-2 border-black sm:border-none">
            {menu}
          </h3>
          <ul className="space-y-2">
            {MY_MENU[menu].map((item, idx) => (
              <li key={idx}>
                <Link
                  href={item.href}
                  className="block px-2 py-1 transition-colors duration-150 rounded hover:text-blue-500 "
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <div className="sm:hidden">
        <Button
          type="button"
          style="point"
          custom="px-3 py-1"
          onClick={() => userDispatch?.logout()}
        >
          로그아웃
        </Button>
      </div>
    </div>
  );
}
