import { getProducts } from "@/api/productApis";

import Header from "@/components/common/header/Header";
import Footer from "@/components/common/Footer";
import ProductCategoryList from "@/components/common/ProductCategoryList";
import MobileNavigation from "@/components/common/header/MobileNavigation";
import FilterProductList from "@/components/product/FilterProductList";

export default async function Index() {
  const { status, message, data } = await getProducts(1);
  if (status > 400 && status < 500) {
    throw new Error(message);
  }
  return (
    <div>
      <div className="sticky top-0 z-10">
        <Header />
        <ProductCategoryList />
      </div>
      <main>
        <FilterProductList initialProducts={data?.products || []} />
      </main>
      <Footer />
      <MobileNavigation />
    </div>
  );
}
