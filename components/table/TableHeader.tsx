interface Props {
  headers: string[];
}
export default function TableHeader({ headers }: Props) {
  return (
    <thead className={`bg-secondary text-xl`}>
      <tr>
        {headers.map((header) => (
          <th className="py-1.5">{header}</th>
        ))}
      </tr>
    </thead>
  );
}
