interface Props {
  headers: string[];
}
export default function TableHeader({ headers }: Props) {
  return (
    <thead className="text-center text-gray-700 bg-gray-200">
      <tr>
        {headers.map((header, idx) => (
          <th className={`py-4 px-4`} key={idx}>
            {header}
          </th>
        ))}
      </tr>
    </thead>
  );
}
