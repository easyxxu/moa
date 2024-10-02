"use client";

import { createContext, useContext, useEffect, useState } from "react";

export interface CartItem {
  itemId: number;
  quantity: number;
  price: number;
  shipping_fee: number;
  store: string;
  cartItemId: number;
}

interface Price {
  productsPrice: number;
  shippingFee: number;
  totalPrice: number;
}
interface CartContextValues {
  checkedItems: CartItem[];
  uncheckItem: (arg0: CartItem) => void;
  checkItem: (arg0: CartItem) => void;
  allCheck: ([]) => void;
  allUncheck: () => void;
  changeQuantity: (arg0: number, arg1: number) => void;
  price: Price;
}

const contextDefaultValue: CartContextValues = {
  checkedItems: [],
  uncheckItem: ({}) => {},
  checkItem: ({}) => {},
  allCheck: ([]) => {},
  allUncheck: () => {},
  changeQuantity: () => {},
  price: { productsPrice: 0, shippingFee: 0, totalPrice: 0 },
};

const CheckedItemsContext = createContext(contextDefaultValue);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [checkedItems, setCheckedItems] = useState<CartItem[]>([]);
  const [price, setPrice] = useState<Price>({
    productsPrice: 0,
    shippingFee: 0,
    totalPrice: 0,
  });

  const uncheckItem = (item: CartItem) => {
    setCheckedItems((prev) => [
      ...prev.filter((prevItem) => prevItem.itemId !== item.itemId),
    ]);
  };

  const checkItem = (itemId: CartItem) => {
    setCheckedItems((prev) => [...prev, itemId]);
  };

  const allCheck = (itemIds: CartItem[]) => {
    setCheckedItems([...itemIds]);
  };

  const allUncheck = () => {
    setCheckedItems([]);
  };

  const changeQuantity = (itemId: number, updatedQuantity: number) => {
    setCheckedItems((prev) =>
      prev.map((x) =>
        x.itemId === itemId ? { ...x, quantity: updatedQuantity } : x
      )
    );
  };
  useEffect(() => {
    const productsPrice = checkedItems.reduce((acc, cur) => {
      //  각 store별로 배송비는 한번만 추가
      const existingStore = acc.find((item) => item.store === cur.store);

      if (existingStore) {
        existingStore.totalPrice += cur.price * cur.quantity;
      } else {
        acc.push({
          store: cur.store,
          totalPrice: cur.price * cur.quantity,
          shippingFee: cur.shipping_fee,
        });
      }

      return acc;
    }, [] as { store: string; totalPrice: number; shippingFee: number }[]);

    const totalProductPrice = productsPrice.reduce(
      (sum, item) => sum + item.totalPrice,
      0
    );

    const totalShippingFee = productsPrice.reduce(
      (sum, item) => sum + item.shippingFee,
      0
    );

    const finalPrice = productsPrice.reduce(
      (sum, item) => sum + item.totalPrice + item.shippingFee,
      0
    );
    setPrice({
      productsPrice: totalProductPrice,
      shippingFee: totalShippingFee,
      totalPrice: finalPrice,
    });
  }, [checkedItems, setCheckedItems]);

  const CartContextValues: CartContextValues = {
    checkedItems,
    uncheckItem,
    checkItem,
    allCheck,
    allUncheck,
    changeQuantity,
    price,
  };
  console.log("Now checkItem: ", checkedItems);
  return (
    <CheckedItemsContext.Provider value={CartContextValues}>
      {children}
    </CheckedItemsContext.Provider>
  );
}

export const useCartCheckItems = () => {
  return useContext(CheckedItemsContext);
};
