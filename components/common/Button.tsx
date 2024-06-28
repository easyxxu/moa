import Image from "next/image";

interface ButtonProps {
  type?: "submit" | "button";
  src?: string;
  alt?: string;
  custom?: string;
  children: React.ReactNode;
}

export default function Button({
  type,
  src,
  alt,
  custom,
  children,
}: ButtonProps) {
  return (
    <button type={type} className={`${custom} outer-box`}>
      {/* <Image src={src} alt={alt} /> */}
      {children}
    </button>
  );
}
