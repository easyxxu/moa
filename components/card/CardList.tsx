"use client";

import CardItem from "./CardItem";
import Link from "next/link";
import { Tables } from "@/types/database.types";
import { useState } from "react";
import { getProducts } from "@/api/productApis";

interface CardListProps {
  initialProducts: Tables<"product">[];
}

export default function CardList({ initialProducts }: CardListProps) {
  const [products, setProducts] = useState(initialProducts);
  const [page, setPage] = useState(1);
  const loadProducts = async () => {
    const res = await getProducts(page);
  };
  return (
    <ul className="grid grid-cols-3 px-2 gap-7 md:grid-cols-4 lg:grid-cols-5">
      {initialProducts.map((product) => (
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
  );
}
