"use client";
import { GroupedCartItems } from "@/types/cart";
import { useEffect } from "react";
import { useCartCheckItems } from "@/contexts/CartContext";
import CartTableHeader from "./CartTableHeader";
import CartTableBody from "./CartTableBody";

interface Props {
  cartItems: GroupedCartItems;
  cartCount: number;
}

export default function CartTable({ cartItems, cartCount }: Props) {
  const { allCheck } = useCartCheckItems();

  const handleCheckAllItems = () => {
    const allCheckedItems: any[] = [];
    Object.keys(cartItems).forEach((store) => {
      cartItems[store].forEach((item) => {
        allCheckedItems.push({
          itemId: item.id,
          quantity: item.quantity,
          price: item.price,
          shippingFee: item.shipping_fee,
          store: store,
          cartItemId: item.cartItemId,
        });
      });
    });
    allCheck(allCheckedItems);
  };

  useEffect(() => {
    handleCheckAllItems();
  }, [cartItems]);

  return (
    <>
      <CartTableHeader
        handleCheckAllItems={handleCheckAllItems}
        cartCount={cartCount}
      />
      <CartTableBody cartItems={cartItems} />
    </>
  );
}
