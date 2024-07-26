interface Props {
  headers: string[];
}
export default function TableHeader({ headers }: Props) {
  return (
    <thead className={`bg-secondary text-xl`}>
      <tr>
        {headers.map((header, idx) => (
          <th className="py-1.5" key={idx}>
            {header}
          </th>
        ))}
      </tr>
    </thead>
  );
}
