interface ToolTipProps {
  children: React.ReactNode;
  name: string;
}
export default function ToolTip({ children, name }: ToolTipProps) {
  return (
    <div className="relative group">
      {children}
      <div className="invisible absolute translate-y-[120%] -translate-x-[50%] left-[50%] -bottom-0 whitespace-nowrap px-3 py-1 z-10 opacity-80 rounded-3xl bg-primary group-hover:visible">
        <p className="font-light text-sm">{name}</p>
      </div>
    </div>
  );
}
