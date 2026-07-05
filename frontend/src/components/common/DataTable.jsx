// A reusable data table component that accepts columns, data, and a row click handler
export default function DataTable({ columns, data, onRowClick }) {
  return (
    <table className="w-full border">
      <thead className="bg-gray-100">
        <tr>
          {columns.map((col) => (
            <th key={col} className="p-2 text-left border">
              {col}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.map((row, i) => (
          <tr
            key={i}
            className="hover:bg-gray-50 cursor-pointer"
            onClick={() => onRowClick?.(row)}
          >
            {Object.values(row).map((val, j) => (
              <td key={j} className="p-2 border text-sm">
                {val}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
