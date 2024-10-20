"use client";

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
        <li key={product.id} className="w-64">
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
  );
}
