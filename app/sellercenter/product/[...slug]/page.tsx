"use client";

import { useRef, useState } from "react";

import Button from "@/components/common/Button";
import InputLabel from "@/components/common/InputLabel";
import ImagePreview from "@/components/sellercenter/ImagePreview";

const ImageMaxCnt = 5;

export default function ProductManagement() {
  const dragImgIdx = useRef<number | null>();
  const dragOverImgIdx = useRef<number | null>();
  const multipleImgRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<(HTMLInputElement | null)[]>([]);
  const [imgs, setImgs] = useState<string[]>(Array(ImageMaxCnt).fill(""));

  const dragStart = (e: DragEvent, position: number) => {
    dragImgIdx.current = position;
  };
  const dragEnter = (e: DragEvent, position: number) => {
    dragOverImgIdx.current = position;
  };
  const drop = (e: DragEvent) => {
    const newImgList = [...imgs];
    const dragImgValue = newImgList[dragImgIdx.current!];
    newImgList.splice(dragImgIdx.current!, 1);
    newImgList.splice(dragOverImgIdx.current!, 0, dragImgValue);
    dragImgIdx.current = null;
    dragOverImgIdx.current = null;
    setImgs(newImgList);
  };
  const handleImgAddBtn = (idx: number) => {
    imgRef.current[idx]?.click();
  };

  const handleMutipleImgAddBtn = () => {
    multipleImgRef.current?.click();
  };
  // 이미지 1장 업로드
  const handleImgInput = (idx: number) => {
    const file = imgRef.current[idx]?.files;
    if (!file) return;

    const imgUrl = URL.createObjectURL(file[0]);

    const newImgs = [...imgs];
    newImgs[idx] = imgUrl;
    setImgs(newImgs);
  };
  // 이미지 여러장 업로드
  const handleMutipleImgInput = () => {
    const file = multipleImgRef.current?.files;
    if (!file) return;
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
  };

  return (
    <div className="w-full">
      <form className="flex flex-col">
        <div className="flex justify-between">
          <h3 className="text-3xl">상품 등록</h3>
          <Button
            type="submit"
            custom="bg-primary px-4 py-2 text-lg font-semibold"
          >
            등록
          </Button>
        </div>
        <InputLabel type="text" name="상품 이름" label="name" style="box" />
        <InputLabel type="text" name="상품 가격" label="price" style="box" />
        <InputLabel type="text" name="상품 수량" label="stock" style="box" />
        <InputLabel
          type="text"
          name="배송비"
          label="shipping_fee"
          style="box"
        />

        <label htmlFor="description" className="my-1 font-extralight">
          상품 설명
        </label>
        <textarea
          id="description"
          className="h-40 shadow-in rounded-2xl bg-inherit"
        />
        <label htmlFor="image" className="my-1 font-extralight">
          상품 이미지
          <span className="font-grey">
            {" "}
            (이미지는 최대 5장까지 업로드 가능합니다.)
          </span>
        </label>
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
              <input
                type="file"
                name="image"
                accept=".jpg,.jpeg,.png,.gif"
                className="hidden"
                ref={(ref) => (imgRef.current[idx] = ref)}
                onChange={() => handleImgInput(idx)}
              />
              <ImagePreview
                src={img}
                alt="미리보기"
                idx={idx}
                img={img}
                onClick={() => handleImgAddBtn(idx)}
                onDelete={handleImgDelete}
                onDragStart={dragStart}
                onDragEnter={dragEnter}
                onDragEnd={drop}
              />
            </div>
          ))}
        </div>
        <Button
          type="button"
          custom="bg-secondary px-4 py-2 my-5"
          onClick={handleMutipleImgAddBtn}
        >
          여러장 한번에 올리기
        </Button>
      </form>
    </div>
  );
}
