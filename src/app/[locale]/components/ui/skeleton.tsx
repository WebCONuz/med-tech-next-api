import React from "react";

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string;
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({
  width = "100%",
  height = "20px",
  borderRadius = "4px",
  className = "",
}) => {
  return (
    <div
      className={`bg-main-bg rounded-md animate-pulse ${className}`}
      style={{
        width,
        height,
        borderRadius,
      }}
    />
  );
};

export default Skeleton;
