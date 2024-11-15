"use server";

import { createClient } from "@/utils/supabase/server";

export const uploadImgs = async (files: File[], fileCategory: string) => {
  const supabase = createClient();
  const fileFolder = crypto.randomUUID();
  const uploadedImgUrls = [];
  try {
    for (let i = 0; i < files.length; i++) {
      // 이미지 업로드
      const { data, error } = await supabase.storage
        .from("Image")
        .upload(`/${fileCategory}/${fileFolder}/${i}`, files[i]);
      if (error) {
        throw { message: "이미지 업로드 실패", error };
      }
      // 이미지 url 로드
      const {
        data: { publicUrl },
      } = await supabase.storage.from("Image").getPublicUrl(data.path);
      uploadedImgUrls.push(publicUrl);
    }

    return uploadedImgUrls;
  } catch (e) {
    console.error("[ERROR] ", e);
    throw new Error("서버에서 문제가 생겼습니다.");
  }
};
