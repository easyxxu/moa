import CardList from "@/components/card/CardList";
import ProductOrderSelector from "@/components/product/ProductOrderSelector";
import FilterCharacter from "@/components/product/FilterCharacter";
import { getProducts } from "@/api/productApis";
import FilterProduct from "@/components/product/FilterProduct";
import FilterProductList from "@/components/product/FilterProductList";

export default async function ProductsPage(props: {
  searchParams?: {
    searchKeyword?: string;
    character?: string;
    category?: string;
    order?: string;
  };
}) {
  const { searchKeyword, character, category, order } = props.searchParams!;

  const { status, message, data } = await getProducts(
    1,
    searchKeyword,
    character,
    category,
    order
  );
  if (status > 400 && status < 500) {
    throw new Error(message);
  }

  return (
    <div className="flex gap-8 px-2">
      <FilterCharacter />
      <div className="flex flex-col w-full gap-4">
        <div className="flex items-center justify-between border border-gray-500 rounded-sm">
          <FilterProduct />
          <ProductOrderSelector />
        </div>
        <FilterProductList initialProducts={data?.products || []} />
      </div>
    </div>
  );
}
