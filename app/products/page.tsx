import CardList from "@/components/card/CardList";
import ProductOrderSelector from "@/components/product/ProductOrderSelector";
import SideCategory from "@/components/product/SideCategory";
import { getProducts } from "@/api/productApis";

export default async function FilterProductPage(props: {
  searchParams?: {
    character?: string;
    category?: string;
    order?: string;
  };
}) {
  const { character, category, order } = props.searchParams!;

  const { status, message, data } = await getProducts(
    1,
    character,
    category,
    order
  );

  if (status > 400 && status < 500) {
    throw new Error(message);
  }
  return (
    <div className="flex gap-4">
      <SideCategory />
      <div className="flex flex-col w-full gap-4">
        <div className="self-end">
          <ProductOrderSelector />
        </div>
        <CardList initialProducts={data?.products!} />
      </div>
    </div>
  );
}
