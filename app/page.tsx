import Header from "@/components/common/Header";
import CardList from "@/components/card/CardList";
import Footer from "@/components/common/Footer";
import Category from "@/components/common/Category";
import { getProducts } from "@/api/productApis";

export default async function Index() {
  const { status, message, data } = await getProducts();
  if (status > 400 && status < 500) {
    throw new Error(message);
  }
  return (
    <div className="">
      <Header />
      <main className="mx-auto my-4 max-w-7xl">
        <Category />
        <CardList initialProducts={data?.products!} />
      </main>
      <Footer />
    </div>
  );
}
