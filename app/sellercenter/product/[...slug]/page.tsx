"use client";

import { useRef, useState } from "react";
import { v4 } from "uuid";

import Button from "@/components/common/Button";
import InputLabel from "@/components/common/InputLabel";
import ImagePreview from "@/components/sellercenter/ImagePreview";

import { addProductAction } from "@/actions/actions";
import { createClient } from "@/utils/supabase/client";

const ImageMaxCnt = 5;

export default function ProductManagement() {
  const supabase = createClient();
  const dragImgIdx = useRef<number | null>();
  const dragOverImgIdx = useRef<number | null>();
  const multipleImgRef = useRef<HTMLInputElement>(null);
  const [imgs, setImgs] = useState<string[]>(Array(ImageMaxCnt).fill(""));
  const [imgFiles, setImgFiles] = useState<File[]>([]);
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
    const newImgList = [...imgs];
    const newImgFileList = [...imgFiles];
    const dragImgValue = newImgList[dragImgIdx.current!];
    const dragImgFileValue = newImgFileList[dragImgIdx.current!];
    newImgList.splice(dragImgIdx.current!, 1);
    newImgFileList.splice(dragImgIdx.current!, 1);
    newImgList.splice(dragOverImgIdx.current!, 0, dragImgValue);
    newImgFileList.splice(dragOverImgIdx.current!, 0, dragImgFileValue);
    dragImgIdx.current = null;
    dragOverImgIdx.current = null;
    setImgs(newImgList);
    setImgFiles(newImgFileList);
  };

  const handleMutipleImgAddBtn = () => {
    multipleImgRef.current?.click();
  };

  // 이미지 여러장 업로드
  const handleMutipleImgInput = () => {
    const file = multipleImgRef.current?.files;
    if (!file) return;
    const filesArray = Array.from(file);
    setImgFiles([...imgFiles, ...filesArray]);

    const imgList = [...imgs];

    for (
      let i = 0;
      i < file.length && imgList.filter(Boolean).length < ImageMaxCnt;
      i++
    ) {
      const imgUrl = URL.createObjectURL(file[i]);
      const emptyIndex = imgList.indexOf("");

      if (emptyIndex !== -1) {
        imgList[emptyIndex] = imgUrl;
      } else {
        imgList.push(imgUrl);
      }
    }

    setImgs(imgList.slice(0, ImageMaxCnt));
  };

  const handleImgDelete = (id: number) => {
    setImgs([...imgs.filter((_, idx) => idx !== id), ""]);
    setImgFiles([...imgFiles.filter((_, idx) => idx !== id)]);
  };

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setProductInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const uploadedImgUrls = await handleUploadStorage(imgFiles);
    // console.log("uploadedImgUrls", uploadedImgUrls);
    const { error } = await addProductAction({
      ...productInfo,
      image: uploadedImgUrls,
    });

    if (error) {
      console.error("상품 등록 실패", error);
      return;
    }

    console.log("상품 등록 성공!");
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

  return (
    <div className="w-full">
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <div className="flex justify-between">
          <h3 className="text-3xl">상품 등록</h3>
          <Button
            type="submit"
            custom="bg-primary px-4 py-2 text-lg font-semibold"
          >
            등록
          </Button>
        </div>
        <InputLabel
          type="text"
          name="상품 이름"
          label="name"
          style="box"
          onBlur={handleInput}
        />
        <InputLabel
          type="text"
          name="상품 가격"
          label="price"
          style="box"
          onBlur={handleInput}
        />
        <InputLabel
          type="text"
          name="상품 수량"
          label="stock"
          style="box"
          onBlur={handleInput}
        />
        <InputLabel
          type="text"
          name="배송비"
          label="shipping_fee"
          style="box"
          onBlur={handleInput}
        />

        <label htmlFor="description" className="my-1 font-extralight">
          상품 설명
        </label>
        <textarea
          id="description"
          name="description"
          onBlur={handleInput}
          className="h-40 shadow-in rounded-2xl bg-inherit p-3"
        />
        <label htmlFor="image" className="my-1 font-extralight">
          상품 이미지
          <span className="font-grey">
            {" "}
            (이미지는 최대 5장까지 업로드 가능합니다.)
          </span>
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
            onChange={handleMutipleImgInput}
            multiple
          />
          {imgs.map((img, idx) => (
            <div
              key={idx}
              className="relative w-1/5 aspect-square shadow-in rounded-2xl"
            >
              <ImagePreview
                src={img}
                alt="미리보기"
                idx={idx}
                img={img}
                onClick={handleMutipleImgAddBtn}
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
