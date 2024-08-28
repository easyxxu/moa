"use client";

import { CartItemInfo } from "@/types/cart";
import Image from "next/image";
import Button from "../common/button/Button";
import { useModal } from "@/contexts/ModalContext";
import { useState } from "react";
import { deleteCartItem, updateQuantity } from "@/api/apis";
import DeleteIcon from "@/public/assets/icon/icon-delete.svg";

interface Props {
  item: CartItemInfo;
  isLastItem: boolean;
}

export default function CartTableItem({ item, isLastItem }: Props) {
  const { showModal, closeModal } = useModal();
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
    setQuantity(data.quantity);
    closeModal();
  };

  const handleDeleteCartItem = async () => {
    const res = await deleteCartItem(item.id!);
    closeModal();
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
  return (
    <tr
      key={item.id}
      className={`relative b-4 *:p-4 bg-white ${
        isLastItem
          ? "[&>td:first-child]:rounded-bl-2xl [&>td:last-child]:rounded-br-2xl"
          : "border-b"
      }`}
    >
      <td>
        <label htmlFor="productCheck" className="a11y-hidden">
          {item.name}선택
        </label>
        <input
          type="checkbox"
          id="productCheck"
          className="bg-[url('/assets/icon/icon-check-box.svg')] w-5 h-5 checked:bg-[url('/assets/icon/icon-check-box-fill.svg')]"
        />
      </td>
      <td className="flex gap-3">
        <Image
          src={item.image[0]}
          alt={item.name}
          width={200}
          height={200}
          className="rounded"
        />
        <div className="text-start">
          <p className="font-semibold">{item.name}</p>
          <p>{item.price.toLocaleString()} 원</p>
        </div>
      </td>
      <td>
        <div className="flex flex-col items-center gap-2">
          {quantity}
          <Button
            type="button"
            custom="px-6 py-2 bg-secondary font-semibold"
            onClick={handleOpenQuantityModal}
          >
            수정
          </Button>
        </div>
      </td>
      <td>
        <div className="flex flex-col items-center gap-2">
          {item.price.toLocaleString()} 원
          <Button type="button" custom="px-10 py-2 bg-primary font-semibold">
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
