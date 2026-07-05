// A reusable card component that accepts children
export default function Card({ children }) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
      {children}
    </div>
  );
}
