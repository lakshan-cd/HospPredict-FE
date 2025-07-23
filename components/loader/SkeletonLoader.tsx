import React from 'react';

interface SkeletonLoaderProps {
  rows?: number;
  width?: string;
  height?: string;
  className?: string;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ rows = 3, width = '100%', height = '20px', className = '' }) => {
  return (
    <div className={className}>
      {Array.from({ length: rows }).map((_, idx) => (
        <div
          key={idx}
          className="bg-gray-200 animate-pulse rounded mb-3 last:mb-0"
          style={{ width, height }}
        />
      ))}
    </div>
  );
};

export default SkeletonLoader; 