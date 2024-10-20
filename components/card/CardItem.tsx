"use client";

import Image from "next/image";
import HeartIcon from "@/public/assets/icon/icon-heart.svg";
import UnHeartIcon from "@/public/assets/icon/icon-unheart.svg";
import { useUserState } from "@/contexts/UserContext";
import { likeProduct } from "@/api/apis";
import { useModal } from "@/contexts/ModalContext";
import { useRouter } from "next/navigation";

interface Props {
  id: number;
  src: string;
  name: string;
  price?: number;
  likedCnt?: number;
  likedList?: string[];
}
export default function CardItem({
  id,
  src,
  name,
  price,
  likedCnt,
  likedList,
}: Props) {
  const router = useRouter();
  const userState = useUserState();
  const userId = userState.id;
  const { showModal, closeModal } = useModal();
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
    }
    const res = await likeProduct(id);
    console.log("#like res: ", res);
  };

  return (
    <div className="w-full shadow-out rounded-xl">
      <Image
        src={src}
        alt={name}
        width={300}
        height={300}
        className="w-full rounded-t-xl aspect-square"
      />
      <div className="flex items-center justify-between px-4 py-3 bg-white rounded-b-xl font-extralight">
        <div>
          <p>{name}</p>
          {price && <p>{price} 원</p>}
        </div>
        {likedList && (
          <div>
            <button type="button" onClick={handleLike}>
              <Image
                src={likedList?.includes(userId!) ? HeartIcon : UnHeartIcon}
                alt="좋아요"
              />
              <p className="text-center text-md font-extralight text-font-grey">
                {likedCnt}
              </p>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
