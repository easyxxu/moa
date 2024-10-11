import Image from "next/image";
import HeartIcon from "@/public/assets/icon/icon-heart.svg";
import UnHeartIcon from "@/public/assets/icon/icon-unheart.svg";
import { useUserState } from "@/contexts/UserContext";
import { likeProduct } from "@/api/apis";

interface CardItemProps {
  id: number;
  src: string;
  name: string;
  price: number;
  likedCnt: number;
  likedList: string[];
}
export default function CardItem({
  id,
  src,
  name,
  price,
  likedCnt,
  likedList,
}: CardItemProps) {
  const userState = useUserState();
  const userId = userState.id;

  const handleLike = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const res = await likeProduct(id);
    console.log("#like res: ", res);
  };

  return (
    <div className="w-64 shadow-out rounded-xl">
      <Image
        src={src}
        alt={name}
        width={300}
        height={300}
        className="w-full h-64 rounded-t-xl"
      />
      <div className="flex items-center justify-between px-4 py-3 bg-white rounded-b-xl font-extralight">
        <div>
          <p>{name}</p>
          <p>{price} 원</p>
        </div>
        <div>
          <button type="button" onClick={handleLike}>
            <Image
              src={likedList.includes(userId!) ? HeartIcon : UnHeartIcon}
              alt="좋아요"
            />
            <p className="text-center text-md font-extralight text-font-grey">
              {likedCnt}
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}
