import Link from "next/link";

export default function MyInfoPage() {
  return (
    <div className="w-full">
      <h2 className="pb-6 mb-6 text-center">개인정보수정</h2>
      <span className="my-1 w-full h-[1px] block border-b"></span>
      <ul className="font-regular [&>li>a]:px-2 [&>li>a]:py-1">
        <li className="">
          <Link
            href="/mypage/modify/email"
            className="block w-full text-left transition-all duration-200 ease-in-out hover:bg-gray-100 hover:rounded hover:shadow-m"
          >
            이메일 변경하기
          </Link>
          <span className="my-1 w-full h-[1px] block border-b"></span>
        </li>
        <li className="">
          <Link
            href="/mypage/modify/myinfo"
            className="block w-full text-left transition-all duration-200 ease-in-out hover:bg-gray-100 hover:rounded hover:shadow-m"
          >
            이름, 전화번호 변경하기
          </Link>
          <span className="my-1 w-full h-[1px] block border-b"></span>
        </li>
      </ul>
    </div>
  );
}
