// A reusable select component that accepts a label, children, and other props
export default function Select({ label, children, ...props }) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm text-gray-600">{label}</label>}
      <select {...props} className="border border-gray-300 p-2 rounded">
        {children}
      </select>
    </div>
  );
}
