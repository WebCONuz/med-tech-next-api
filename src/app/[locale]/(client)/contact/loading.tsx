import React from "react";
import Skeleton from "@/app/[locale]/components/ui/skeleton";

const Loading = () => {
  return (
    <>
      <div className="container py-4 sm:py-10">
        <Skeleton height="45vh" className="w-full" />
      </div>
      <div className="pb-10 sm:pb-20">
        <div className="container flex gap-x-4 sm:gap-x-8">
          <div className="w-1/2 flex flex-col gap-y-4">
            <Skeleton height="50px" className="w-full" />
            <Skeleton height="50px" className="w-4/5" />
            <Skeleton height="50px" className="w-1/2" />
            <Skeleton height="50px" className="w-3/4" />
            <Skeleton height="50px" className="w-3/4" />
            <Skeleton height="50px" className="w-1/2" />
          </div>
          <div className="w-1/2">
            <Skeleton height="180px" className="w-full mb-4" />
            <Skeleton height="180px" className="w-full" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Loading;
