import React from "react";

const Title = ({ title }: { title: string }) => {
  return (
    <div className="flex flex-col mb-6 md:mb-8 xl:mb-10">
      <h2 className="text-main-color text-xl md:text-2xl lg:text-[27px] xl:text-3xl font-bold mb-2 md:mb-3">
        {title}
      </h2>
      <div className="w-8 md:w-10 lg:w-12 xl:w-14 h-[3px] md:h-1 bg-main-color rounded-md"></div>
    </div>
  );
};

export default Title;
