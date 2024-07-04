interface InputLabelProps {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  style: "box" | "line";
  error?: string;
}

export default function InputLabel({
  name,
  label,
  type,
  placeholder,
  style,
  error,
}: InputLabelProps) {
  return (
    <div className="flex flex-col gap-1 font-extralight text-xl">
      {style === "box" ? (
        <>
          <label htmlFor={label}>{name}</label>
          <input
            id={label}
            name={label}
            type={type}
            className="inner-box px-4 py-2"
            placeholder={placeholder}
            required
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
              className="peer w-full border-b-2 bg-inherit px-2 py-2 focus:outline-none focus:border-b-font-hover"
              placeholder={placeholder}
              required
            />
            <label
              htmlFor={label}
              className="absolute left-2 bottom-2 text-md transition-all peer-focus:text-sm peer-focus:bottom-9 peer-valid:text-sm peer-valid:bottom-9"
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
