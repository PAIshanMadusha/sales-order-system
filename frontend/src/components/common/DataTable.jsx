// A reusable data table component that accepts columns, data, and a row click handler
export default function DataTable({ columns, data, onRowClick }) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            {columns.map((col) => (
              <th key={col} className="px-4 py-3 font-medium border-b">
                {col}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100 bg-white">
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center py-8 text-gray-500"
              >
                No records found
              </td>
            </tr>
          ) : (
            data.map((row, i) => (
              <tr
                key={i}
                onClick={() => onRowClick?.(row)}
                className="hover:bg-blue-50 cursor-pointer transition"
              >
                {Object.values(row).map((val, j) => (
                  <td key={j} className="px-4 py-3 text-gray-700">
                    {val}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
