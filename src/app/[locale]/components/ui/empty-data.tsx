import Image from "next/image";
import React from "react";

const EmptyData = ({ title }: { title: string }) => {
  return (
    <div className="h-[60vh] w-full bg-main-bg flex flex-col items-center justify-center gap-y-3 rounded-md">
      <Image
        src="/empty.webp"
        alt="empty-data-image"
        width={200}
        height={200}
        className="w-[200] object-cover"
      />
      <p className="text-xl font-bold text-main-color">{title}</p>
    </div>
  );
};

export default EmptyData;
