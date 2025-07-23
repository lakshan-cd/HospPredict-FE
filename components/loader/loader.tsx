const Loader = () => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 mt-6">
            {[...Array(5)].map((_, index) => (
                <div key={index} className="border border-primary-200 rounded-xl p-3 flex flex-col h-full bg-white relative animate-pulse">
                    {/* Image Skeleton */}
                    <div className="w-full aspect-square bg-gray-200 rounded-lg mb-3" />
                    
                    {/* Title Skeleton */}
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-2" />
                    
                    {/* Price Skeleton */}
                    <div className="h-6 bg-gray-200 rounded w-1/3 mb-2" />
                    
                    {/* Button Skeleton */}
                    <div className="h-10 bg-gray-200 rounded w-full mt-auto" />
                </div>
            ))}
        </div>
    );
}

export default Loader;