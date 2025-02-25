import { fetchCartIdByUser, fetchCartItems } from "@/api/cartApis";
import CartNoBuyer from "@/components/cart/CartNoBuyer";
import CartNoItem from "@/components/cart/CartNoItem";
import CartTable from "@/components/cart/CartTable";
import CartTotalPrice from "@/components/cart/CartTotalPrice";
import MobileCartTotalPrice from "@/components/cart/MobileCartTotalPrice";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export default async function CartPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isLogin = user !== null ? true : false;
  const isSeller = user?.user_metadata.user_type === "SELLER";

  if (!isLogin || isSeller) return <CartNoBuyer />;

  // 장바구니 ID 가져오기
  const { status, message, data } = await fetchCartIdByUser(user!.id);
  if (status !== 200) {
    throw new Error(message);
  }
  const cartId = data?.id;

  // 장바구니 아이템 가져오기
  let cartItem = null;
  if (cartId) {
    const {
      status: getCartItemStatus,
      message: getCartItemMsg,
      data: cartItemData,
    } = await fetchCartItems(cartId);
    if (getCartItemStatus !== 200) {
      throw new Error(getCartItemMsg);
    }
    cartItem = cartItemData;
  }

  return (
    <div className="flex flex-col w-full">
      <h2 className="mb-4 text-center">장바구니</h2>
      {!cartId || !cartItem || cartItem.count === 0 ? (
        <CartNoItem />
      ) : (
        <>
          <table>
            <CartTable cartItems={cartItem.cart} cartCount={cartItem.count!} />
          </table>
          <CartTotalPrice />
          <MobileCartTotalPrice />
          <Link
            href="/order/cartOrder"
            className="self-center w-1/3 py-2 my-10 text-2xl text-center text-white transition-shadow bg-black rounded-sm sm:py-4 sm:w-1/5 text-nowrap duration-300font-semibold hover:shadow-md "
          >
            주문하기
          </Link>
        </>
      )}
    </div>
  );
}
