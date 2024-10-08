import { Product } from "./product";

export interface Order {
  id: number;
  order_name: string;
  order_status: OrderStatus;
  total_price: number;
  created_at: Date;
  payment_status: string;
  payment_method: string;
  customer_id: string;
  customer_name: string;
  customer_email: string;
  customer_address: string;
  customer_phone: string;
  customer_delivery_message?: string;
}

export interface OrderItem {
  id: number;
  order_id: number;
  item_id: number;
  price: number;
  quantity: number;
  shipping_fee: number;
}

export interface OrderWithOrderItem extends Order {
  order_item: OrderItemWithProduct[];
}

export interface OrderItemWithProduct extends OrderItem {
  product: Product;
}

export type OrderStatus = "PAYMENT_PENDING" | "PAYMENT_COMPLETED";
