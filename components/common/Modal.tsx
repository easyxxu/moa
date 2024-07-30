import Button from "./button/Button";

interface Props {
  content: string;
  onConfirm: () => void;
  onCancel: () => void;
}
export default function Modal({ content, onConfirm, onCancel }: Props) {
  return (
    <div className="absolute w-1/3 h-1/4 flex top-1/2 left-1/2 -translate-x-1/2 z-10 -translate-y-1/2 bg-white shadow-out rounded">
      <div className="flex flex-col h-full items-center justify-evenly w-full gap-3 px-3">
        <p className="text-center whitespace-pre-line">{content}</p>
        <div className="flex items-center justify-center w-full gap-3 px-3">
          <Button
            type="button"
            onClick={onConfirm}
            custom="w-1/2 py-1 bg-primary"
          >
            예
          </Button>
          <Button
            type="button"
            onClick={onCancel}
            custom="w-1/2 py-1 bg-secondary"
          >
            아니오
          </Button>
        </div>
      </div>
    </div>
  );
}
