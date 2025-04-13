import Link from "next/link";
import React from "react";
import { FaStar } from "react-icons/fa";

const TopProductCard = () => {
  return (
    <div className="w-full flex items-center gap-x-3">
      <Link
        href="#"
        className="flex w-1/4 py-2 px-3 bg-main-bg rounded-md overflow-hidden"
      >
        <img
          src="https://tunatheme.com/tf/html/vicodin-preview/vicodin/img/product/3.png"
          alt="product-image"
          className="w-full object-center"
        />
      </Link>
      <div className="w-3/4">
        <div className="flex gap-x-[2px] mb-2">
          <FaStar className="text-sm text-yellow-500" />
          <FaStar className="text-sm text-yellow-500" />
          <FaStar className="text-sm text-yellow-500" />
          <FaStar className="text-sm text-yellow-500" />
          <FaStar className="text-sm text-yellow-500" />
        </div>
        <Link
          href="#"
          className="block text-gray-600 duration-200 hover:text-main-color"
        >
          <b className="text-sm">Mixel Solid Seat Cover</b>
        </Link>
      </div>
    </div>
  );
};

export default TopProductCard;
