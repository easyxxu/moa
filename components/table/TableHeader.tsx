interface Props {
  headers: string[];
}
export default function TableHeader({ headers }: Props) {
  return (
    <thead className="bg-primary text-xl">
      <tr>
        {headers.map((header, idx) => (
          <th
            className={`py-1.5 ${idx === 0 ? "rounded-l-2xl" : ""} ${
              idx === headers.length - 1 ? "rounded-r-2xl" : ""
            }`}
            key={idx}
          >
            {header}
          </th>
        ))}
      </tr>
    </thead>
  );
}
