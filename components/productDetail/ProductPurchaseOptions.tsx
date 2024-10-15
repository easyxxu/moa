"use client";

import Image from "next/image";
import Button from "../common/button/Button";
import QuantityButton from "../common/button/QuantityButton";
import HeartIcon from "@/public/assets/icon/icon-heart.svg";
import UnHeartIcon from "@/public/assets/icon/icon-unheart.svg";
import { useState } from "react";
import { useUserDispatch, useUserState } from "@/contexts/UserContext";
import {
  addCartItem,
  checkCartItem,
  createCart,
  getCartId,
  likeProduct,
} from "@/api/apis";
import { useModal } from "@/contexts/ModalContext";
import { usePathname, useRouter } from "next/navigation";

interface Props {
  price: number;
  likedCnt: number;
  likedList: string[];
}

export default function ProductPurchaseOptions({
  price,
  likedCnt,
  likedList,
}: Props) {
  const productId = +usePathname().split("/")[2];
  const router = useRouter();
  const userState = useUserState();
  const userId = userState.id;
  const isLogin = userState.isLogin;
  const isBuyer = userState.userType === "BUYER";
  const { showModal, closeModal } = useModal();
  const [priceByQuantity, setPriceByQuantity] = useState(price);
  const [quantity, setQuantity] = useState(1);
  const userDispatch = useUserDispatch();

  const redirectToLogin = () => {
    router.push("/login");
    closeModal();
  };
  const redirectToLoginWithLogout = () => {
    userDispatch({ type: "LOGOUT" });
    router.push("/login");
    closeModal();
  };
  const redirectToCart = () => {
    router.push("/cart");
    closeModal();
  };
  const handleAddCart = async () => {
    if (!isLogin) {
      showModal({
        type: "CONFIRM",
        content: "로그인이 필요한 서비스입니다. \n로그인 하시겠습니까?",
        onConfirm: () => redirectToLogin(),
      });
      return;
    } else if (!isBuyer) {
      showModal({
        type: "CONFIRM",
        content: "구매자로 로그인해주세요. \n로그인 하시겠습니까?",
        onConfirm: () => redirectToLoginWithLogout(),
      });
      return;
    }
    let cartId;
    cartId = await getCartId(userId!);
    if (!cartId) {
      cartId = await createCart(userId!);
    }

    const isInCart = await checkProductInCart(cartId); // 이미 장바구니에 담긴 물건인지 확인
    if (isInCart) {
      showModal({
        type: "CONFIRM",
        content:
          "이미 장바구니에 담긴 상품입니다. \n장바구니로 이동하시겠습니까?",
        onConfirm: () => redirectToCart(),
      });
      return;
    }

    const { data, error } = await addCartItem({
      cartId,
      productId,
      quantity,
    });
    if (!error) {
      showModal({
        type: "CONFIRM",
        content: "장바구니에 담겼습니다. \n장바구니로 이동하시겠습니까?",
        onConfirm: () => redirectToCart(),
      });
      console.log("장바구니 담긴 상품:", data);
    }
  };
  const checkProductInCart = async (cartId: number) => {
    const result = await checkCartItem(cartId, productId);
    console.log("result:", result);
    return result;
  };
  const handleLike = async () => {
    const res = await likeProduct(productId);
    console.log("#res: ", res);
  };
  return (
    <>
      <hr className="my-5" />
      <QuantityButton quantity={quantity} setQuantity={setQuantity} />
      <hr className="my-5" />
      <div className="flex items-center justify-between my-5">
        <p className="font-semibold">총 상품 금액</p>
        <div className="flex items-center">
          <span className="mr-5">수량 : {quantity}</span>
          <span className="text-3xl before:content-[''] before:absolute before:w-px before:h-6 before:bg-font-hover before:-translate-x-2.5 before:translate-y-1.5">
            <strong>
              {(priceByQuantity * quantity).toLocaleString("ko-KR")}
            </strong>{" "}
            원
          </span>
        </div>
      </div>
      <div className="flex gap-3">
        <Button type="button" custom="w-14" onClick={handleLike}>
          <Image
            src={likedList.includes(userId!) ? HeartIcon : UnHeartIcon}
            alt="좋아요"
          />
          <p className="ml-1 text-font-grey font-extralight">{likedCnt}</p>
        </Button>
        <Button
          type="button"
          onClick={handleAddCart}
          custom="w-1/2 py-3 font-semibold"
        >
          장바구니 담기
        </Button>
        <Button type="button" custom="w-1/2 py-3 bg-primary font-semibold">
          바로 구매
        </Button>
      </div>
    </>
  );
}
