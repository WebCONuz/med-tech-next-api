import React from "react";
import Skeleton from "@/app/[locale]/components/ui/skeleton";

const Loading = () => {
  return (
    <>
      <div className="container pt-6 pb-4 sm:pb-10">
        <Skeleton height="45vh" className="w-full" />
      </div>
      <div className="container flex gap-x-4 sm:gap-x-8 pb-4 sm:pb-10">
        <div className="w-1/2 grid gap-4">
          <Skeleton height="350px" className="w-full" />
        </div>
        <div className="w-1/2 flex flex-col gap-y-4">
          <Skeleton height="45px" className="w-full" />
          <Skeleton height="45px" className="w-4/5" />
          <Skeleton height="45px" className="w-1/2" />
          <Skeleton height="45px" className="w-3/4" />
          <Skeleton height="45px" className="w-3/4" />
          <Skeleton height="45px" className="w-1/2" />
        </div>
      </div>
      <div className="container grid grid-cols-3 sm:grid-cols-5 gap-x-4 pb-4 sm:pb-10">
        <Skeleton height="250px" className="w-full" />
        <Skeleton height="250px" className="w-full" />
        <Skeleton height="250px" className="w-full" />
        <Skeleton height="250px" className="w-full hidden sm:block" />
        <Skeleton height="250px" className="w-full hidden sm:block" />
      </div>
      <div className="container grid grid-cols-2 sm:grid-cols-3 gap-4 pb-10">
        <Skeleton height="300px" className="w-full" />
        <Skeleton height="300px" className="w-full" />
        <Skeleton height="300px" className="w-full hidden sm:block" />
      </div>
    </>
  );
};

export default Loading;
