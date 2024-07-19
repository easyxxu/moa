import { createClient } from "@/utils/supabase/server";

import Header from "@/components/common/Header";
import CardList from "@/components/card/CardList";
import Footer from "@/components/common/Footer";

import { Product } from "@/types/product";

export default async function Index() {
  const supabase = createClient();
  const { data: products } = await supabase.from("product").select();

  return (
    <div className="">
      <Header />
      <main className="mx-auto my-4 max-w-7xl">
        <CardList products={products || ([] as Product[])} />
      </main>
      <Footer />
    </div>
  );
}
