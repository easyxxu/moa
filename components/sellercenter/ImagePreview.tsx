import { MouseEventHandler } from "react";

import Image from "next/image";

import ImageIcon from "@/public/assets/icon/icon-image.svg";
import DeleteIcon from "@/public/assets/icon/icon-delete.svg";

interface Props {
  src: string;
  alt: string;
  idx: number;
  img: string;
  onClick: MouseEventHandler;
  onDelete: (arg0: number) => void;
  onDragStart: any;
  onDragEnter: any;
  onDragEnd: any;
}

export default function ImagePreview({
  src,
  alt,
  idx,
  img,
  onClick,
  onDelete,
  onDragStart,
  onDragEnter,
  onDragEnd,
}: Props) {
  return (
    <>
      <button
        type="button"
        className="absolute p-2 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 rounded-2xl shadow-out bg-primary"
        onClick={onClick}
      >
        <Image src={ImageIcon} alt="이미지 추가" />
      </button>
      {img && (
        <>
          <Image
            src={src}
            alt={alt}
            className="absolute w-full h-full border cursor-pointer rounded-2xl"
            width={100}
            height={100}
            onClick={onClick}
            draggable
            onDragStart={(e) => onDragStart(e, idx)}
            onDragEnter={(e) => onDragEnter(e, idx)}
            onDragEnd={onDragEnd}
            onDragOver={(e) => e.preventDefault()}
          />
          <button
            type="button"
            onClick={() => onDelete(idx)}
            className="absolute top-0 right-0 -translate-x-2 translate-y-2"
          >
            <Image src={DeleteIcon} alt="이미지 삭제" />
          </button>
        </>
      )}
    </>
  );
}
