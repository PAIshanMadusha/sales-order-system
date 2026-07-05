// A reusable page header component that accepts a title and an optional right-aligned element
export default function PageHeader({ title, right }) {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-3xl font-semibold text-gray-800 tracking-tight uppercase">
        {title}
      </h1>
      <div className="flex items-center gap-2">{right}</div>
    </div>
  );
}
