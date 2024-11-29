"use client";

import { addAnswer } from "@/api/qaApis";
import { useFormState } from "react-dom";
import Button from "../common/button/Button";

interface Props {
  questionId: number;
  productId: number;
}
export default function AnswerForm({ questionId, productId }: Props) {
  const [state, formAction] = useFormState(addAnswer, {
    status: 0,
    message: "",
  });
  return (
    <div>
      <form className="space-y-4" action={formAction}>
        <p className="pb-2 text-xl font-semibold text-gray-800 border-b">
          답변 작성
        </p>
        <label htmlFor="answer" className="block font-medium text-gray-700">
          답변 내용
        </label>
        <textarea
          id="answer"
          name="answer"
          rows={5}
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          placeholder="답변을 작성하세요."
        ></textarea>
        <input
          type="text"
          hidden
          value={questionId}
          name="questionId"
          readOnly
        />
        <input type="text" hidden value={productId} name="productId" readOnly />
        <Button type="submit" style="point" custom="w-full px-4 py-2">
          답변 제출
        </Button>
      </form>
    </div>
  );
}
