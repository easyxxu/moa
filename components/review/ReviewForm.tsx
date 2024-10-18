"use client";

import ImageIcon from "@/public/assets/icon/icon-image.svg";
import DeleteIcon from "@/public/assets/icon/icon-delete.svg";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Button from "../common/button/Button";
import { addReview } from "@/api/apis";
import { usePathname, useRouter } from "next/navigation";

export default function ReviewForm() {
  const router = useRouter();
  const currentPath = usePathname().split("/");
  const orderItemId = Number(currentPath[3]);
  const productId = Number(currentPath.pop());
  const multipleImgRef = useRef<HTMLInputElement>(null);
  const starsRef = useRef<(HTMLInputElement | null)[]>([]);
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

  const handleStarRating = (rating: number) => {
    setFormData((prev) => ({ ...prev, starRating: rating }));
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
      router.push(`/mypage/order`);
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
        <span className="font-light text-sm">
          (최소 15자 이상 작성해주세요.)
        </span>
      </label>
      <textarea
        id="content"
        name="content"
        className="h-24 px-4 py-3 resize-none shadow-in rounded-xl"
        onChange={handleReviewContent}
      />
      <label htmlFor="starRating" className="font-medium">
        별점
      </label>
      <div className="flex">
        {Array.from({ length: 5 }).map((x, idx) => (
          <div key={idx}>
            <input
              id="starRating"
              type="radio"
              name="starRating"
              value={idx + 1}
              className="hidden"
              onChange={() => handleStarRating(idx + 1)}
              ref={(el) => (starsRef.current[idx] = el)}
            />
            <svg
              width="33"
              height="33"
              viewBox="0 0 33 33"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => starsRef.current[idx]?.click()}
              className="cursor-pointer"
            >
              <path
                d="M15.3251 4.48207C15.7046 3.35733 17.2954 3.35733 17.6749 4.48208L19.7901 10.7508C19.9586 11.2501 20.4242 11.5884 20.9511 11.5943L27.5667 11.6688C28.7536 11.6822 29.2452 13.1952 28.2928 13.9037L22.9845 17.8525C22.5617 18.167 22.3839 18.7143 22.541 19.2173L24.5145 25.5321C24.8686 26.6651 23.5816 27.6002 22.6134 26.9133L17.2175 23.0851C16.7878 22.7802 16.2122 22.7802 15.7825 23.0851L10.3866 26.9133C9.41843 27.6002 8.13143 26.6651 8.48551 25.5321L10.459 19.2173C10.6161 18.7143 10.4383 18.167 10.0155 17.8525L4.7072 13.9037C3.75478 13.1952 4.24637 11.6822 5.43335 11.6688L12.0489 11.5943C12.5758 11.5884 13.0414 11.2501 13.2099 10.7508L15.3251 4.48207Z"
                fill={idx < formData.starRating ? "#FFD700" : "#C2C2C2"}
              />
            </svg>
          </div>
        ))}
      </div>
      <label htmlFor="images" className="font-medium">
        이미지 첨부{" "}
        <span className="font-light text-sm">(최대 3장까지 가능합니다.)</span>
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
              className="object-cover shadow-out rounded-xl"
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
