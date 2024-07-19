import { Product } from "@/types/product";
import CardItem from "./CardItem";
import Link from "next/link";

interface CardListProps {
  products: Product[];
}
export default function CardList({ products }: CardListProps) {
  return (
    <ul className="grid grid-cols-4 gap-7">
      {products.map((product) => (
        <li key={product.id}>
          <Link href={`/products/${product.id}`}>
            <CardItem
              src={product.image[0]}
              name={product.name}
              price={product.price}
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}
