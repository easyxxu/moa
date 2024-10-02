import { Product } from "./product";

export interface CartItemInfo extends Product {
  quantity: number;
  cartItemId: number;
}

export interface GroupedCartItems {
  [seller_store: string]: CartItemInfo[];
}
