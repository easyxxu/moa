interface ButtonProps {
  type: "submit" | "button";
  custom?: string;
  onClick?: React.MouseEventHandler;
  children: React.ReactNode;
}

export default function Button({
  type,
  custom,
  onClick,
  children,
}: ButtonProps) {
  return (
    <button type={type} className={`${custom} outer-box`} onClick={onClick}>
      {children}
    </button>
  );
}
