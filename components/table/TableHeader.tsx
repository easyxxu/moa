interface Props {
  headers: string[];
}
export default function TableHeader({ headers }: Props) {
  return (
    <thead className="text-lg text-black bg-gray-200">
      <tr>
        {headers.map((header, idx) => (
          <th className={`py-2 px-4`} key={idx}>
            {header}
          </th>
        ))}
      </tr>
    </thead>
  );
}
