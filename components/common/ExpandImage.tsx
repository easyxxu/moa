"use client";

import Image from "next/image";
import ArrowIcon from "@/public/assets/icon/icon-arrow.svg";
import CloseIcon from "@/public/assets/icon/icon-delete.svg";
import { useState } from "react";

interface Props {
  images: string[];
  order: number;
  onClose: () => void;
}
export default function ExpandImage({ images, order, onClose }: Props) {
  const [imageOrder, setImageOrder] = useState(order);

  const handlePrevious = () => {
    setImageOrder((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };
  const handleNext = () => {
    setImageOrder((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };
  return (
    <div className="fixed top-0 left-0 z-10 w-full h-full bg-background-modal">
      <div className="flex flex-col items-center justify-center h-full">
        <div className="flex items-center h-3/4">
          <Image
            src={images[imageOrder]}
            alt="상품 이미지"
            width={400}
            height={400}
          />
        </div>
        <div className="flex items-center justify-center gap-10">
          <button type="button" onClick={handlePrevious}>
            <Image src={ArrowIcon} alt="이전 이미지" width={30} height={30} />
          </button>
          <p className="w-20 text-lg font-light text-center text-white">
            {imageOrder + 1} / {images.length}
          </p>
          <button type="button" onClick={handleNext}>
            <Image
              src={ArrowIcon}
              alt="다음 이미지"
              width={30}
              height={30}
              className="rotate-180"
            />
          </button>
        </div>
      </div>
      <button
        type="button"
        className="absolute top-10 right-10"
        onClick={onClose}
      >
        <Image src={CloseIcon} alt="닫기" width={30} height={30} />
      </button>
    </div>
  );
}
