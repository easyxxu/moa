import Image from "next/image";

interface ButtonProps {
  type?: "submit" | "button";
  src?: string;
  alt?: string;
  custom?: string;
  onClick: React.MouseEventHandler;
  children: React.ReactNode;
}

export default function Button({
  type,
  src,
  alt,
  custom,
  onClick,
  children,
}: ButtonProps) {
  return (
    <button type={type} className={`${custom} outer-box`} onClick={onClick}>
      {/* <Image src={src} alt={alt} /> */}
      {children}
    </button>
  );
}
