import Image from "next/image";
import Button from "./Button";
import CartIcon from "@/public/assets/icon/icon-shopping-cart.svg";
import PersonIcon from "@/public/assets/icon/icon-user.svg";
import ToolTip from "./ToolTip";
export default function Navigation() {
  return (
    <nav>
      <ul className="flex gap-5">
        <li>
          <ToolTip name="장바구니">
            <Button custom="w-12 h-12">
              <Image src={CartIcon} alt="장바구니" />
            </Button>
          </ToolTip>
        </li>
        <li>
          <ToolTip name="로그인">
            <Button custom="w-12 h-12">
              <Image src={PersonIcon} alt="로그인" />
            </Button>
          </ToolTip>
        </li>
      </ul>
    </nav>
  );
}
