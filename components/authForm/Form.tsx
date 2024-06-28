"use client";
import Image from "next/image";
import Button from "../common/Button";
import MoaLogo from "@/public/assets/moa-logo.svg";
import Link from "next/link";
import { useState } from "react";
interface FormProps {
  children: React.ReactNode;
  formType: "login" | "join";
}
const JOIN_TYPE = {
  SELLER: "SELLER",
  BUYER: "BUYER",
};
export default function Form({ children, formType }: FormProps) {
  const [joinType, setJoinType] = useState(JOIN_TYPE.BUYER);
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <h1 className="mb-5">
        <Link href="/">
          <Image src={MoaLogo} alt="모아 로고" className="w-64" />
        </Link>
      </h1>
      <div className="rounded-xl shadow-out px-16 py-14 text-2xl w-4/5">
        <h2 className="w-full text-center text-3xl text-font-grey-bold font-bold mb-6">
          {formType === "join" ? "회원가입" : "로그인"}
        </h2>
        <div className="shadow-out rounded-3xl font-bold mb-4">
          <button
            type="button"
            className={`w-1/2 px-2 py-1 rounded-tl-3xl rounded-bl-3xl ${
              joinType === JOIN_TYPE.BUYER && "btn-active"
            }`}
          >
            구매자
          </button>
          <button
            type="button"
            className={`w-1/2 px-2 py-1 rounded-tr-3xl rounded-br-3xl ${
              joinType === JOIN_TYPE.SELLER && "btn-active"
            }`}
          >
            판매자
          </button>
        </div>
        {children}
        <Button
          type="submit"
          custom="w-full bg-primary font-bold py-2 rounded-3xl mt-7"
        >
          {formType === "join" ? "회원가입" : "로그인"}
        </Button>
      </div>
    </div>
  );
}
