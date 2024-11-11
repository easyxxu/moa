import MoaBarcode from "@/public/assets/moa-barcode.svg";
import IconGithub from "@/public/assets/icon/icon-github.svg";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-10 text-gray-700 border-t border-border-grey shadow-borderBottom mt-44">
      <div className="grid grid-cols-1 gap-8 px-2 mx-auto my-0 max-w-7xl md:grid-cols-3">
        {/* 회사 정보 */}
        <div>
          <Image src={MoaBarcode} alt="모아 로고" width={120} height={100} />
          <address className="mt-4 text-sm not-italic">
            <p className="text-lg font-semibold">(주)MoA</p>
            <p>대표자: 홍길동</p>
            <p>사업자 등록번호: 123-45-67890</p>
            <p>주소: 서울특별시 강남구 테헤란로 123</p>
            <p>이메일: easyxxu@naver.com</p>
            <p>전화: 02-123-4567</p>
          </address>
        </div>

        {/* 고객 지원 */}
        <div className="text-sm">
          <h3 className="mb-4 text-lg font-semibold">고객 지원</h3>
          <ul className="space-y-2">
            <li>
              <Link href="#" className="hover:underline">
                자주 묻는 질문 (FAQ)
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                배송 정보
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                반품 및 교환
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                1:1 문의
              </Link>
            </li>
          </ul>
        </div>

        {/* 소셜 미디어 및 깃허브 링크 */}
        <div className="text-sm">
          <h3 className="mb-4 text-lg font-semibold">팔로우하기</h3>
          <ul className="flex items-center space-x-4">
            <li>
              <Link
                href="https://github.com/easyxxu/moa"
                className="hover:opacity-80"
              >
                <Image
                  src={IconGithub}
                  alt="GitHub 로고"
                  width={32}
                  height={32}
                />
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-10 text-xs text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} MoA. All rights reserved.</p>
      </div>
    </footer>
  );
}
