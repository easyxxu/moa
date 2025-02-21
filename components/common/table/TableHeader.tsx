interface Props {
  headers: string[];
}
export default function TableHeader({ headers }: Props) {
  return (
    <thead className="text-center border-t-4 border-gray-900 border-y text-nowrap">
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
