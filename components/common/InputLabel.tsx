interface InputLabelProps {
  name: string;
  value?: string | number;
  label: string;
  type: string;
  placeholder?: string;
  style: "box" | "line";
  error?: string;
  onChange?: React.ChangeEventHandler;
}

export default function InputLabel({
  name,
  value,
  label,
  type,
  placeholder,
  style,
  error,
  onChange,
}: InputLabelProps) {
  return (
    <div className="flex flex-col gap-1 font-extralight">
      {style === "box" ? (
        <>
          <label htmlFor={label}>{name}</label>
          <input
            id={label}
            name={label}
            type={type}
            value={value}
            className="px-4 py-2 inner-box"
            placeholder={placeholder}
            required
            onChange={onChange}
          />
          <span className="text-sm text-red-600">{error}</span>
        </>
      ) : (
        <div>
          <div className="relative w-full">
            <input
              id={label}
              name={label}
              type={type}
              className="w-full px-2 pb-1 pt-3 border-b-2 peer bg-inherit focus:outline-none focus:border-b-font-hover"
              placeholder={placeholder}
              required
              onChange={onChange}
            />
            <label
              htmlFor={label}
              className="absolute transition-all left-2 bottom-2 text-md peer-focus:text-sm peer-focus:bottom-7 peer-valid:text-sm peer-valid:bottom-7"
            >
              {name}
            </label>
          </div>
          <span className="text-sm text-red-400">{error}</span>
        </div>
      )}
    </div>
  );
}
