import Image from "next/image";
import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <main className="bg-blue-50">
      <div className="container h-screen flex items-center justify-center flex-col gap-y-1">
        <Image
          src="/404.png"
          alt="not found image"
          height={300}
          width={300}
          className="w-[300px] object-cover"
        />
        <Link
          href="/"
          className="text-2xl font-bold text-main-color duration-200 hover:text-blue-500"
        >
          Go home page
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
