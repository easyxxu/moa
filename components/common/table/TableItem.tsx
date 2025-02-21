import Image from "next/image";

import Button from "../button/Button";
import { MouseEventHandler } from "react";

interface TextProp {
  text: string | number;
}

interface TextWithImgProps extends TextProp {
  src: string;
  quantity?: number;
  price?: number;
}

interface ButtonProps extends TextProp {
  onClick: MouseEventHandler;
}

interface Props {
  children: React.ReactNode;
}

function TableItem({ children }: Props) {
  return <>{children}</>;
}

const TableCell = Object.assign(TableItem, {
  TextWithImgCell,
  TextCell,
  ButtonCell,
});

export default TableCell;

// 하위 컴포넌트
function TextWithImgCell({ src, text, quantity, price }: TextWithImgProps) {
  return (
    <td className="flex flex-col justify-start gap-2 px-4 py-4 sm:items-center sm:gap-5 sm:flex-row">
      <Image
        src={src}
        alt={text as string}
        width={200}
        height={200}
        className="w-16 h-16 shadow-sm"
      />
      <div>
        <p className="break-keep">{text}</p>
        {quantity && price && (
          <>
            <p>{quantity} 개</p>
            <p>{price?.toLocaleString()} 원</p>
          </>
        )}
      </div>
    </td>
  );
}

function TextCell({ text }: TextProp) {
  return <td className="text-center">{text}</td>;
}

function ButtonCell({ text, onClick }: ButtonProps) {
  return (
    <td>
      <Button
        type="button"
        style="line"
        onClick={onClick}
        custom="px-1.5 py-1 sm:px-4 sm:py-2 mx-auto text-nowrap"
      >
        {text}
      </Button>
    </td>
  );
}
