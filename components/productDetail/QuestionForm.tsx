"use client";

import { usePathname } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useFormState } from "react-dom";

import Button from "../common/button/Button";
import { useToast } from "@/contexts/toastContext";
import { TOAST_MESSAGE } from "@/utils/constants/toastMessage";
import { addQuestion } from "@/api/qaApis";
import { QAsType } from "./QuestionList";

const selectList = [
  { value: "PRODUCT", name: "상품 문의" },
  { value: "SHIPPING", name: "배송문의" },
  { value: "ETC", name: "기타" },
];

interface Props {
  setIsOpenQForm: Dispatch<SetStateAction<boolean>>;
  setQas: Dispatch<SetStateAction<QAsType>>;
}

export default function QuestionForm({ setIsOpenQForm, setQas }: Props) {
  const { openToast } = useToast();
  const productId = usePathname().split("/").pop();
  const [selected, setSelected] = useState("");
  const [state, formAction] = useFormState(addQuestion, {
    status: 0,
    message: "",
  });

  useEffect(() => {
    if (state.status >= 400 && state.status < 500) {
      openToast({ type: "ERROR", content: state.message });
    } else if (state.status === 200) {
      openToast({ type: "SUCCESS", content: TOAST_MESSAGE.MYPAGE.QUETION.ADD });
      setIsOpenQForm(false);
      setQas((prev) => ({
        ...prev,
        data: [state.data!, ...prev.data],
        count: prev.count + 1,
      }));
    }
  }, [state, openToast, setIsOpenQForm]);

  return (
    <div className="px-3 py-4 bg-background shadow-out rounded-xl">
      <form action={formAction}>
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <label htmlFor="title" className="text-lg font-medium text-nowrap">
              문의 제목
            </label>
            <select
              value={selected}
              name="title"
              id="title"
              className="w-full px-3 py-2 bg-white shadow-in rounded-xl"
              onChange={(e) => setSelected(e.target.value)}
              required
            >
              <option value="" disabled>
                어떤 종류의 문의인가요?
              </option>
              {selectList.map((item, i) => (
                <option value={item.value} key={i}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex gap-4">
            <label
              htmlFor="content"
              className="text-lg font-medium text-nowrap"
            >
              문의 내용
            </label>
            <textarea
              name="content"
              id="content"
              className="w-full h-40 px-3 py-2 shadow-in rounded-xl"
              placeholder="최소 5자 이상 작성해주세요."
            ></textarea>
          </div>
          <input type="hidden" name="productId" value={productId} />
        </div>
        <div className="flex justify-end gap-4 mt-4">
          <Button
            type="button"
            custom="bg-secondary px-5 py-2"
            onClick={() => setIsOpenQForm(false)}
          >
            취소
          </Button>
          <Button type="submit" custom="bg-primary px-5 py-2">
            저장
          </Button>
        </div>
      </form>
    </div>
  );
}
