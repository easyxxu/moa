"use client";

import Image from "next/image";
import Link from "next/link";

import Button from "./button/Button";
import ToolTip from "./ToolTip";
import CartIcon from "@/public/assets/icon/icon-shopping-cart.svg";
import PersonIcon from "@/public/assets/icon/icon-user.svg";
import LogoutIcon from "@/public/assets/icon/icon-logout.svg";
import ShopIcon from "@/public/assets/icon/icon-shop.svg";
import LikeIcon from "@/public/assets/icon/icon-like.svg";

import { useUserDispatch } from "@/contexts/UserContext";
import { userLogOut } from "@/api/userApis";

interface Props {
  isLogin: boolean;
  isSeller: boolean;
}

export default function Navigation({ isLogin, isSeller }: Props) {
  const userDispatch = useUserDispatch();
  const linkCss = "w-12 h-12 flex justify-center rounded-md hover:bg-gray-100";
  return (
    <nav>
      <ul className="z-20 flex gap-2">
        {!isLogin ? (
          <>
            <li>
              <ToolTip name="장바구니">
                <Link href="/cart" className={`${linkCss}`}>
                  <Image src={CartIcon} alt="장바구니" />
                </Link>
              </ToolTip>
            </li>
            <li>
              <ToolTip name="로그인">
                <Link href="/login" className={`${linkCss}`}>
                  <Image src={PersonIcon} alt="로그인" />
                </Link>
              </ToolTip>
            </li>
          </>
        ) : (
          <>
            {!isSeller ? (
              <>
                <li>
                  <ToolTip name="장바구니">
                    <Link href="/cart" className={`${linkCss}`}>
                      <Image src={CartIcon} alt="장바구니" />
                    </Link>
                  </ToolTip>
                </li>
                <li>
                  <ToolTip name="마이페이지">
                    <Link href="/mypage" className={`${linkCss}`}>
                      <Image src={PersonIcon} alt="마이페이지" />
                    </Link>
                  </ToolTip>
                </li>
                <li>
                  <ToolTip name="나의 좋아요">
                    <Link href="/like" className={`${linkCss}`}>
                      <Image src={LikeIcon} alt="좋아요" />
                    </Link>
                  </ToolTip>
                </li>
                <li>
                  <ToolTip name="로그아웃">
                    <Button
                      type="button"
                      style="none"
                      custom="w-12 h-12"
                      onClick={async () => {
                        await userLogOut();
                        userDispatch({
                          type: "LOGOUT",
                        });
                      }}
                    >
                      <Image src={LogoutIcon} alt="로그아웃" />
                    </Button>
                  </ToolTip>
                </li>
              </>
            ) : (
              <>
                <li>
                  <ToolTip name="로그아웃">
                    <Button
                      type="button"
                      style="none"
                      custom="w-12 h-12"
                      onClick={async () => {
                        await userLogOut();
                        userDispatch({
                          type: "LOGOUT",
                        });
                      }}
                    >
                      <Image src={LogoutIcon} alt="로그아웃" />
                    </Button>
                  </ToolTip>
                </li>
                <li>
                  <ToolTip name="판매자센터">
                    <Link href="/sellercenter" className={`${linkCss}`}>
                      <Image src={ShopIcon} alt="판매자샵" />
                    </Link>
                  </ToolTip>
                </li>
              </>
            )}
          </>
        )}
      </ul>
    </nav>
  );
}
