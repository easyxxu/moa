"use client";

import { useCartCheckItems } from "@/contexts/CartContext";
import TableCell from "../table/TableItem";
import { useEffect, useState } from "react";
import { loadProductById } from "@/api/apis";
import { Tables } from "@/types/database.types";

export default function OrderList() {
  const { checkedItems } = useCartCheckItems();
  const [orderItems, setOrderItems] = useState<Tables<"product">[]>([]);

  useEffect(() => {
    const getProductData = () => {
      checkedItems.map(async (item) => {
        const { data } = await loadProductById(item.itemId);
        setOrderItems((prev) => [...prev, data]);
      });
    };
    getProductData();
  }, []);

  return (
    <tbody className="">
      <tr className="h-1" />
      {orderItems.map((item, idx) => (
        <tr
          key={item.id}
          className={
            idx === 0
              ? `[&>td:first-child]:rounded-tl-2xl [&>td:last-child]:rounded-tr-2xl`
              : idx === orderItems.length - 1
              ? `[&>td:first-child]:rounded-bl-2xl [&>td:last-child]:rounded-br-2xl`
              : ""
          }
        >
          <TableCell.TextWithImgCell
            src={item.image[0]}
            text={item.name}
            price={item.price}
            quantity={checkedItems[idx].quantity}
          />
          <TableCell.TextCell text="0" />
          <TableCell.TextCell text={item.shipping_fee.toLocaleString()} />
          <TableCell.TextCell
            text={`${(
              item.price * checkedItems[idx].quantity
            ).toLocaleString()} 원`}
          />
        </tr>
      ))}
    </tbody>
  );
}
