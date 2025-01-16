"use client";

import { CartItemInfo, GroupedCartItems } from "@/types/cart";
import CartTableItem from "./CartTableItem";
import { Fragment } from "react";

interface Props {
  cartItems: GroupedCartItems;
}

export default function CartTableBody({ cartItems }: Props) {
  return (
    <tbody className="text-center">
      <tr className="h-5" />
      {Object.keys(cartItems).map((store, idx) => (
        <Fragment key={idx}>
          <tr className="bg-white">
            <td colSpan={5} className="p-3 font-bold text-left">
              {store}
            </td>
          </tr>
          {cartItems[store].map((item: CartItemInfo, index: number) => {
            const isLastItem = index === cartItems[store].length - 1;
            return (
              <Fragment key={index}>
                <CartTableItem item={item} isLastItem={isLastItem} />
              </Fragment>
            );
          })}
          <tr className="h-5" />
        </Fragment>
      ))}
    </tbody>
  );
}
