import { getQuestionById } from "@/api/apis";
import { answerTitleMap } from "@/app/sellercenter/qa/[productId]/page";

export default async function MyQuestionDetailPage({
  params,
}: {
  params: { questionId: string };
}) {
  const res = await getQuestionById(+params.questionId);
  const question = res.data;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 mb-4">
          <h1 className="text-2xl font-bold">문의 내역</h1>
          <p
            className={`px-3 py-1 rounded-full font-semibold text-sm ${
              question?.answer_status
                ? "bg-green-200 text-green-700"
                : "bg-red-200 text-red-700"
            }`}
          >
            {question?.answer_status ? "답변 완료" : "답변 대기 중"}
          </p>
        </div>
        <div className="flex gap-4">
          <button
            type="button"
            className="px-3 py-2 font-semibold text-white bg-gray-300 rounded-lg shadow hover:bg-gray-400"
          >
            수정
          </button>
          <button
            type="button"
            className="px-3 py-2 font-semibold text-white bg-gray-300 rounded-lg shadow hover:bg-gray-400"
          >
            삭제
          </button>
        </div>
      </div>
      <div className="mb-6">
        <p className="mb-2 font-semibold text-gray-800">
          [{answerTitleMap[question?.title!]}]{" "}
          <span className="text-sm font-light">
            {new Date(question?.created_at!).toLocaleString()}에 작성됨
          </span>
        </p>
        <p className="text-gray-800 whitespace-pre-wrap">{question?.content}</p>
      </div>

      <div className="pt-6 mt-10 border-t border-gray-200">
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
