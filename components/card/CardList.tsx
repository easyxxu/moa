import { Product } from "@/types/product";
import CardItem from "./CardItem";

interface CardListProps {
  products: Product[];
}
export default function CardList({ products }: CardListProps) {
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <CardItem
            src={product.image}
            name={product.name}
            price={product.price}
          />
        </li>
      ))}
    </ul>
  );
}
