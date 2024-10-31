"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  children: React.ReactNode;
  productCnt?: number;
  notificationCnt?: number;
  path: string;
}

export default function MenuItem({
  children,
  productCnt,
  notificationCnt,
  path,
}: Props) {
  const currentPath = usePathname();
  const isActive = currentPath.includes(`/sellercenter${path}`);

  return (
    <Link href={`/sellercenter${path}`}>
      <div
        className={`flex items-center justify-between px-5 py-4 font-regular whitespace-nowrap transition-colors ${
          isActive ? "bg-gray-300 font-semibold text-white" : ""
        } ${isActive ? "" : "hover:bg-gray-200"}`}
      >
        <p className="flex items-center">
          {children}
          {productCnt && <span className="ml-1">({productCnt})</span>}
        </p>
        {notificationCnt && (
          <span className="flex items-center justify-center w-5 h-5 text-sm font-light text-center text-white bg-red-500 rounded-full">
            {notificationCnt}
          </span>
        )}
      </div>
    </Link>
  );
}
