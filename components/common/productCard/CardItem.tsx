"use client";

import Image from "next/image";
import HeartIcon from "@/public/assets/icon/icon-heart.svg";
import UnHeartIcon from "@/public/assets/icon/icon-unheart.svg";
import { useUserState } from "@/contexts/UserContext";
import { likeProduct } from "@/api/productApis";
import { useModal } from "@/contexts/ModalContext";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  id: number;
  src: string;
  name: string;
  price?: number;
  likedCnt?: number;
  likedList?: string[] | null;
}
export default function CardItem({
  id,
  src,
  name,
  price,
  likedCnt,
  likedList,
}: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const userState = useUserState();
  const userId = userState.id;
  const { showModal, closeModal } = useModal();
  const [isLiked, setIsLiked] = useState(likedList?.includes(userId!));
  const [isLikedCnt, setIsLikedCnt] = useState(likedCnt || 0);

  const handleLike = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // 로그인 여부 체크
    if (!userState.isLogin) {
      showModal({
        type: "CONFIRM",
        content: "로그인이 필요합니다. \n 로그인하러 가시겠습니까?",
        onConfirm: () => {
          router.push("/login");
          closeModal();
        },
      });
      return;
    } else if (userState.userType === "SELLER") {
      showModal({
        type: "CONFIRM",
        content: "판매자로 로그인해주세요.  \n 로그인하러 가시겠습니까?",
        onConfirm: () => {
          router.push("/login");
          closeModal();
        },
      });
      return;
    }
    const res = await likeProduct(id);
    setIsLiked(res.liked);
    setIsLikedCnt((prev) => {
      return res.liked ? prev + 1 : prev - 1;
    });
  };

  useEffect(() => {
    setIsLiked(likedList?.includes(userId!)!);
    setIsLikedCnt(likedCnt!);
  }, [userId, likedCnt]);

  return (
    <div className="w-full h-full transition-shadow duration-300 rounded-sm shadow-sm hover:shadow-md">
      <Image
        src={src}
        alt={name}
        width={300}
        height={300}
        className="object-cover w-full rounded-sm aspect-square"
      />
      <div className="flex items-center justify-between gap-1 px-3 py-3 text-sm font-normal bg-white rounded-b-xl">
        <div className="w-4/5">
          <p className="line-clamp-1">{name}</p>
          {price && <p>{price.toLocaleString()} 원</p>}
        </div>
        {!pathname.includes("mypage") && !pathname.includes("order") && (
          <div className="flex-shrink-0">
            <button type="button" onClick={handleLike}>
              <Image src={isLiked ? HeartIcon : UnHeartIcon} alt="좋아요" />
              <p className="text-center text-font-grey">{isLikedCnt}</p>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
