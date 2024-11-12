import Link from "next/link";
import Image from "next/image";

import Button from "../common/button/Button";
import MoaLogo from "@/public/assets/moa-logo.svg";

interface FormProps {
  children: React.ReactNode;
  formType: "login" | "join";
  onSubmit: (payload: FormData) => void;
}

export const USER_TYPE = {
  SELLER: "SELLER",
  BUYER: "BUYER",
};

export default function Form({ children, formType, onSubmit }: FormProps) {
  return (
    <div className="flex flex-col items-center justify-center -mt-8">
      <h1 className="top-0 z-10 -mb-8">
        <Link href="/">
          <Image src={MoaLogo} alt="모아 로고" className="w-64" />
        </Link>
      </h1>
      <div className="max-w-[550px] rounded-sm shadow-lg px-16 py-14 bg-white flex flex-col items-center justify-center">
        <h2 className="mb-6 text-center text-font-grey-bold">
          {formType === "join" ? "회원가입" : "로그인"}
        </h2>
        <form className="flex flex-col gap-2 w-96" action={onSubmit}>
          <fieldset className="flex justify-around w-full mb-4 text-lg font-semibold text-center shadow-md">
            <label htmlFor={USER_TYPE.BUYER} className="w-1/2 cursor-pointer">
              <input
                type="radio"
                name="userType"
                value={USER_TYPE.BUYER}
                id={USER_TYPE.BUYER}
                className="hidden peer"
                defaultChecked
              />
              <span className="block w-full h-full py-1 leading-relaxed transition-shadow rounded-l-sm peer-checked:bg-black peer-checked:text-white hover:shadow-lg">
                구매자
              </span>
            </label>
            <label htmlFor={USER_TYPE.SELLER} className="w-1/2 cursor-pointer">
              <input
                type="radio"
                name="userType"
                value={USER_TYPE.SELLER}
                id={USER_TYPE.SELLER}
                className="hidden peer"
              />
              <span className="block w-full h-full py-1 leading-relaxed transition-shadow rounded-r-sm peer-checked:bg-black peer-checked:text-white hover:shadow-lg">
                판매자
              </span>
            </label>
          </fieldset>
          {children}
          <Button
            type="submit"
            style="point"
            custom="w-full font-bold py-2 rounded-3xl mt-7 bg-gray-900"
          >
            {formType === "join" ? "회원가입" : "로그인"}
          </Button>
        </form>
        <Link
          href={formType === "login" ? "/join" : "/login"}
          className="mt-3 text-base"
        >
          {formType === "login" ? "회원가입" : "로그인"}
        </Link>
      </div>
    </div>
  );
}
