"use client";

import { Dispatch, SetStateAction } from "react";
import Button from "./Button";

interface Props {
  quantity: number;
  setQuantity: Dispatch<SetStateAction<number>>;
}

export default function QuantityButton({ quantity, setQuantity }: Props) {
  return (
    <div className="flex gap-2">
      <Button
        type="button"
        custom="relative w-12 h-12"
        style="none"
        onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : prev))}
      >
        <span className="before:content-[''] before:absolute before:w-4 before:h-px before:bg-black before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2"></span>
      </Button>
      <p className="w-16 h-12 px-3 py-3 text-center inner-box">{quantity}</p>
      <Button
        type="button"
        custom="relative w-12 h-12"
        onClick={() => setQuantity((prev) => prev + 1)}
      >
        <span className="before:content-[''] before:absolute before:w-4 before:h-px before:bg-black before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 after:content-[''] after:absolute after:w-px after:h-4 after:bg-black after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2"></span>
      </Button>
    </div>
  );
}
