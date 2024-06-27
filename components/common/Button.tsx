import Image from "next/image";

interface ButtonProps {
  type?: "submit" | "button";
  src?: string;
  alt?: string;
  children: React.ReactNode;
}

export default function Button({ type, src, alt, children }: ButtonProps) {
  return (
    <button type={type} className="button">
      {/* <Image src={src} alt={alt} /> */}
      {children}
    </button>
  );
}
