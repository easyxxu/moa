"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import StarRating from "@/components/common/StarRating";
import ImageIcon from "@/public/assets/icon/icon-image.svg";
import DeleteIcon from "@/public/assets/icon/icon-delete.svg";
import Button from "../../common/button/Button";

import { createReview } from "@/api/reviewApis";
import { Tables } from "@/types/database.types";
import { updateReview } from "@/api/reviewApis";
import { useToast } from "@/contexts/ToastContext";
import { RESPONSE_MESSAGE } from "@/utils/constants/responseMessage";

interface Props {
  reviewData?: Tables<"review">;
  productId?: number;
}

export default function ReviewForm({ reviewData, productId }: Props) {
  const { openToast } = useToast();
  const router = useRouter();
  const currentPath = usePathname().split("/");
  const formMode = currentPath[3];
  const orderItemId = Number(currentPath[4]) || reviewData?.order_item_id;
  const reviewId = Number(currentPath[4]);
  const multipleImgRef = useRef<HTMLInputElement>(null);
  const [imgFiles, setImgFiles] = useState<File[]>([]);
  const [imgPreview, setImgPreview] = useState<string[]>([]);
  const [modifiedImgs, setModifiedImgs] = useState<(string | File)[]>([]);
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
    setImgPreview((prev) => [...prev, ...imgUrl].slice(0, 3));
    setModifiedImgs((prev) => [...prev, ...filesArray].slice(0, 3));
  };

  const handleDeleteImg = (idx: number) => {
    const updatedImgFiles = imgFiles.filter((_, index) => index !== idx);
    const updatedImgPreview = imgPreview.filter((_, index) => index !== idx);
    const modifiedImg = modifiedImgs.filter((_, index) => index !== idx);
    setImgFiles(updatedImgFiles);
    setImgPreview(updatedImgPreview);
    setModifiedImgs(modifiedImg);
  };

  const handleReviewContent = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    data.append("content", formData.content);
    data.append("starRating", String(formData.starRating));
    data.append("orderItemId", String(formData.orderItemId));

    if (formMode === "write") {
      imgFiles.forEach((file, index) => {
        data.append(`images[${index}]`, file);
      });
      const res = await createReview(productId!, data);
      if (res && res.status! >= 400 && res.status! < 500) {
        openToast({ type: "ERROR", content: res.message });
        return;
      }
      openToast({
        type: "SUCCESS",
        content: RESPONSE_MESSAGE.SUCCESS.REVIEW.ADD,
      });
    } else {
      modifiedImgs.forEach((file, index) => {
        data.append(`images[${index}]`, file);
      });
      const res = await updateReview(reviewId, data);
      if (res.error) {
        openToast({ type: "ERROR", content: res.message });
        return;
      }
      openToast({
        type: "SUCCESS",
        content: res.message,
      });
      router.push("/mypage/review");
    }
  };

  useEffect(() => {
    setImgLength(imgPreview.length);
  }, [imgPreview]);

  useEffect(() => {
    setContentLength(formData.content.length);
  }, [formData.content]);

  /** edit의 경우 리뷰 데이터 저장 */
  useEffect(() => {
    if (formMode === "modify" && reviewData) {
      console.log(reviewData);
      setFormData((prev) => ({
        ...prev,
        content: reviewData.content,
        starRating: reviewData.star_rating,
      }));
      if (reviewData.images !== null) {
        setImgPreview(reviewData.images);
        setModifiedImgs(reviewData.images);
      }
    }
  }, []);

  return (
    <form className="flex flex-col w-full gap-4" onSubmit={handleSubmit}>
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
        className="h-24 px-4 py-3 border border-gray-500 rounded-sm resize-none"
        onChange={handleReviewContent}
        value={formData.content}
      />
      <fieldset>
        <legend>별점</legend>
        <StarRating
          rating={formData.starRating}
          onRatingChange={(newRating) =>
            setFormData({ ...formData, starRating: newRating })
          }
          isEditable={true}
          size={33}
        />
      </fieldset>

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
        <div className="flex items-center justify-center w-40 h-40 border border-gray-500 rounded-sm bg-background">
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
      <Button type="submit" style="point" custom="px-3 py-2">
        작성
      </Button>
    </form>
  );
}
