import { useState } from "react";
import Button from "../button/Button";
import QuantityButton from "../button/QuantityButton";
import DeleteIcon from "@/public/assets/icon/icon-delete.svg";
import Image from "next/image";

interface Props {
  type: "CONFIRM" | "MODIFY" | "QUANTITY";
  content: string;
  onConfirm: (quantity: number) => void;
  onCancel: () => void;
  quantity?: number;
}
export default function Modal({
  type,
  content,
  onConfirm,
  onCancel,
  quantity,
}: Props) {
  const [updatequantity, setUpdateQuantity] = useState(quantity!);

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-300/45">
      <div className="fixed z-10 flex w-1/3 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl h-1/4 top-1/2 left-1/2 shadow-out">
        <div className="relative flex flex-col items-center justify-between w-full h-full gap-3 p-8">
          <div className="flex flex-col items-center flex-grow text-center whitespace-pre-line">
            {content}
            {type === "QUANTITY" && (
              <div className="mt-4">
                <QuantityButton
                  quantity={updatequantity}
                  setQuantity={setUpdateQuantity}
                />
              </div>
            )}
          </div>
          <div className="flex w-full gap-3 justify-evenly">
            <Button
              type="button"
              onClick={() => onConfirm(updatequantity!)}
              custom="w-1/2 py-2 bg-primary font-semibold"
            >
              {type === "QUANTITY" ? "수정" : "예"}
            </Button>
            <Button
              type="button"
              onClick={onCancel}
              custom="w-1/2 py-2 bg-secondary font-semibold"
            >
              {type === "QUANTITY" ? "취소" : "아니오"}
            </Button>
          </div>
          <button
            type="button"
            onClick={onCancel}
            className="absolute top-6 right-6"
          >
            <Image src={DeleteIcon} alt="삭제" />
          </button>
        </div>
      </div>
    </div>
  );
}