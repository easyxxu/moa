import Link from "next/link";

export default function MyInfoPage() {
  return (
    <div className="w-full pb-32 sm:pb-0">
      <h2 className="pb-4 text-center border-b-4 border-gray-900">
        개인정보수정
      </h2>
      <ul className="font-regular [&>li>a]:px-2 [&>li>a]:py-3 [&>li>a]:border-b [&>li>a]:border-gray-300">
        <li className="">
          <Link href="/mypage/modify/email" className="block">
            이메일 변경하기
          </Link>
          {/* <span className="my-1 w-full h-[1px] block border-b border-gray-300"></span> */}
        </li>
        <li className="">
          <Link href="/mypage/modify/myinfo" className="block">
            이름, 전화번호 변경하기
          </Link>
          {/* <span className="my-1 w-full h-[1px] block border-b border-gray-300"></span> */}
        </li>
      </ul>
    </div>
  );
}
