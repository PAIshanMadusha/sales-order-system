// A reusable button component that accepts children, className, and other props
export default function Button({ children, className = "", ...props }) {
  return (
    <button
      {...props}
      className={`px-3 py-2 text-sm md:px-6 md:py-2 md:text-base rounded bg-blue-600 hover:bg-blue-700 text-white transition disabled:opacity-50 ${className}`}
    >
      {children}
    </button>
  );
}
