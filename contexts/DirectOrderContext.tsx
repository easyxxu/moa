"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { Price } from "./CartContext";

export interface OrderItem {
  itemId: number;
  quantity: number;
  price: number;
  shippingFee: number;
}

interface DirectOrderContextType {
  orderItem: OrderItem | null;
  price: Price;
  addOrderItem: (item: OrderItem) => void;
}

const DirectOrderContext = createContext<DirectOrderContextType>({
  orderItem: null,
  price: { productsPrice: 0, shippingFee: 0, totalPrice: 0 },
  addOrderItem: () => {},
});

export function DirectOrderProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [orderItem, setOrderItem] = useState<OrderItem | null>(null);
  const [price, setPrice] = useState<Price>({
    productsPrice: 0,
    shippingFee: 0,
    totalPrice: 0,
  });

  const addOrderItem = (item: OrderItem) => {
    setOrderItem(item);
  };
  // 가격 계산
  useEffect(() => {
    if (orderItem) {
      setPrice({
        productsPrice: orderItem.price * orderItem.quantity,
        shippingFee: orderItem.shippingFee,
        totalPrice:
          orderItem.price * orderItem.quantity + orderItem.shippingFee,
      });
    }
  }, [orderItem]);

  return (
    <DirectOrderContext.Provider value={{ orderItem, addOrderItem, price }}>
      {children}
    </DirectOrderContext.Provider>
  );
}
export const useDirectOrder = () => {
  return useContext(DirectOrderContext);
};
