import { getProducts } from "@/api/productApis";

import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Category from "@/components/common/ProductNav";
import MobileNavigation from "@/components/common/MobileNavigation";
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
      <MobileNavigation />
    </div>
  );
}
