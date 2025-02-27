import { fetchCartIdByUser, fetchCartItems } from "@/api/cartApis";
import CartNoBuyer from "@/components/cart/CartNoBuyer";
import CartNoItem from "@/components/cart/CartNoItem";
import CartTable from "@/components/cart/CartTable";
import CartTotalPrice from "@/components/cart/CartTotalPrice";
import MobileCartTotalPrice from "@/components/cart/MobileCartTotalPrice";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

async function loadCartData(userId: string) {
  try {
    const cartId = await fetchCartIdByUser(userId);
    const { data: cartItems } = await fetchCartItems(cartId);
    return cartItems;
  } catch (error) {
    throw new Error(
      error instanceof Error ? `${error.message}` : `${String(error)}`
    );
  }
}

export default async function CartPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || user?.user_metadata.user_type === "SELLER")
    return <CartNoBuyer />;

  const cartItems = await loadCartData(user.id);

  return (
    <div className="flex flex-col w-full">
      <h2 className="mb-4 text-center">장바구니</h2>
      {!cartItems || cartItems.count === 0 ? (
        <CartNoItem />
      ) : (
        <>
          <table>
            <CartTable
              cartItems={cartItems.cart}
              cartCount={cartItems.count!}
            />
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
