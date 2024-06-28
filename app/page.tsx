import { createClient } from "@/utils/supabase/server";
import Header from "@/components/Header";
import CardList from "@/components/card/CardList";
import { Product } from "@/types/product";

export default async function Index() {
  const supabase = createClient();
  const { data: products } = await supabase.from("products").select();

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <Header />
      <div className="flex-1 flex flex-col gap-20 max-w-4xl px-3">
        <main className="flex-1 flex flex-col gap-6">
          <CardList products={products || ([] as Product[])} />
        </main>
      </div>

      <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
        <p>
          Powered by{" "}
          <a
            href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
            target="_blank"
            className="font-pretendard font-black hover:underline"
            rel="noreferrer"
          >
            열심히 만드는 중
          </a>
        </p>
      </footer>
    </div>
  );
}
