"use client";

import { deleteAnswer } from "@/api/qaApis";
import { useToast } from "@/contexts/ToastContext";
import { TOAST_MESSAGE } from "@/utils/constants/toastMessage";
import { usePathname, useRouter } from "next/navigation";
import Button from "../common/button/Button";

interface Props {
  answerId: number;
}
export default function AnswerDeleteButton({ answerId }: Props) {
  const { openToast } = useToast();
  const pathname = usePathname();
  const productId = pathname.split("/")[3];
  const router = useRouter();
  const handleDelete = async () => {
    const res = await deleteAnswer(answerId);

    if (res.status > 400 && res.status < 500) {
      openToast({ type: "ERROR", content: TOAST_MESSAGE.SERVER.ERROR });
    }
    router.push(`/sellercenter/qa/${productId}`);
  };
  return (
    <Button
      type="button"
      onClick={handleDelete}
      style="point"
      custom="px-3 py-1 mt-4"
    >
      삭제
    </Button>
  );
}
