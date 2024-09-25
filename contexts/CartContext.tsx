"use client";

import { createContext, useContext, useState } from "react";

interface cartItem {
  itemId: number;
  quantity: number;
  price: number;
  shipping_fee: number;
  store: string;
}

interface CartContextValues {
  checkedItems: cartItem[];
  uncheckItem: (arg0: cartItem) => void;
  checkItem: (arg0: cartItem) => void;
  allCheck: ([]) => void;
  allUncheck: () => void;
  changeQuantity: (arg0: number, arg1: number) => void;
}

const contextDefaultValue: CartContextValues = {
  checkedItems: [],
  uncheckItem: ({}) => {},
  checkItem: ({}) => {},
  allCheck: ([]) => {},
  allUncheck: () => {},
  changeQuantity: () => {},
};

const CheckedItemsContext = createContext(contextDefaultValue);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [checkedItems, setCheckedItems] = useState<cartItem[]>([]);

  const uncheckItem = (item: cartItem) => {
    setCheckedItems((prev) => [
      ...prev.filter((prevItem) => prevItem.itemId !== item.itemId),
    ]);
  };

  const checkItem = (itemId: cartItem) => {
    setCheckedItems((prev) => [...prev, itemId]);
  };

  const allCheck = (itemIds: cartItem[]) => {
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

  const CartContextValues: CartContextValues = {
    checkedItems,
    uncheckItem,
    checkItem,
    allCheck,
    allUncheck,
    changeQuantity,
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
