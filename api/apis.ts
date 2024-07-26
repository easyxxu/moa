"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

const supabase = createClient();

interface ProductForm {
  name: string;
  price: string;
  stock: string;
  description: string;
  image: string[];
}

export async function addProduct(formData: ProductForm) {
  const image = formData.image;
  // console.log("#입력된 formData: ", formData);

  const { error } = await supabase
    .from("product")
    .insert({ ...formData, image });

  if (error) {
    return error;
  }

  redirect("/sellercenter/product");
}

export async function updateProduct(formData: any, productId: number) {
  const { error } = await supabase
    .from("product")
    .update({ ...formData })
    .eq("id", productId);

  return error;
}
