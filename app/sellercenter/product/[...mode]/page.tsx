"use client";

import { useEffect, useRef, useState } from "react";
import { v4 } from "uuid";

import Button from "@/components/common/button/Button";
import InputLabel from "@/components/common/InputLabel";
import ImagePreview from "@/components/sellercenter/ImagePreview";

import { addProduct, updateProduct } from "@/api/apis";
import { createClient } from "@/utils/supabase/client";
import { usePathname, useRouter } from "next/navigation";

const ImageMaxCnt = 5;

export default function ProductManagement({
  params,
}: {
  params: { mode: string[] };
}) {
  const router = useRouter();
  const productId = parseInt(params.mode[1]);
  const operationMode = usePathname().includes("add") ? "add" : "modify";
  const supabase = createClient();
  const dragImgIdx = useRef<number | null>();
  const dragOverImgIdx = useRef<number | null>();
  const multipleImgRef = useRef<HTMLInputElement>(null);
  const [previewImgs, setPreviewImgs] = useState<string[]>(
    Array(ImageMaxCnt).fill("")
  );
  const [imgFiles, setImgFiles] = useState<File[]>([]);
  const [modifiedImgs, setModifiedImgs] = useState<any[]>([]);
  const [productInfo, setProductInfo] = useState({
    name: "",
    price: "",
    stock: "",
    shipping_fee: "",
    description: "",
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
      [...prevImgFiles, ...filesArray].slice(0, ImageMaxCnt)
    );
    setModifiedImgs((prevModifiedImg) =>
      [...prevModifiedImg, ...filesArray].slice(0, ImageMaxCnt)
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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
        image: uploadedImgUrls!,
      });
      if (error) {
        console.error("상품 등록 실패", error);
        return;
      }

      console.log("상품 등록 성공!");
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
        return;
      }
      console.log("상품 수정 성공");
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
        .select("name, price, stock, shipping_fee, description, image")
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
        description: data.description,
      });

      const adjustedPreviewImgs = [
        ...data.image, // 실제 이미지 URL
        ...Array(ImageMaxCnt - data.image.length).fill(""), // 빈 문자열로 채움
      ];

      setPreviewImgs(adjustedPreviewImgs);
      setModifiedImgs([...data.image]);
    };
    if (operationMode === "modify") {
      getProductData();
    }
  }, []);
  // console.log("imgFiles:", imgFiles);
  // console.log("modifiedImgs:", modifiedImgs);
  return (
    <div className="w-full mb-10">
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <div className="flex justify-between">
          <h3 className="text-3xl">
            상품 {operationMode === "add" ? "등록" : "수정"}
          </h3>
          <Button
            type="submit"
            custom="bg-primary px-4 py-2 text-lg font-semibold"
          >
            {operationMode === "add" ? "등록" : "수정"}
          </Button>
        </div>
        <InputLabel
          type="text"
          name="상품 이름"
          value={productInfo.name}
          label="name"
          style="box"
          onChange={handleInput}
        />
        <InputLabel
          type="text"
          name="상품 가격"
          value={productInfo.price}
          label="price"
          style="box"
          onChange={handleInput}
        />
        <InputLabel
          type="text"
          name="상품 수량"
          value={productInfo.stock}
          label="stock"
          style="box"
          onChange={handleInput}
        />
        <InputLabel
          type="text"
          name="배송비"
          value={productInfo.shipping_fee}
          label="shipping_fee"
          style="box"
          onChange={handleInput}
        />

        <label htmlFor="description" className="my-1 font-extralight">
          상품 설명
        </label>
        <textarea
          id="description"
          name="description"
          value={productInfo.description}
          onChange={handleInput}
          className="h-40 shadow-in rounded-2xl bg-inherit p-3"
        />
        <label htmlFor="image" className="my-1 font-extralight">
          상품 이미지
        </label>
        <div className="font-extralight mb-1">
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
              className="relative w-1/5 aspect-square shadow-in rounded-2xl"
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
