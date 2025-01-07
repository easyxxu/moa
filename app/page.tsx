import Header from "@/components/common/Header";
import CardList from "@/components/card/CardList";
import Footer from "@/components/common/Footer";
import Category from "@/components/common/ProductNav";
import { getProducts } from "@/api/productApis";
import FilterProductList from "@/components/product/FilterProductList";

export default async function Index() {
  const { status, message, data } = await getProducts(1);
  if (status > 400 && status < 500) {
    throw new Error(message);
  }
  return (
    <div>
      <div className="sticky top-0">
        <Header />
        <Category />
      </div>
      <main>
        <FilterProductList initialProducts={data?.products || []} />
      </main>
      <Footer />
    </div>
  );
}
