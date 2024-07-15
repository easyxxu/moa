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
  const isActive = currentPath === `/sellercenter${path}`;

  return (
    <Link href={`/sellercenter${path}`}>
      <div
        className={`flex items-center justify-between p-4 font-medium rounded-2xl ${
          isActive ? "bg-primary shadow-in" : "bg-inherit shadow-out"
        } hover:bg-primary`}
      >
        <p>
          {children}
          {productCnt && <span>({productCnt})</span>}
        </p>
        {notificationCnt && (
          <p className="w-5 h-5 text-sm text-center text-white bg-red-500 rounded-full font-extralight">
            {notificationCnt}
          </p>
        )}
      </div>
    </Link>
  );
}
