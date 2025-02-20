"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import HomeIcon from "@/public/assets/icon/icon-main-home.svg";
import CartIcon from "@/public/assets/icon/icon-shopping-cart.svg";
import LikeIcon from "@/public/assets/icon/icon-like.svg";
import PersonIcon from "@/public/assets/icon/icon-user.svg";

export default function MobileNavigation() {
  const currentPath = usePathname();
  const isHome = currentPath === "/";
  const isCart = currentPath === "/cart";
  const isLike = currentPath === "/like";
  const isMypage = currentPath.startsWith("/mypage");

  return (
    <nav className="sticky bottom-0 w-full bg-white border-t border-gray-300 sm:hidden">
      <ul className="flex">
        <NavigationItem icon={HomeIcon} src="/" text="홈" isActive={isHome} />
        <NavigationItem
          icon={CartIcon}
          src="/cart"
          text="장바구니"
          isActive={isCart}
        />
        <NavigationItem
          icon={LikeIcon}
          src="/like"
          text="좋아요"
          isActive={isLike}
        />
        <NavigationItem
          icon={PersonIcon}
          src="/mypage"
          text="마이페이지"
          isActive={isMypage}
        />
      </ul>
    </nav>
  );
}

function NavigationItem({
  icon,
  src,
  text,
  isActive,
}: {
  icon: string;
  src: string;
  text: string;
  isActive: boolean;
}) {
  return (
    <li className="flex-1">
      <Link
        href={src}
        className={`flex flex-col gap-0.5 w-full items-center py-2 text-sm ${
          isActive ? "text-gray-900" : "text-gray-500"
        }`}
      >
        <Image src={icon} alt={`${text} 아이콘`} className="w-6 h-6" />
        {text}
      </Link>
    </li>
  );
}
