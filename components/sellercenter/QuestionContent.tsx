import { answerTitleMap } from "@/app/sellercenter/qa/[productId]/page";
import { Tables } from "@/types/database.types";

interface Props {
  question: Tables<"question">;
}
export default function QuestionContent({ question }: Props) {
  return (
    <div className="mb-6">
      <p className="pb-2 mb-4 text-xl font-semibold text-gray-800 border-b">
        문의 내역
      </p>
      <p className="mb-2 text-gray-700">
        <span className="font-semibold">
          [{answerTitleMap[question?.title!]}]
        </span>
      </p>
      <p className="text-gray-700">{question?.content}</p>
    </div>
  );
}
