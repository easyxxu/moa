"use client";

import { useCartCheckItems } from "@/contexts/CartContext";
import { useState } from "react";

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
    isChecked ? handleCheckAllItems() : allUncheck();
    if (isChecked) {
      allUncheck();
      setIsChecked(false);
    } else {
      handleCheckAllItems();
      setIsChecked(true);
    }
  };

  return (
    <thead className="bg-primary rounded-2xl shadow-out">
      <tr className="*:py-3">
        <th className="rounded-l-2xl" scope="col">
          <label htmlFor="allProduct" className="a11y-hidden">
            전체상품
          </label>
          <input
            type="checkbox"
            id="allProduct"
            checked={cartCount === checkedItems.length ? true : false}
            onChange={handleCheckBoxToggle}
            className="align-text-top	 bg-[url('/assets/icon/icon-check-box.svg')] w-5 h-5 checked:bg-[url('/assets/icon/icon-check-box-fill.svg')]"
          />
        </th>
        <th scope="col">상품정보</th>
        <th scope="col">수량</th>
        <th scope="col">상품금액</th>
        <th className="rounded-r-2xl" scope="col"></th>
      </tr>
    </thead>
  );
}
