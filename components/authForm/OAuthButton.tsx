"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

import KaKaoIcon from "@/public/assets/icon/icon-kakao.svg";
import GoogleIcon from "@/public/assets/icon/icon-google.svg";
import { signInWithOAuth } from "@/api/userApis";
import { Provider } from "@supabase/supabase-js";

interface Props {
  formType: "login" | "join";
}
export default function OAuthButton({ formType }: Props) {
  const router = useRouter();
  const handleSignInWithOAuth = async (provider: Provider) => {
    const res = await signInWithOAuth(provider);

    if (res.status === 404) {
      console.log("OAuth Error");
      router.push("/auth");
    }
    if (res.status === 200) {
      router.push(res.data?.url!);
    }
  };
  return (
    <div className="w-full space-y-2 text-sm">
      <button
        type="button"
        onClick={() => handleSignInWithOAuth("kakao")}
        className="px-3 py-2 w-full flex gap-2 items-center rounded-sm bg-[#FEE500]"
      >
        <Image src={KaKaoIcon} alt="카카오 로고" width={18} height={18} />
        <span className="flex-grow text-center">
          카카오로 {formType === "join" ? "시작하기" : "로그인"}
        </span>
      </button>
      <button
        type="button"
        onClick={() => handleSignInWithOAuth("google")}
        className="px-3 py-2 w-full flex items-centner rounded-sm border text-[#80868B] bg-[#FFFFFF]"
      >
        <Image src={GoogleIcon} alt="카카오 로고" width={18} height={18} />
        <span className="flex-grow text-center">
          구글로 {formType === "join" ? "시작하기" : "로그인"}
        </span>
      </button>
    </div>
  );
}
