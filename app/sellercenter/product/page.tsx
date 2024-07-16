import Link from "next/link";

export default function ProductDashboard() {
  return (
    <div>
      <div>
        <Link
          href="/sellercenter/product/add"
          className="px-3 py-2 text-xl font-semibold shadow-out rounded-3xl bg-primary"
        >
          상품 등록
        </Link>
      </div>
    </div>
  );
}
