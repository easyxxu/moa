import { CartItemInfo, GroupedCartItems } from "@/types/cart";
import { Product } from "@/types/product";
import Image from "next/image";
import Button from "../common/button/Button";
import CheckBox from "@/public/assets/icon/icon-check-box.svg";
import CheckBoxFill from "@/public/assets/icon/icon-check-box-fill.svg";

interface Props {
  cartItems: GroupedCartItems[];
}
export default function CartTable({ cartItems }: any) {
  return (
    <tbody className="text-center">
      <tr className="h-5" />
      {Object.keys(cartItems).map((store) => (
        <>
          <tr key={store} className="bg-white">
            <td colSpan={4} className="p-3 font-bold text-left rounded-t-2xl">
              {store}
            </td>
          </tr>
          {cartItems[store].map((item: CartItemInfo, index: number) => {
            const isLastItem = index === cartItems[store].length - 1;
            return (
              <tr
                key={item.id}
                className={`rounded-2xl b-4 *:p-4 bg-white border-b ${
                  isLastItem ? "[&>td]:border-bl-2xl" : ""
                }`}
              >
                <td className="">
                  <label htmlFor="productCheck" className="a11y-hidden">
                    {item.name}선택
                  </label>
                  <input
                    type="checkbox"
                    id="productCheck"
                    className="bg-[url('/assets/icon/icon-check-box.svg')] w-5 h-5 checked:bg-[url('/assets/icon/icon-check-box-fill.svg')]"
                  />
                </td>
                <td className="flex gap-3">
                  <Image
                    src={item.image[0]}
                    alt={item.name}
                    width={200}
                    height={200}
                    className="rounded"
                  />
                  <div className="text-start">
                    <p className="font-semibold">{item.name}</p>
                    <p>{item.price.toLocaleString()} 원</p>
                  </div>
                </td>
                <td>
                  <div className="flex flex-col items-center gap-2">
                    {item.quantity}
                    <Button type="button" custom="px-3 py-2 bg-secondary">
                      수정
                    </Button>
                  </div>
                </td>
                <td className="">
                  <div className="flex flex-col items-center gap-2">
                    {item.price}
                    <Button type="button" custom="px-3 py-2 bg-primary">
                      주문하기
                    </Button>
                  </div>
                </td>
              </tr>
            );
          })}
          <tr className="h-5" />
        </>
      ))}
    </tbody>
  );
}
