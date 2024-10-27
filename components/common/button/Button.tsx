interface ButtonProps {
  type: "submit" | "button";
  custom?: string;
  onClick?: React.MouseEventHandler;
  children: React.ReactNode;
  disable?: boolean;
}

export default function Button({
  type,
  custom,
  onClick,
  children,
  disable,
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`${custom} outer-box`}
      onClick={onClick}
      disabled={disable}
    >
      {children}
    </button>
  );
}
