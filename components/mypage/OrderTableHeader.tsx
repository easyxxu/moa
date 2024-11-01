interface Props {
  titles: string[];
}

export default function OrderTableHeader({ titles }: Props) {
  return (
    <thead>
      <tr className="bg-gray-200">
        {titles.map((title, idx) => (
          <th
            key={idx}
            className="px-4 py-3 font-semibold text-center text-gray-700"
          >
            {title}
          </th>
        ))}
      </tr>
    </thead>
  );
}
