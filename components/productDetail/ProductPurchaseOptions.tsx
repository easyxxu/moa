"use client";

import Image from "next/image";
import Button from "../common/button/Button";
import QuantityButton from "../common/button/QuantityButton";
import HeartIcon from "@/public/assets/icon/icon-heart.svg";
import UnHeartIcon from "@/public/assets/icon/icon-unheart.svg";
import { useState } from "react";
import { useUserDispatch, useUserState } from "@/contexts/UserContext";
import {
  addProductToCart,
  isProductInCart,
  fetchCartIdByUser,
} from "@/api/cartApis";
import { toggleProductLike } from "@/api/productApis";
import { useModal } from "@/contexts/ModalContext";
import { usePathname, useRouter } from "next/navigation";
import { useDirectOrder } from "@/contexts/DirectOrderContext";

interface Props {
  price: number;
  shippingFee: number;
  likedCnt: number;
  likedList: string[] | null;
}

export default function ProductPurchaseOptions({
  price,
  shippingFee,
  likedCnt,
  likedList,
}: Props) {
  const productId = +usePathname().split("/")[2];
  const router = useRouter();
  const userState = useUserState();
  const userId = userState.id;
  const isLogin = userState.isLogin;
  const isBuyer =
    userState.userType === "BUYER" ||
    userState.moreUserData?.app_metadata.provider === "kakao" ||
    userState.moreUserData?.app_metadata.provider === "google";

  const { showModal, closeModal } = useModal();
  const { addOrderItem } = useDirectOrder();
  const [priceByQuantity, setPriceByQuantity] = useState(price);
  const [quantity, setQuantity] = useState(1);
  const userDispatch = useUserDispatch();

  const redirectToLogin = () => {
    router.push("/login");
    closeModal();
  };
  const redirectToLoginWithLogout = () => {
    userDispatch?.logout();
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
    try {
      const cartId = await fetchCartIdByUser(userId!);
      const isInCart = await checkProductInCart(cartId);
      if (isInCart) {
        showModal({
          type: "CONFIRM",
          content:
            "이미 장바구니에 담긴 상품입니다. \n장바구니로 이동하시겠습니까?",
          onConfirm: () => redirectToCart(),
        });
        return;
      }

    const { data, error } = await addProductToCart(
      cartId!,
      productId,
      quantity
    );
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
    const result = await isProductInCart(cartId, productId);
    return result;
  };
  const handleLike = async () => {
    const res = await toggleProductLike(productId);
  };
  const handleNowBuy = () => {
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
    addOrderItem({
      itemId: productId,
      quantity,
      price,
      shippingFee,
    });
    router.push("/order/directOrder");
  };
  return (
    <>
      <hr className="my-5" />
      <QuantityButton quantity={quantity} setQuantity={setQuantity} />
      <hr className="my-5" />
      <div className="flex items-center justify-between my-5">
        <p className="font-medium">총 상품 금액</p>
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
        <Button
          type="button"
          custom="w-14 flex-col"
          style="none"
          onClick={handleLike}
        >
          <Image
            src={likedList?.includes(userId!) ? HeartIcon : UnHeartIcon}
            alt="좋아요"
          />
          <p className="font-light">{likedCnt}</p>
        </Button>
        <Button
          type="button"
          onClick={handleAddCart}
          style="line"
          custom="w-1/2 py-3"
        >
          장바구니 담기
        </Button>
        <Button
          type="button"
          style="point"
          custom="w-1/2 py-3"
          onClick={handleNowBuy}
        >
          바로 구매
        </Button>
      </div>
    </>
  );
}
