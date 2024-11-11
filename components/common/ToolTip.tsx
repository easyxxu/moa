interface Props {
  children: React.ReactNode;
  name: string;
}
export default function ToolTip({ children, name }: Props) {
  return (
    <div className="relative group">
      {children}
      <div className="invisible text-gray-50 absolute translate-y-[120%] -translate-x-[50%] left-[50%] -bottom-0 whitespace-nowrap px-3 py-1 opacity-80 rounded-3xl bg-gray-900 group-hover:visible">
        <p className="text-sm font-light">{name}</p>
      </div>
    </div>
  );
}
