import Header from "@/components/common/Header";

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="mx-auto my-0 max-w-7xl">{children}</main>
    </>
  );
}
