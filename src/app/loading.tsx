export default function Loading() {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <span className="ml-3 text-blue-500 text-lg font-medium">Loading...</span>
      </div>
    );
  }
  