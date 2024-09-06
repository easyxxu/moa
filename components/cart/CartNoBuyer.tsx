import Link from "next/link";

export default function CartNoBuyer() {
  return (
    <div className="flex flex-col items-center justify-center w-full gap-4 py-4 rounded-xl h-[calc(100vh-94px)]">
      <p className="text-xl">
        구매자로 로그인을 해야 장바구니에 담을 수 있어요!
      </p>
      <Link
        href="/login"
        className="px-3 py-2 font-semibold bg-primary outer-box"
      >
        로그인 하러가기
      </Link>
    </div>
  );
}
