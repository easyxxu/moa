import Header from "@/components/common/Header";

export default function LikeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="mx-auto my-4 max-w-7xl h-4/5">{children}</main>
    </>
  );
}
