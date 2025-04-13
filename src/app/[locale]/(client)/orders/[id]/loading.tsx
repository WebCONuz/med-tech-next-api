import React from "react";
import Skeleton from "@/app/[locale]/components/ui/skeleton";

const Loading = () => {
  return (
    <>
      <div className="pt-4 sm:pt-10 pb-10 sm:pb-20">
        <div className="container">
          <div className="w-full sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-1/2 2xl:w-2/5 flex flex-col gap-y-2 sm:gap-y-4 mx-auto">
            <Skeleton height="50px" className="w-full" />
            <Skeleton height="50px" className="w-4/5" />
            <Skeleton height="50px" className="w-1/2" />
            <Skeleton height="50px" className="w-3/4" />
            <Skeleton height="50px" className="w-3/4" />
            <Skeleton height="50px" className="w-1/2" />
            <Skeleton height="50px" className="w-1/2" />
            <Skeleton height="50px" className="w-1/2" />
            <Skeleton height="50px" className="w-4/5" />
            <Skeleton height="50px" className="w-3/4" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Loading;
