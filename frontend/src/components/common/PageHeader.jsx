// A reusable page header component that accepts a title and an optional right-aligned element
export default function PageHeader({ title, right }) {
  return (
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-xl font-bold text-gray-800">{title}</h1>
      {right}
    </div>
  );
}
