"use client";

import ImageIcon from "@/public/assets/icon/icon-image.svg";
import DeleteIcon from "@/public/assets/icon/icon-delete.svg";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Button from "../../common/button/Button";
import { addReview } from "@/api/apis";
import { usePathname } from "next/navigation";
import StarRating from "@/components/common/StarRating";

export default function ReviewForm() {
  const currentPath = usePathname().split("/");
  const orderItemId = Number(currentPath[3]);
  const productId = Number(currentPath.pop());
  const multipleImgRef = useRef<HTMLInputElement>(null);
  const [imgFiles, setImgFiles] = useState<File[]>([]);
  const [imgPreview, setImgPreivew] = useState<string[]>([]);
  const [imgLength, setImgLength] = useState(0);
  const [contentLength, setContentLength] = useState(0);
  const [formData, setFormData] = useState({
    orderItemId,
    content: "",
    starRating: 0,
  });
  const handleMultipleImgInput = () => {
    const files = multipleImgRef.current?.files;
    if (!files) return;

    const filesArray = Array.from(files);
    const imgUrl = filesArray.map((file) => URL.createObjectURL(file));
    setImgFiles((prev) => [...prev, ...filesArray].slice(0, 3));
    setImgPreivew((prev) => [...prev, ...imgUrl].slice(0, 3));
  };

  const handleDeleteImg = (idx: number) => {
    const updatedImgFiles = imgFiles.filter((_, index) => index !== idx);
    const updatedImgPreview = imgPreview.filter((_, index) => index !== idx);
    setImgFiles(updatedImgFiles);
    setImgPreivew(updatedImgPreview);
  };

  const handleReviewContent = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.content.length < 15 || formData.starRating === 0) {
      // toast 알림 추가
      return;
    }
    try {
      const data = new FormData();
      data.append("content", formData.content);
      data.append("starRating", String(formData.starRating));
      data.append("orderItemId", String(formData.orderItemId));

      imgFiles.forEach((file, index) => {
        data.append(`images[${index}]`, file);
      });

      const error = await addReview(productId, data);

      if (error) {
        throw error.message;
      }
    } catch (e) {
      throw new Error(`${e}`);
    }
  };

  useEffect(() => {
    setImgLength(imgFiles.length);
  }, [imgFiles]);

  useEffect(() => {
    setContentLength(formData.content.length);
  }, [formData.content]);
  return (
    <form className="flex flex-col w-full gap-2" onSubmit={handleSubmit}>
      <label htmlFor="content" className="font-medium">
        리뷰 내용 ({contentLength}/15)
        <br />
        <span className="text-sm font-light">
          (최소 15자 이상 작성해주세요.)
        </span>
      </label>
      <textarea
        id="content"
        name="content"
        className="h-24 px-4 py-3 resize-none shadow-in rounded-xl"
        onChange={handleReviewContent}
      />
      <label className="font-medium">
        별점
        <StarRating
          rating={formData.starRating}
          onRatingChange={(newRating) =>
            setFormData({ ...formData, starRating: newRating })
          }
          isEditable={true}
          size={33}
        />
      </label>
      <label htmlFor="images" className="font-medium">
        이미지 첨부{" "}
        <span className="text-sm font-light">(최대 3장까지 가능합니다.)</span>
      </label>
      <input
        type="file"
        id="images"
        name="images"
        accept=".jpg,.jpeg,.png,.gif"
        ref={multipleImgRef}
        onChange={handleMultipleImgInput}
        className="hidden"
        multiple
      />
      <div className="flex gap-4">
        <div className="flex items-center justify-center w-40 h-40 bg-background shadow-in rounded-xl">
          <button
            type="button"
            onClick={() => multipleImgRef.current?.click()}
            className="text-sm font-light"
          >
            <Image src={ImageIcon} alt="이미지 추가" /> {imgLength}/3
          </button>
        </div>
        {imgPreview.map((img, idx) => (
          <div className="relative" key={idx}>
            <Image
              src={img}
              alt="미리보기"
              width={150}
              height={150}
              key={idx}
              className="object-cover shadow-out rounded-xl aspect-square"
            />
            <button
              type="button"
              onClick={() => handleDeleteImg(idx)}
              className="absolute top-0 right-0 -translate-x-2 translate-y-2"
            >
              <Image src={DeleteIcon} alt="이미지 삭제" />
            </button>
          </div>
        ))}
      </div>
      <Button type="submit" custom="px-3 py-2 bg-primary">
        작성
      </Button>
    </form>
  );
}
