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
    <div className="w-full h-full">
      <h2 className="pb-4 text-center">문의 내역</h2>
      <div className="p-4 pb-10 space-y-3 border border-gray-400 rounded-lg">
        <div className="flex items-center justify-between">
          <p
            className={`px-2 py-0.5 rounded-full mr-2 font-semibold text-nowrap text-sm border ${
              question?.answer_status
                ? "border-green-700 text-green-700"
                : "border-red-700 text-red-700"
            }`}
          >
            {question?.answer_status ? "답변 완료" : "답변 대기 중"}
          </p>
          <DeleteButton questionId={questionId} />
        </div>
        <p className="font-semibold">
          {answerTitleMap[question?.title!]}{" "}
          <span className="font-light">
            {new Date(question?.created_at!).toLocaleString()}에 작성됨
          </span>
        </p>

        <p className="whitespace-pre-wrap">{question?.content}</p>
        <hr className="my-4 border-t-[1px] border-gray-400" />
        <p className="mb-2 font-bold">문의 답변</p>
        {question?.answer ? (
          <p className="whitespace-pre-wrap">{question.answer.content}</p>
        ) : (
          <div>아직 답변이 등록되지 않았습니다.</div>
        )}
      </div>
    </div>
  );
}
