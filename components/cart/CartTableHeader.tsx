"use client";

import { useCartCheckItems } from "@/contexts/CartContext";
import { useEffect, useState } from "react";

interface Props {
  handleCheckAllItems: () => void;
  cartCount: number;
}

export default function CartTableHeader({
  handleCheckAllItems,
  cartCount,
}: Props) {
  const { checkedItems, allUncheck } = useCartCheckItems();
  const [isChecked, setIsChecked] = useState(true);

  const handleCheckBoxToggle = () => {
    if (isChecked) {
      allUncheck();
    } else {
      handleCheckAllItems();
    }
    setIsChecked((prev) => !prev);
  };

  useEffect(() => {
    setIsChecked(cartCount === checkedItems.length);
  }, [cartCount, checkedItems]);

  return (
    <thead className="border-t-4 border-gray-900 border-y">
      <tr className="*:py-3">
        <th className="rounded-l-sm" scope="col">
          <label htmlFor="allProduct" className="a11y-hidden">
            전체상품
          </label>
          <input
            type="checkbox"
            id="allProduct"
            checked={isChecked}
            onChange={handleCheckBoxToggle}
            className="align-text-top	bg-[url('/assets/icon/icon-check-box.svg')] w-5 h-5 checked:bg-[url('/assets/icon/icon-check-box-fill.svg')]"
          />
        </th>
        <th scope="col">상품정보</th>
        <th scope="col">수량</th>
        <th scope="col">상품금액</th>
        <th className="rounded-r-sm" scope="col"></th>
      </tr>
    </thead>
  );
}
