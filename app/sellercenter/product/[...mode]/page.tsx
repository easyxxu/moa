"use client";

import { useEffect, useRef, useState } from "react";
import { v4 } from "uuid";

import Button from "@/components/common/button/Button";
import InputLabel from "@/components/common/InputLabel";
import ImagePreview from "@/components/sellercenter/ImagePreview";

import { addProduct, updateProduct } from "@/api/productApis";
import { createClient } from "@/utils/supabase/client";
import { usePathname, useRouter } from "next/navigation";
import { useUserState } from "@/contexts/UserContext";
import { useToast } from "@/contexts/ToastContext";
import { TOAST_MESSAGE } from "@/utils/constants/toastMessage";
import { ERROR_MESSAGE } from "@/utils/constants/errorMessage";
import {
  CATEGORY_OPTIONS,
  CHARACTER_OPTIONS,
} from "@/utils/constants/filterOptions";

const IMAGE_MAX_CNT = 5;

export default function ProductManagement({
  params,
}: {
  params: { mode: string[] };
}) {
  const { openToast } = useToast();
  const router = useRouter();
  const sellerName = useUserState().name!;
  const productId = parseInt(params.mode[1]);
  const operationMode = usePathname().includes("add") ? "add" : "modify";
  const supabase = createClient();
  const dragImgIdx = useRef<number | null>();
  const dragOverImgIdx = useRef<number | null>();
  const multipleImgRef = useRef<HTMLInputElement>(null);
  const [previewImgs, setPreviewImgs] = useState<string[]>(
    Array(IMAGE_MAX_CNT).fill("")
  );
  const [imgFiles, setImgFiles] = useState<File[]>([]);
  const [modifiedImgs, setModifiedImgs] = useState<any[]>([]);
  const [productInfo, setProductInfo] = useState({
    name: "",
    price: 0,
    stock: 0,
    shipping_fee: 0,
    description: "",
    character_name: "",
    category: "",
  });
  const dragStart = (e: DragEvent, position: number) => {
    dragImgIdx.current = position;
  };
  const dragEnter = (e: DragEvent, position: number) => {
    dragOverImgIdx.current = position;
  };
  const drop = (e: DragEvent) => {
    const newImgList = [...previewImgs];
    const newImgFileList = [...imgFiles];
    const newImgModifiedList = [...modifiedImgs];
    const dragImgValue = newImgList[dragImgIdx.current!];
    const dragImgFileValue = newImgFileList[dragImgIdx.current!];
    const dragImgModifiedValue = newImgModifiedList[dragImgIdx.current!];
    newImgList.splice(dragImgIdx.current!, 1);
    newImgFileList.splice(dragImgIdx.current!, 1);
    newImgModifiedList.splice(dragImgIdx.current!, 1);
    newImgList.splice(dragOverImgIdx.current!, 0, dragImgValue);
    newImgFileList.splice(dragOverImgIdx.current!, 0, dragImgFileValue);
    newImgModifiedList.splice(dragOverImgIdx.current!, 0, dragImgModifiedValue);
    dragImgIdx.current = null;
    dragOverImgIdx.current = null;
    setPreviewImgs(newImgList);
    setImgFiles(newImgFileList);
    setModifiedImgs(newImgModifiedList);
  };

  const handleMultipleImgAddBtn = () => {
    multipleImgRef.current?.click();
  };

  // 이미지 여러장 업로드
  const handleMultipleImgInput = () => {
    const files = multipleImgRef.current?.files;
    if (!files) return;

    const filesArray = Array.from(files);
    setImgFiles((prevImgFiles) =>
      [...prevImgFiles, ...filesArray].slice(0, IMAGE_MAX_CNT)
    );
    setModifiedImgs((prevModifiedImg) =>
      [...prevModifiedImg, ...filesArray].slice(0, IMAGE_MAX_CNT)
    );
    const updatePreviewImgs = [...previewImgs];
    const imgUrls = filesArray.map((file) => URL.createObjectURL(file));

    for (const imgUrl of imgUrls) {
      const emptyIndex = updatePreviewImgs.indexOf("");
      if (emptyIndex !== -1) {
        updatePreviewImgs[emptyIndex] = imgUrl;
      }
    }
    setPreviewImgs(updatePreviewImgs);
  };

  const handleImgDelete = (id: number) => {
    setPreviewImgs([...previewImgs.filter((_, idx) => idx !== id), ""]);
    setImgFiles([...imgFiles.filter((_, idx) => idx !== id)]);
    setModifiedImgs([...modifiedImgs.filter((_, idx) => idx !== id)]);
  };

  const handleInput = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setProductInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let uploadedImgUrls;

    if (operationMode === "add") {
      if (imgFiles) {
        uploadedImgUrls = await handleUploadStorage(imgFiles);
      }

      if (!uploadedImgUrls) console.log("상품 이미지 업로드 실패");
      const error = await addProduct({
        ...productInfo,
        seller_store: sellerName,
        image: uploadedImgUrls!,
      });
      if (error) {
        console.error("상품 등록 실패", error);
        openToast({ type: "ERROR", content: ERROR_MESSAGE.serverError });
      }
      openToast({ type: "SUCCESS", content: TOAST_MESSAGE.SELLER.PRODUCT.ADD });
    }

    if (operationMode === "modify") {
      // 파일 객체의 인덱스와 파일 객체를 추출
      const fileIndices = modifiedImgs
        .map((img, index) => (img instanceof File ? index : -1))
        .filter((index) => index !== -1);

      const filesToUpload = fileIndices.map((index) => modifiedImgs[index]);

      // 파일을 업로드하고 URL 배열을 반환 받음
      const uploadedImgUrls = await handleUploadStorage(filesToUpload);

      if (!uploadedImgUrls) {
        console.log("상품 이미지 업로드 실패");
        return;
      }

      // 업로드된 URL을 원래 배열의 파일 객체 인덱스에 삽입
      fileIndices.forEach((fileIndex, i) => {
        modifiedImgs[fileIndex] = uploadedImgUrls[i];
      });

      const error = await updateProduct(
        { ...productInfo, image: modifiedImgs },
        productId
      );
      if (error) {
        console.error("상품 수정 실패: ", error);
        openToast({ type: "ERROR", content: ERROR_MESSAGE.serverError });
        return;
      }
      openToast({
        type: "SUCCESS",
        content: TOAST_MESSAGE.SELLER.PRODUCT.MODIFY,
      });
      router.push("/sellercenter/product");
    }
  };

  const handleUploadStorage = async (files: File[]) => {
    const filefolder = v4(); // 고유의 파일명을 생성
    const uploadedImgUrls = [];

    for (let i = 0; i < files.length; i++) {
      const { data, error } = await supabase.storage
        .from("Image")
        .upload(`products/${filefolder}/${i}`, files[i]);

      if (error) {
        console.error("이미지 업로드에 실패했습니다.", error);
        return;
      }
      const res = await supabase.storage.from("Image").getPublicUrl(data.path);
      uploadedImgUrls.push(res.data.publicUrl);
    }

    return uploadedImgUrls;
  };

  useEffect(() => {
    const getProductData = async () => {
      const { data } = await supabase
        .from("product")
        .select(
          "name, price, stock, shipping_fee, description, image, category, character_name"
        )
        .eq("id", productId)
        .single();
      // console.log("#data:", data);
      if (!data) {
        console.log("상품 데이터를 가져오는데 실패했습니다.");
        return;
      }

      setProductInfo({
        name: data.name,
        price: data.price,
        stock: data.stock,
        shipping_fee: data.shipping_fee,
        description: data.description || "",
        category: data.category,
        character_name: data.character_name,
      });

      const adjustedPreviewImgs = [
        ...data.image, // 실제 이미지 URL
        ...Array(IMAGE_MAX_CNT - data.image.length).fill(""), // 빈 문자열로 채움
      ];

      setPreviewImgs(adjustedPreviewImgs);
      setModifiedImgs([...data.image]);
    };
    if (operationMode === "modify") {
      getProductData();
    }
  }, []);

  return (
    <div className="w-full px-4 pt-5 pb-24">
      <form className="flex flex-col gap-1" onSubmit={handleSubmit}>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-2xl font-semibold sm:text-3xl">
            상품 {operationMode === "add" ? "등록" : "수정"}
          </h3>
          <div className="flex gap-2">
            <Button
              type="button"
              custom="px-3 py-2 sm:text-lg text-base font-semibold"
              style="line"
              onClick={() => router.push("/sellercenter/product")}
            >
              취소
            </Button>
            <Button
              type="submit"
              custom="px-3 py-2 sm:text-lg text-base font-semibold"
              style="point"
            >
              {operationMode === "add" ? "등록" : "수정"}
            </Button>
          </div>
        </div>
        <InputLabel
          type="text"
          labelText="상품 이름"
          fieldName="name"
          value={productInfo.name}
          fieldId="name"
          style="box"
          onChange={handleInput}
        />
        <InputLabel
          type="text"
          labelText="상품 가격"
          fieldName="price"
          value={productInfo.price}
          fieldId="price"
          style="box"
          onChange={handleInput}
        />
        <InputLabel
          type="text"
          labelText="상품 수량"
          fieldName="stock"
          value={productInfo.stock}
          fieldId="stock"
          style="box"
          onChange={handleInput}
        />
        <InputLabel
          type="text"
          labelText="배송비"
          fieldName="shipping_fee"
          value={productInfo.shipping_fee}
          fieldId="shipping_fee"
          style="box"
          onChange={handleInput}
        />
        <label htmlFor="character" className="mb-1 ">
          상품 캐릭터
        </label>
        <select
          id="character"
          name="character_name"
          defaultValue=""
          value={productInfo.character_name}
          className="w-full px-2 py-2 border border-gray-300 rounded-sm"
          required
          onChange={handleInput}
        >
          <option value="" disabled>
            캐릭터 종류를 선택해주세요.
          </option>
          {CHARACTER_OPTIONS.map((character, idx) => (
            <option key={idx} value={character.name}>
              {character.text}
            </option>
          ))}
        </select>

        <label
          htmlFor="category"
          className="mt-4 mb-1 text-sm font-medium text-gray-700"
        >
          상품 카테고리
        </label>
        <select
          id="category"
          name="category"
          defaultValue=""
          value={productInfo.category}
          className="w-full px-2 py-2 border border-gray-300 rounded-sm"
          required
          onChange={handleInput}
        >
          <option value="" disabled>
            카테고리를 선택해주세요.
          </option>

          {CATEGORY_OPTIONS.slice(1).map((category, idx) => (
            <option key={idx} value={category.name}>
              {category.text}
            </option>
          ))}
        </select>

        <label htmlFor="description" className="my-1">
          상품 설명
        </label>
        <textarea
          id="description"
          name="description"
          value={productInfo.description}
          onChange={handleInput}
          className="h-40 p-3 bg-white border border-gray-300 rounded-sm"
        />
        <label htmlFor="image" className="my-1">
          상품 이미지
        </label>
        <div className="mb-1 text-sm">
          <p>- 이미지의 첫번째 사진이 상품의 대표이미지입니다.</p>
          <p>- 이미지는 최대 5장까지 업로드할 수 있습니다.</p>
        </div>
        <div className="flex justify-between gap-3">
          <input
            type="file"
            id="image"
            name="image"
            accept=".jpg,.jpeg,.png,.gif"
            className="hidden shadow-in"
            ref={multipleImgRef}
            onChange={handleMultipleImgInput}
            multiple
          />
          {previewImgs.map((img, idx) => (
            <div
              key={idx}
              className="relative w-1/5 bg-white border border-gray-300 rounded-sm aspect-square"
            >
              <ImagePreview
                src={img}
                alt="미리보기"
                idx={idx}
                img={img}
                onClick={handleMultipleImgAddBtn}
                onDelete={handleImgDelete}
                onDragStart={dragStart}
                onDragEnter={dragEnter}
                onDragEnd={drop}
              />
            </div>
          ))}
        </div>
      </form>
    </div>
  );
}
