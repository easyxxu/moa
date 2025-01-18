import { Tables } from "@/types/database.types";
import AnswerDeleteButton from "./AnswerDeleteButton";

interface Props {
  answer: Tables<"answer">;
}

export default function AnswerContent({ answer }: Props) {
  return (
    <div>
      <p className="pb-2 mb-4 text-xl font-semibold border-b-2 border-gray-900">
        문의 답변
      </p>
      <div className="p-4 bg-gray-100 rounded-lg">
        <p className="leading-relaxed text-gray-700 whitespace-pre-wrap">
          {answer?.content || ""}
        </p>
      </div>
      <AnswerDeleteButton answerId={answer.id} />
    </div>
  );
}
