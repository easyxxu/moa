import { getQuestionById } from "@/api/qaApis";
import DeleteButton from "@/components/mypage/qa/DeleteButton";
import { answerTitleMap } from "@/utils/answerTitleMap";

export default async function MyQuestionDetailPage({
  params,
}: {
  params: { questionId: string };
}) {
  const questionId = +params.questionId;
  const res = await getQuestionById(questionId);
  const question = res.data;

  return (
    <div className="w-full px-2 mt-2 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-nowrap">문의 내역</h1>
          <p
            className={`px-3 py-1 rounded-full mr-2 font-semibold text-nowrap text-sm ${
              question?.answer_status
                ? "bg-green-200 text-green-700"
                : "bg-red-200 text-red-700"
            }`}
          >
            {question?.answer_status ? "답변 완료" : "답변 대기 중"}
          </p>
        </div>
        <DeleteButton questionId={questionId} />
      </div>
      <div>
        <p className="mb-2 font-semibold text-gray-800">
          [{answerTitleMap[question?.title!]}]{" "}
          <span className="text-sm font-light">
            {new Date(question?.created_at!).toLocaleString()}에 작성됨
          </span>
        </p>
        <p className="text-gray-800 whitespace-pre-wrap">{question?.content}</p>
      </div>

      <div className="pt-4 border-t border-gray-200">
        <h2 className="mb-2 text-lg font-bold text-gray-700">문의 답변</h2>
        {question?.answer ? (
          <p className="text-gray-800 whitespace-pre-wrap">
            {question.answer.content}
          </p>
        ) : (
          <div>아직 답변이 등록되지 않았습니다.</div>
        )}
      </div>
    </div>
  );
}
