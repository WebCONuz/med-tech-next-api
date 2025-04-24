import React from "react";
import Skeleton from "@/app/[locale]/components/ui/skeleton";

const ProductGridSkeleton = () => {
  return (
    <div className="container flex pt-10 pb-20">
      <Skeleton height="100vh" className="hidden lg:block w-1/3 xl:w-1/4" />
      <main className="w-full lg:w-2/3 xl:w-3/4 min-h-[calc(100vh-118px-88px)] lg:pl-6">
        <Skeleton height="40px" className="w-full mb-10" />
        <div className="grid grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-5 md:gap-6 lg:gap-7 xl:gap-8">
          <Skeleton height="300px" className="w-full" />
          <Skeleton height="300px" className="w-full" />
          <Skeleton height="300px" className="w-full" />
          <Skeleton height="300px" className="w-full" />
          <Skeleton height="300px" className="w-full" />
          <Skeleton height="300px" className="w-full" />
        </div>
      </main>
    </div>
  );
};

export default ProductGridSkeleton;
