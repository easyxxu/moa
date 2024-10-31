import { Tables } from "@/types/database.types";

interface Props {
  answer: Tables<"answer">;
}

export default function AnswerContent({ answer }: Props) {
  return (
    <div>
      <p className="pb-2 mb-4 text-xl font-semibold text-gray-800 border-b">
        문의 답변
      </p>
      <div className="p-4 bg-gray-100 rounded-lg">
        <p className="leading-relaxed text-gray-700 whitespace-pre-wrap">
          {answer.content || ""}
        </p>
      </div>
      <button className="px-4 py-1 mt-4 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:bg-blue-700">
        수정하기
      </button>
    </div>
  );
}
