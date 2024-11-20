import { getCartId, getCartItem } from "@/api/cartApis";
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
  const { status, message, data } = await getCartItem(cartId!);
  if (status !== 200) {
    throw new Error(message);
  }

  return (
    <div className="flex flex-col w-full">
      <h2 className="mb-4 text-center">장바구니</h2>
      {!data || data.count === 0 ? (
        <CartNoItem />
      ) : (
        <>
          <table>
            <CartTable cartItems={data.cart} cartCount={data.count!} />
          </table>
          <CartTotalPrice />
          <Link
            href="/order"
            className="self-center w-1/5 py-4 my-10 text-2xl text-center text-white transition-shadow bg-blue-500 rounded-sm duration-300font-semibold hover:shadow-md "
          >
            주문하기
          </Link>
        </>
      )}
    </div>
  );
}
