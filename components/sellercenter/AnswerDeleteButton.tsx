"use client";

import { deleteAnswer } from "@/api/qaApis";
import { useToast } from "@/contexts/toastContext";
import { TOAST_MESSAGE } from "@/utils/constants/toastMessage";
import { usePathname, useRouter } from "next/navigation";

interface Props {
  answerId: number;
}
export default function AnswerDeleteButton({ answerId }: Props) {
  const { openToast } = useToast();
  const pathname = usePathname();
  const productId = pathname.split("/")[3];
  const router = useRouter();
  const handleDelete = async () => {
    console.log("delete!");
    const res = await deleteAnswer(answerId);

    if (res.status > 400 && res.status < 500) {
      openToast({ type: "ERROR", content: TOAST_MESSAGE.SERVER.ERROR });
    }
    router.push(`/sellercenter/qa/${productId}`);
  };
  return (
    <button
      onClick={handleDelete}
      className="px-3 py-1 mt-4 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
    >
      삭제
    </button>
  );
}
