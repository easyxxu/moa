"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import Button from "./button/Button";
import ToolTip from "./ToolTip";
import CartIcon from "@/public/assets/icon/icon-shopping-cart.svg";
import PersonIcon from "@/public/assets/icon/icon-user.svg";
import LogoutIcon from "@/public/assets/icon/icon-logout.svg";
import ShopIcon from "@/public/assets/icon/icon-shop.svg";
import LikeIcon from "@/public/assets/icon/icon-like.svg";

import { logOutAction } from "@/actions/actions";
import { useUserDispatch } from "@/contexts/UserContext";

interface Props {
  isAuthenticated: boolean;
  isSeller: boolean;
}

export default function Navigation({ isAuthenticated, isSeller }: Props) {
  const [isLogOut, setIsLogOut] = useState(!isAuthenticated);
  const userDispatch = useUserDispatch();

  return (
    <nav>
      <ul className="flex gap-5">
        {isLogOut ? (
          <>
            <li>
              <ToolTip name="장바구니">
                <Link href="/cart" className="w-12 h-12 outer-box">
                  <Image src={CartIcon} alt="장바구니" />
                </Link>
              </ToolTip>
            </li>
            <li>
              <ToolTip name="로그인">
                <Link href="/login" className="w-12 h-12 outer-box">
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
                    <Link href="/cart" className="w-12 h-12 outer-box">
                      <Image src={CartIcon} alt="장바구니" />
                    </Link>
                  </ToolTip>
                </li>
                <li>
                  <ToolTip name="마이페이지">
                    <Link href="/mypage" className="w-12 h-12 outer-box">
                      <Image src={PersonIcon} alt="마이페이지" />
                    </Link>
                  </ToolTip>
                </li>
                <li>
                  <ToolTip name="나의 좋아요">
                    <Link href="/product/like" className="w-12 h-12 outer-box">
                      <Image src={LikeIcon} alt="좋아요" />
                    </Link>
                  </ToolTip>
                </li>
                <li>
                  <ToolTip name="로그아웃">
                    <Button
                      type="button"
                      custom="w-12 h-12"
                      onClick={async () => {
                        await logOutAction();
                        // localStorage.setItem(
                        //   "userState",
                        //   JSON.stringify({
                        //     id: null,
                        //     name: null,
                        //     user_type: "LOGGED_OUT",
                        //     isLogin: false,
                        //   })
                        // );
                        userDispatch({
                          type: "LOGOUT",
                        });
                        setIsLogOut(true);
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
                      custom="w-12 h-12"
                      onClick={async () => {
                        await logOutAction();
                        // localStorage.setItem(
                        //   "userState",
                        //   JSON.stringify({
                        //     id: null,
                        //     name: null,
                        //     user_type: "LOGGED_OUT",
                        //     isLogin: false,
                        //   })
                        // );
                        userDispatch({
                          type: "LOGOUT",
                        });
                        setIsLogOut(true);
                      }}
                    >
                      <Image src={LogoutIcon} alt="로그아웃" />
                    </Button>
                  </ToolTip>
                </li>
                <li>
                  <ToolTip name="판매자센터">
                    <Link href="/sellercenter" className="w-12 h-12 outer-box">
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
