import { getCartId, getCartItem } from "@/api/apis";
import CartNoBuyer from "@/components/cart/CartNoBuyer";
import CartNoItem from "@/components/cart/CartNoItem";
import CartTable from "@/components/cart/CartTable";
import CartTotalPrice from "@/components/cart/CartTotalPrice";
import { createClient } from "@/utils/supabase/server";

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
      <h2 className="mb-4 text-3xl font-bold text-center">장바구니</h2>
      <table>
        <thead className="bg-primary rounded-2xl shadow-out">
          <tr className="*:py-3">
            <th className="rounded-l-2xl" scope="col">
              <label htmlFor="allProduct" className="a11y-hidden">
                전체상품
              </label>
              <input
                type="checkbox"
                id="allProduct"
                className="align-text-top	 bg-[url('/assets/icon/icon-check-box.svg')] w-5 h-5 checked:bg-[url('/assets/icon/icon-check-box-fill.svg')]"
              />
            </th>
            <th scope="col">상품정보</th>
            <th scope="col">수량</th>
            <th scope="col">상품금액</th>
            <th className="rounded-r-2xl" scope="col"></th>
          </tr>
        </thead>
        <CartTable cartItems={cartData.cart} />
      </table>
      <CartTotalPrice />
    </div>
  );
}
