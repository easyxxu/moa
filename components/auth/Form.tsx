import Link from "next/link";
import Image from "next/image";

import Button from "../common/button/Button";
import MoaLogo from "@/public/assets/moa-logo.svg";

import OAuthButton from "./OAuthButton";
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
    <div className="flex flex-col items-center justify-center">
      <h1 className="top-0 z-10 -mb-10">
        <Link href="/">
          <Image src={MoaLogo} alt="모아 로고" className="w-64" />
        </Link>
      </h1>
      <div className="max-w-[550px] sm:rounded-sm sm:shadow-lg px-16 py-14 bg-white flex gap-4 flex-col items-center justify-center">
        <div className="space-y-4">
          <h2 className="text-center text-font-grey-bold">
            {formType === "join" ? "회원가입" : "로그인"}
          </h2>
          <form className="flex flex-col gap-4 w-96" action={onSubmit}>
            <fieldset className="flex justify-around w-full text-lg font-semibold text-center shadow-md">
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
              <label
                htmlFor={USER_TYPE.SELLER}
                className="w-1/2 cursor-pointer"
              >
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
            <Button type="submit" style="point" custom="py-2">
              {formType === "join" ? "회원가입" : "로그인"}
            </Button>
          </form>
        </div>

        <div className="w-full text-gray-500 flex text-sm items-center text-center before:content-[''] before:h-[1px] before:bg-gray-300  before:flex-grow after:content-[''] after:h-[1px] after:bg-gray-300  after:flex-grow">
          <p className="mx-3">또는</p>
        </div>
        <p className="text-sm text-gray-500">
          SNS {formType === "login" ? "로그인" : "회원가입"}은 구매자로만
          가능합니다.
        </p>
        <OAuthButton formType={formType} />
        <div className="text-sm">
          <span className="text-gray-500">
            {formType === "login" ? "MoA가 처음이신가요?" : "MoA 회원이신가요?"}{" "}
          </span>
          <Link
            href={formType === "login" ? "/join" : "/login"}
            className="inline-block underline transition-transform duration-200 ease-out underline-offset-4 hover:-translate-y-0.5 hover:text-blue-500"
          >
            {formType === "login" ? "회원가입" : "로그인"}
          </Link>
        </div>
      </div>
    </div>
  );
}
