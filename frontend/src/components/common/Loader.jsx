// A simple loader component that displays a spinning animation and a loading message
export default function Loader() {
  return (
    <div className="flex items-center justify-center py-10">
      <div className="flex flex-col items-center gap-2">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm text-gray-500">Loading...</p>
      </div>
    </div>
  );
}
