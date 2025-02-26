"use server";

import { createClient } from "@/utils/supabase/server";
import { v4 } from "uuid";

export const uploadImgs = async (files: File[], fileCategory: string) => {
  const supabase = createClient();
  const folderId = v4();

  try {
    const uploadPromises = files.map(async (file, index) => {
      const filePath = `${fileCategory}/${folderId}/${index}`;

      const { data, error } = await supabase.storage
        .from("Image")
        .upload(filePath, file);

      if (error) throw new Error(`이미지 업로드에 실패했습니다. ${error}`);

      const {
        data: { publicUrl },
      } = await supabase.storage.from("Image").getPublicUrl(data.path);
      return publicUrl;
    });

    return await Promise.all(uploadPromises);
  } catch (e) {
    console.error("[ERROR] ", e);
    throw new Error("서버에서 문제가 생겼습니다.");
  }
};
