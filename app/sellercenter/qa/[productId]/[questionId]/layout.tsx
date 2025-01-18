export default function QADetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="w-full p-3 mx-auto bg-white sm:p-6">{children}</div>;
}
