// Loading skeleton component for product cards
const ProductSkeletonLoader = ({ count = 12 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-lg p-3 shadow-sm animate-pulse"
        >
          <div className="bg-gray-200 h-48 rounded-lg mb-3"></div>
          <div className="bg-gray-200 h-4 rounded mb-2 w-3/4"></div>
          <div className="bg-gray-200 h-3 rounded mb-3 w-1/2"></div>
          <div className="flex justify-between items-center">
            <div className="bg-gray-200 h-4 rounded w-1/3"></div>
            <div className="bg-gray-200 h-8 rounded w-1/4"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductSkeletonLoader;
