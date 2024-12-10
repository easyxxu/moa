"use client";

import { CartItemInfo } from "@/types/cart";
import Image from "next/image";
import Button from "../common/button/Button";
import { useModal } from "@/contexts/ModalContext";
import { useEffect, useState } from "react";
import { deleteCartItem, updateQuantity } from "@/api/cartApis";
import DeleteIcon from "@/public/assets/icon/icon-delete.svg";
import { useCartCheckItems } from "@/contexts/CartContext";
import { useRouter } from "next/navigation";
import { useToast } from "@/contexts/ToastContext";
import { TOAST_MESSAGE } from "@/utils/constants/toastMessage";
import Link from "next/link";

interface Props {
  item: CartItemInfo;
  isLastItem: boolean;
}

export default function CartTableItem({ item, isLastItem }: Props) {
  const { openToast } = useToast();
  const router = useRouter();
  const { showModal, closeModal } = useModal();
  const { checkItem, uncheckItem, checkedItems, changeQuantity, allUncheck } =
    useCartCheckItems();
  const [isChecked, setIsChecked] = useState(true);
  const [quantity, setQuantity] = useState(item.quantity);

  const handleOpenQuantityModal = () => {
    showModal({
      type: "QUANTITY",
      content: "수량 수정",
      onConfirm: (updatedQuantity) => {
        submitModifyQuantity(updatedQuantity);
      },
      onCancelAction: () => {
        handleResetQuantity();
      },
      quantity,
    });
  };

  const handleResetQuantity = () => {
    setQuantity(item.quantity);
  };

  const submitModifyQuantity = async (updatedQuantity: number) => {
    const data = await updateQuantity(item.id!, updatedQuantity);
    setQuantity(data?.quantity!);
    changeQuantity(item.id!, data?.quantity!);
    closeModal();
  };

  const handleDeleteCartItem = async () => {
    const res = await deleteCartItem(item.id!);
    closeModal();
    openToast({ type: "SUCCESS", content: TOAST_MESSAGE.CART.DELETE });
  };

  const handleOpenDeleteModal = () => {
    showModal({
      type: "CONFIRM",
      content: "장바구니에서 삭제하시겠습니까?",
      onConfirm: () => {
        handleDeleteCartItem();
      },
    });
  };

  const handleCheckToggle = () => {
    const updateItem = {
      itemId: item.id!,
      price: item.price,
      quantity: item.quantity,
      shippingFee: item.shipping_fee,
      store: item.seller_store,
      cartItemId: item.cartItemId,
    };
    setIsChecked(!isChecked);
    if (isChecked) {
      uncheckItem(updateItem);
    } else {
      checkItem(updateItem);
    }
  };

  const handleOrderOneProduct = () => {
    const itemForOneOrder = {
      itemId: item.id!,
      price: item.price,
      quantity: item.quantity,
      shippingFee: item.shipping_fee,
      store: item.seller_store,
      cartItemId: item.cartItemId,
    };
    allUncheck();
    checkItem(itemForOneOrder);
    router.push(`/order/cartOrder`);
  };

  useEffect(() => {
    checkedItems.filter((checkedItem) => checkedItem.itemId === item.id)
      .length === 1
      ? setIsChecked(true)
      : setIsChecked(false);
  }, [checkItem]);
  // console.log("#item: ", item);
  return (
    <tr
      key={item.id}
      className={`relative b-4 *:p-4 ${
        isLastItem ? "border-b border-gray-200" : ""
      }`}
    >
      <td>
        <label htmlFor="productCheck" className="a11y-hidden">
          {item.name}선택
        </label>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckToggle}
          id="productCheck"
          className="bg-[url('/assets/icon/icon-check-box.svg')] w-5 h-5 checked:bg-[url('/assets/icon/icon-check-box-fill.svg')]"
        />
      </td>
      <td>
        <div className="flex gap-3">
          <Link href={`/products/${item.id}`}>
            <Image
              src={item.image[0]}
              alt={item.name}
              width={200}
              height={200}
              className="rounded"
            />
          </Link>
          <div className="text-start">
            <Link href={`/products/${item.id}`}>
              <p className="font-semibold">{item.name}</p>
            </Link>
            <p className="font-bold">{item.price.toLocaleString()} 원</p>
            <p>배송비 {item.shipping_fee.toLocaleString()} 원</p>
          </div>
        </div>
      </td>
      <td>
        <div className="flex flex-col items-center gap-2">
          {quantity}
          <Button
            type="button"
            style="line"
            custom="px-6 py-2 font-semibold"
            onClick={handleOpenQuantityModal}
          >
            수정
          </Button>
        </div>
      </td>
      <td>
        <div className="flex flex-col items-center gap-2">
          <p className="font-semibold">
            <strong className="font-bold">
              {(item.price * quantity).toLocaleString()}
            </strong>{" "}
            원
          </p>
          <Button
            onClick={handleOrderOneProduct}
            type="button"
            style="point"
            custom="px-10 py-2 font-semibold"
          >
            주문하기
          </Button>
        </div>
      </td>
      <td>
        <button
          onClick={handleOpenDeleteModal}
          type="button"
          className="absolute top-4 right-4"
        >
          <Image src={DeleteIcon} alt="삭제" />
        </button>
      </td>
    </tr>
  );
}
