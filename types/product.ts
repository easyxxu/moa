export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  shipping_fee: number;
  image: string[];
  seller_id?: number;
  seller_store: string;
  liked_list: string[];
  liked_count: number;
}
