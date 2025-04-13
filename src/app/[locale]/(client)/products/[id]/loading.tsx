import React from "react";
import Skeleton from "@/app/[locale]/components/ui/skeleton";

const Loading = () => {
  return (
    <>
      <div className="container py-4 md:py-10 flex flex-col md:flex-row md:gap-x-6">
        <div className="w-full md:w-1/4 mb-4 md:mb-0">
          <Skeleton height="350px" className="w-full" />
        </div>
        <div className="w-full md:w-1/2 mb-4 md:mb-0">
          <Skeleton height="350px" className="w-full" />
        </div>
        <div className="w-full md:w-1/4">
          <Skeleton height="350px" className="w-full" />
        </div>
      </div>
    </>
  );
};

export default Loading;
