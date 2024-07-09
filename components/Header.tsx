import Image from "next/image";
import Link from "next/link";

import SearchInput from "./search/SearchInput";
import Navigation from "./common/Navigation";
import MoaLogo from "../public/assets/moa-logo.svg";

import { createClient } from "@/utils/supabase/server";

export default async function Header() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const isAuthenticated = user !== null;
  const isSeller = user?.user_metadata.user_type === "SELLER";

  return (
    <header className="w-full border-b border-border-grey flex justify-center shadow-borderBottom">
      <div className="flex w-5/6 py-5 justify-between">
        <div className="flex gap-9 items-center">
          <Link href="/">
            <Image src={MoaLogo} alt="모아 로고" className="w-32" />
          </Link>
          <SearchInput />
        </div>
        <Navigation isAuthenticated={isAuthenticated} isSeller={isSeller} />
      </div>
    </header>
  );
}
