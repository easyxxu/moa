import Image from "next/image";
import CloseIcon from "@/public/assets/icon/icon-delete.svg";
import { useEffect, useState } from "react";

interface Props {
  type: "ERROR" | "INFO" | "SUCCESS" | "WARNING";
  content: string;
  onClose: () => void;
}

const TYPE_COLOR = {
  ERROR: "border-toast-error",
  INFO: "border-toast-info",
  SUCCESS: "border-toast-success",
  WARNING: "border-toast-warning",
};

export default function Toast({ type, content, onClose }: Props) {
  const [animationClass, setAnimationClass] = useState("slide-left");

  useEffect(() => {
    const closeTimer = setTimeout(() => {
      setAnimationClass("slide-right"); // 사라지는 애니메이션 설정
      setTimeout(onClose, 200); // 사라지는 애니메이션이 끝난 후 onClose 호출
    }, 3000);

    return () => clearTimeout(closeTimer);
  }, [onClose]);

  return (
    <div
      className={`border-b-4 ${animationClass} ${TYPE_COLOR[type]} bg-white fixed top-0 right-0 z-50 px-4 py-4 flex gap-5 justify-between`}
    >
      <p>{content}</p>
      <button type="button" className="">
        <Image
          src={CloseIcon}
          alt="닫기"
          width={24}
          height={24}
          onClick={onClose}
        />
      </button>
    </div>
  );
}
