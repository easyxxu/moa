"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import SearchInput from "../search/SearchInput";
import Navigation from "./Navigation";
import MoaLogo from "@/public/assets/moa-logo.svg";

import { useUserState } from "@/contexts/UserContext";
import { Suspense } from "react";

export default function Header() {
  const userState = useUserState();
  const currentPath = usePathname();
  const isLogin = userState.isLogin;
  const isSeller = userState.userType === "SELLER";
  const isSellerCenter =
    userState.userType === "SELLER" && currentPath.includes("/sellercenter");
  // console.log(userState);
  return (
    <>
      {!isSellerCenter ? (
        <header className="sticky top-0 z-30 bg-white">
          <div className="flex items-center justify-between px-2 py-5 mx-auto my-0 max-w-7xl">
            <div className="flex items-center gap-4 sm:gap-9">
              <h1>
                <Link href="/">
                  <Image
                    src={MoaLogo}
                    alt="모아 로고"
                    className="min-w-16 sm:w-32"
                  />
                </Link>
              </h1>
              <Suspense>
                <SearchInput />
              </Suspense>
            </div>
            <Navigation isLogin={isLogin} isSeller={isSeller} />
          </div>
        </header>
      ) : (
        <header>
          <div className="flex items-center gap-4 py-5 mx-auto my-0 max-w-7xl">
            <h1>
              <Link href="/">
                <Image
                  src={MoaLogo}
                  alt="모아 로고"
                  className="w-32 min-w-16"
                />
              </Link>
            </h1>
            <h2 className="text-2xl text-black">
              {userState.name}님의 판매자센터
            </h2>
          </div>
        </header>
      )}
    </>
  );
}
