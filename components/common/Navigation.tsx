"use client";
import Image from "next/image";
import Button from "./Button";
import CartIcon from "@/public/assets/icon/icon-shopping-cart.svg";
import PersonIcon from "@/public/assets/icon/icon-user.svg";
import ToolTip from "./ToolTip";
import { useRouter } from "next/navigation";
export default function Navigation() {
  const router = useRouter();

  return (
    <nav>
      <ul className="flex gap-5">
        <li>
          <ToolTip name="장바구니">
            <Button
              type="button"
              custom="w-12 h-12"
              onClick={() => router.push("/cart")}
            >
              <Image src={CartIcon} alt="장바구니" />
            </Button>
          </ToolTip>
        </li>
        <li>
          <ToolTip name="로그인">
            <Button
              type="button"
              custom="w-12 h-12"
              onClick={() => router.push("/login")}
            >
              <Image src={PersonIcon} alt="로그인" />
            </Button>
          </ToolTip>
        </li>
      </ul>
    </nav>
  );
}
