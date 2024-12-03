import { Tables } from "@/types/database.types";
import CardItem from "./CardItem";
import Link from "next/link";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string[];
  category: string;
  character_name: string;
  created_at: string;
  liked_count: number;
  liked_list: string[];
  order_count?: number;
}
interface Props {
  products: Product[] | Tables<"product">[];
}
export default function CardList({ products }: Props) {
  return (
    <div>
      <ul className="grid grid-cols-3 px-2 gap-7 md:grid-cols-4 lg:grid-cols-5">
        {products.map((product) => (
          <li key={product.id} className="">
            <Link href={`/products/${product.id}`}>
              <CardItem
                id={product.id}
                src={product.image[0]}
                name={product.name}
                price={product.price}
                likedCnt={product.liked_count}
                likedList={product.liked_list}
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
