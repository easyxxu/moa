export default function QADetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full p-6 mx-auto bg-white rounded-lg shadow-md">
      {children}
    </div>
  );
}
