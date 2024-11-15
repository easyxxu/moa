import { Tables } from "./database.types";

export interface CartItemInfo extends Tables<'product'> {
  quantity: number;
  cartItemId: number;
}

export interface GroupedCartItems {
  [seller_store: string]: CartItemInfo[];
}
