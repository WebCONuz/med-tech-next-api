import React from "react";
import Skeleton from "@/app/[locale]/components/ui/skeleton";

const Loading = () => {
  return (
    <>
      <div className="container py-4 sm:py-6">
        <Skeleton height="50vh" className="w-full" />
      </div>
      <div className="container flex pb-10 sm:pb-20">
        <div className="hidden lg:block w-1/3 xl:w-1/4">
          <Skeleton height="100vh" className="w-full" />
        </div>
        <div className="w-full lg:w-2/3 xl:w-3/4 lg:pl-6">
          <Skeleton height="60px" className="w-full mb-4 sm:mb-6" />
          <div className="grid grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-5 md:gap-6">
            <Skeleton height="300px" className="w-full" />
            <Skeleton height="300px" className="w-full" />
            <Skeleton height="300px" className="w-full" />
            <Skeleton height="300px" className="w-full" />
            <Skeleton height="300px" className="w-full" />
            <Skeleton height="300px" className="w-full" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Loading;
