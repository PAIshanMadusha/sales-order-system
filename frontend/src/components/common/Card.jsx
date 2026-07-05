// A reusable card component that accepts children
export default function Card({ children }) {
  return (
    <div className="bg-white p-4 rounded shadow border border-gray-200">
      {children}
    </div>
  );
}
