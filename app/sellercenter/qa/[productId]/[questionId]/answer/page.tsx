import { getQuestionById } from "@/api/apis";
import AnswerForm from "@/components/sellercenter/AnswerForm";
import QuestionContent from "@/components/sellercenter/QuestionContent";

export default async function AnswerPage({
  params,
}: {
  params: { questionId: string; productId: string };
}) {
  const questionId = +params.questionId;
  const productId = +params.productId;
  const res = await getQuestionById(questionId);

  if (res.status === 404) {
    throw new Error(res.message);
  }

  const question = res.data!;
  return (
    <>
      <QuestionContent question={question} />
      <AnswerForm questionId={question?.id} productId={productId} />
    </>
  );
}
