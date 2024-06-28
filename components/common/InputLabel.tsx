interface InputLabelProps {
  name: string;
  label: string;
  style: "box" | "line";
}
export default function InputLabel({ name, label, style }: InputLabelProps) {
  return (
    <div className="flex flex-col gap-1 font-extralight text-xl">
      <label htmlFor={label}>{name}</label>
      <input name={label} type="text" className="inner-box px-3 py-2" />
    </div>
  );
}
