"use client";

import CardList from "@/components/card/CardList";
import { useUserState } from "@/contexts/UserContext";
import { Product } from "@/types/product";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

const NoLikedProducts = () => {
  return (
    <div className="h-full flex justify-center items-center">
      좋아요한 상품이 없습니다.
    </div>
  );
};
export default function LikePage() {
  const supabase = createClient();
  const userState = useUserState();
  const userId = userState.id;
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from("product")
        .select()
        .order("id");
      if (!data || error) {
        console.log("데이터를 불러오는데 실패했습니다.", error);
        return;
      }
      const likedProducts = data.filter((item) =>
        item.liked_list.includes(userId)
      );
      setProducts(likedProducts);
    };
    fetchProducts();
  }, []);

  return (
    <>
      <h2 className="font-semibold text-2xl text-center mb-4">나의 좋아요</h2>
      {products.length === 0 ? (
        <NoLikedProducts />
      ) : (
        <CardList products={products} />
      )}
    </>
  );
}