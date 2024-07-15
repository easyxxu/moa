import Image from "next/image";
import Link from "next/link";

import SearchInput from "../search/SearchInput";
import Navigation from "./Navigation";
import MoaLogo from "@/public/assets/moa-logo.svg";

import { createClient } from "@/utils/supabase/server";

export default async function Header({
  headerType,
}: {
  headerType?: "SELLER";
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const isAuthenticated = user !== null;
  const isSeller = user?.user_metadata.user_type === "SELLER";

  return (
    <header className="border-b border-border-grey shadow-borderBottom">
      {!headerType ? (
        <>
          <div className="flex items-center justify-between py-5 mx-auto my-0 max-w-7xl">
            <div className="flex items-center gap-9">
              <h1>
                <Link href="/">
                  <Image
                    src={MoaLogo}
                    alt="모아 로고"
                    className="w-32 min-w-16"
                  />
                </Link>
              </h1>
              <SearchInput />
            </div>
            <Navigation isAuthenticated={isAuthenticated} isSeller={isSeller} />
          </div>
        </>
      ) : (
        <div className="flex items-center gap-4 py-5 mx-auto my-0 max-w-7xl">
          <h1>
            <Link href="/">
              <Image src={MoaLogo} alt="모아 로고" className="w-32 min-w-16" />
            </Link>
          </h1>
          <h2 className="text-4xl font-semibold text-black">판매자센터</h2>
        </div>
      )}
    </header>
  );
}
