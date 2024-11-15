import { getQuestionById } from "@/api/qaApis";
import AnswerContent from "@/components/sellercenter/AnswerContent";
import QuestionContent from "@/components/sellercenter/QuestionContent";

export default async function QADetailPage({
  params,
}: {
  params: { questionId: string; productId: string };
}) {
  const questionId = +params.questionId;
  const res = await getQuestionById(questionId);
  if (res.status === 404) {
    throw new Error(res.message);
  }
  const question = res.data!;

  return (
    <>
      <QuestionContent question={question} />
      <AnswerContent answer={question.answer!} />
    </>
  );
}
