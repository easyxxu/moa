"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import TableHeader from "@/components/common/table/TableHeader";
import TableCell from "@/components/common/table/TableItem";
import PlusIcon from "@/public/assets/icon/icon-add-product.svg";

import { useUserState } from "@/contexts/UserContext";

import { createClient } from "@/utils/supabase/client";
import { Tables } from "@/types/database.types";
import { useToast } from "@/contexts/ToastContext";
import { deleteProduct } from "@/api/productApis";

const listHeaders = ["상품명", "가격", "수량", "수정", "삭제"];

export default function ProductDashboard() {
  const { openToast } = useToast();
  const supabase = createClient();
  const router = useRouter();
  const userState = useUserState();
  const [productData, setProductData] = useState<Tables<"product">[]>([]);
  const userId = userState.id;

  const handleDeleteProduct = async (id: number) => {
    const res = await deleteProduct(id);
    if (res.error) {
      openToast({ type: "ERROR", content: res.message });
      return;
    }

    setProductData((prev) => [...prev.filter((data) => data.id !== id)]);
    openToast({
      type: "SUCCESS",
      content: res.message,
    });
  };

  useEffect(() => {
    const fetchProduct = async () => {
      const { data, error } = await supabase
        .from("product")
        .select()
        .eq("seller_id", userId!)
        .order("created_at", { ascending: false });

      if (error) {
        console.error(error);
      }

      setProductData(data!);
    };
    if (userId) fetchProduct();
  }, [userId]);

  return (
    <div className="mb-14">
      <Link href="/sellercenter/product/add">
        <div className="flex items-center justify-center gap-2 py-2 font-semibold transition-colors border-black sm:py-4 hover:bg-gray-200">
          <Image
            src={PlusIcon}
            alt="상품 등록 아이콘"
            className="w-6 h-6"
            width={36}
            height={36}
          />
          상품 등록
        </div>
      </Link>
      {productData.length === 0 ? (
        <div className="flex items-center justify-center h-40 text-lg font-semibold text-gray-500">
          등록된 상품이 없습니다.
        </div>
      ) : (
        <table className="w-full text-sm sm:text-base">
          <TableHeader headers={listHeaders} />
          <tbody>
            {productData.map((product) => (
              <tr key={product.id} className="bg-white border-b">
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
      )}
    </div>
  );
}
