interface ButtonProps {
  type: "submit" | "button";
  style: "point" | "line" | "none";
  custom?: string;
  onClick?: React.MouseEventHandler;
  children: React.ReactNode;
  disable?: boolean;
}

export default function Button({
  type,
  style,
  custom,
  onClick,
  children,
  disable,
}: ButtonProps) {
  let styleCss;
  switch (style) {
    case "point":
      styleCss =
        "rounded-sm bg-blue-500 text-white transition-shadow duration-300 hover:shadow-md";
      break;
    case "line":
      styleCss =
        "rounded-sm border border-gray-300 transition-shadow duration-300 hover:shadow-md";
      break;
    case "none":
      styleCss = "rounded-md transition-color duration-300 hover:bg-gray-100";
      break;
    default:
      break;
  }
  return (
    <button
      type={type}
      className={`flex justify-center items-center ${custom} ${styleCss} `}
      onClick={onClick}
      disabled={disable}
    >
      {children}
    </button>
  );
}
