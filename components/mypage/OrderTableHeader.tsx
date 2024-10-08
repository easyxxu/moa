interface Props {
  titles: string[];
}

export default function OrderTableHeader({ titles }: Props) {
  return (
    <thead className="border-t-4 border-b-2 bg-background border-b-gray-900 border-t-gray-900">
      <tr className="*:py-3">
        {titles.map((title, idx) => (
          <th key={idx}>{title}</th>
        ))}
      </tr>
    </thead>
  );
}
