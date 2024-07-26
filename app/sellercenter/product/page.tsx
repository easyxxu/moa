"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import TableHeader from "@/components/table/TableHeader";
import TableCell from "@/components/table/TableItem";
import PlusIcon from "@/public/assets/icon/icon-plus-round.svg";

import { Product } from "@/types/product";
import { useUserState } from "@/contexts/UserContext";

import { createClient } from "@/utils/supabase/client";

const listHeaders = ["상품명", "가격", "수량", "수정", "삭제"];

export default function ProductDashboard() {
  const supabase = createClient();
  const router = useRouter();
  const userState = useUserState();
  const [productData, setProductData] = useState<Product[]>([]);
  const userId = userState.id;

  const handleDeleteProduct = async (id: number) => {
    const res = await supabase.from("product").delete().eq("id", id);
    if (res.status === 204) console.log("Delete Product");
    setProductData((prev) => [...prev.filter((data) => data.id !== id)]);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      const { data, error } = await supabase
        .from("product")
        .select()
        .eq("seller_id", userId);

      if (error) {
        console.error(error);
      }

      setProductData(data ?? []);
    };
    if (userId) fetchProduct();
  }, []);

  return (
    <div className="w-full">
      <Link
        href="/sellercenter/product/add"
        className="mb-3 flex justify-center gap-2 px-3 py-2 text-2xl items-center font-medium shadow-out rounded-2xl bg-primary hover:shadow-in"
      >
        <Image
          src={PlusIcon}
          alt=""
          className="w-6 h-6"
          width={30}
          height={30}
        />
        상품 등록
      </Link>
      <table className="w-full shadow-out">
        <TableHeader headers={listHeaders} />
        <tbody>
          {productData.map((product) => (
            <tr key={product.id} className="bg-white">
              <TableCell.TextWithImgCell
                src={product.image[0]}
                text={product.name}
              />
              <TableCell.TextCell text={product.price.toLocaleString()} />
              <TableCell.TextCell text={product.stock} />
              <TableCell.ButtonCell
                text="수정"
                onClick={() =>
                  router.push(`/sellercenter/product/modify/${product.id}`)
                }
              />
              <TableCell.ButtonCell
                text="삭제"
                onClick={() => handleDeleteProduct(product.id!)}
              />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
