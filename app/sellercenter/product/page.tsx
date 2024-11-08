"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import TableHeader from "@/components/table/TableHeader";
import TableCell from "@/components/table/TableItem";
import PlusIcon from "@/public/assets/icon/icon-plus-round.svg";

import { useUserState } from "@/contexts/UserContext";

import { createClient } from "@/utils/supabase/client";
import { Tables } from "@/types/database.types";
import { useToast } from "@/contexts/toastContext";
import { TOAST_MESSAGE } from "@/utils/constants/toastMessage";
import { ERROR_MESSAGE } from "@/utils/constants/errorMessage";

const listHeaders = ["상품명", "가격", "수량", "수정", "삭제"];

export default function ProductDashboard() {
  const { openToast } = useToast();
  const supabase = createClient();
  const router = useRouter();
  const userState = useUserState();
  const [productData, setProductData] = useState<Tables<"product">[]>([]);
  const userId = userState.id;

  const handleDeleteProduct = async (id: number) => {
    const { data, error, status } = await supabase
      .from("product")
      .delete()
      .eq("id", id);
    if (status >= 400 && status < 500) {
      openToast({ type: "ERROR", content: ERROR_MESSAGE.serverError });
    }
    setProductData((prev) => [...prev.filter((data) => data.id !== id)]);
    openToast({
      type: "SUCCESS",
      content: TOAST_MESSAGE.SELLER.PRODUCT.DELETE,
    });
  };

  useEffect(() => {
    const fetchProduct = async () => {
      const { data, error } = await supabase
        .from("product")
        .select()
        .eq("seller_id", userId!);

      if (error) {
        console.error(error);
      }

      setProductData(data!);
    };
    if (userId) fetchProduct();
  }, []);

  return (
    <div className="w-full bg-white shadow-md">
      <Link href="/sellercenter/product/add">
        <div className="flex items-center justify-center gap-2 px-3 py-4 font-semibold text-white transition-colors bg-gray-300 hover:bg-gray-400">
          <Image
            src={PlusIcon}
            alt="상품 등록 아이콘"
            className="w-6 h-6"
            width={30}
            height={30}
          />
          상품 등록
        </div>
      </Link>
      {productData.length === 0 ? (
        <div className="flex items-center justify-center h-40 text-lg font-semibold text-gray-500">
          등록된 상품이 없습니다.
        </div>
      ) : (
        <table className="w-full">
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
