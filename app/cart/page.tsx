import { getCartId, getCartItem } from "@/api/apis";
import CartNoBuyer from "@/components/cart/CartNoBuyer";
import CartNoItem from "@/components/cart/CartNoItem";
import CartTable from "@/components/cart/CartTable";
import CartTotalPrice from "@/components/cart/CartTotalPrice";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export default async function CartPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  /**
   * TODO Logout 상태일 때 처리하기
   */

  const isLogin = user !== null ? true : false;
  const isSeller = user?.user_metadata.user_type === "SELLER";

  if (!isLogin || isSeller) return <CartNoBuyer />;

  const cartId = await getCartId(user!.id);
  const cartData = await getCartItem(cartId);

  if (!cartData || cartData.count === 0) return <CartNoItem />;
  return (
    <div className="flex flex-col w-full my-5">
      <h2 className="mb-4 text-center">장바구니</h2>
      <table>
        <CartTable cartItems={cartData.cart} cartCount={cartData.count} />
      </table>
      <CartTotalPrice />
      <Link
        href="/order"
        className="self-center w-1/5 py-4 my-4 text-2xl font-semibold text-center rounded-2xl bg-primary shadow-out"
      >
        주문하기
      </Link>
    </div>
  );
}
