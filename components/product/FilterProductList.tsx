"use client";

import { useSearchParams } from "next/navigation";
import CardList from "../common/productCard/CardList";
import { getProducts } from "@/api/productApis";
import { useEffect, useState } from "react";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";

interface Products {
  id: number;
  name: string;
  price: number;
  image: string[];
  category: string;
  character_name: string;
  created_at: string;
  liked_count: number;
  liked_list: string[];
  order_count: number;
}
interface Props {
  initialProducts: Products[];
}
export default function FilterProductList({ initialProducts }: Props) {
  const searchParams = useSearchParams();
  const searchKeyword = searchParams.get("searchKeyword") || undefined;
  const character = searchParams.get("character") || undefined;
  const category = searchParams.get("category") || undefined;
  const order = searchParams.get("order") || undefined;

  const [products, setProducts] = useState<Products[]>(initialProducts);
  const [page, setPage] = useState(2);
  const [pageEnd, setPageEnd] = useState(false);

  const loadProducts = async () => {
    const res = await getProducts(
      page,
      searchKeyword,
      character,
      category,
      order
    );

    const nextProducts = res.data?.products || [];
    if (nextProducts.length < 15) {
      setPageEnd(true);
    }

    setProducts((prev) => {
      const newProducts = nextProducts.filter(
        (product) => !prev.some((p) => p.id === product.id)
      );
      return [...prev, ...newProducts];
    });
  };

  const targetRef = useIntersectionObserver({
    onIntersect: () => {
      setPage((prev) => prev + 1);
    },
    options: { threshold: 1 },
    pageEnd,
  });

  useEffect(() => {
    if (!pageEnd) {
      loadProducts();
    }
  }, [page]);

  useEffect(() => {
    setProducts(initialProducts);
    setPage(2);
    setPageEnd(false);
  }, [searchKeyword, category, character, order]);

  return (
    <div>
      <CardList products={products} />
      {!pageEnd && <div ref={targetRef} />}
    </div>
  );
}
