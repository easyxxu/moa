"use client";

import { useCartCheckItems } from "@/contexts/CartContext";
import TableCell from "../common/table/TableItem";
import { useEffect, useState } from "react";
import { loadProductById } from "@/api/productApis";
import { Tables } from "@/types/database.types";
import { useDirectOrder } from "@/contexts/DirectOrderContext";
import { usePathname } from "next/navigation";

export default function OrderList() {
  const pathname = usePathname();
  const orderType = pathname.split("/").pop();
  const { checkedItems } = useCartCheckItems();
  const { orderItem } = useDirectOrder();
  const [orderItems, setOrderItems] = useState<Tables<"product">[]>([]);
  useEffect(() => {
    const getProductData = async () => {
      if (orderType === "directOrder" && orderItem) {
        const { data } = await loadProductById(orderItem.itemId);
        if (data) {
          setOrderItems([data]);
        }
        return;
      }

      const fetchData = checkedItems.map(async (item) => {
        const { data } = await loadProductById(item.itemId);
        return data;
      });

      const results = await Promise.all(fetchData);
      setOrderItems(results.filter(Boolean) as Tables<"product">[]);
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
            quantity={
              orderType === "directOrder"
                ? orderItem?.quantity
                : checkedItems[idx].quantity
            }
          />
          <TableCell.TextCell text="0" />
          <TableCell.TextCell text={item.shipping_fee.toLocaleString()} />
          <TableCell.TextCell
            text={`${(
              item.price *
              (orderType === "directOrder"
                ? orderItem?.quantity!
                : checkedItems[idx].quantity)
            ).toLocaleString()} 원`}
          />
        </tr>
      ))}
    </tbody>
  );
}
