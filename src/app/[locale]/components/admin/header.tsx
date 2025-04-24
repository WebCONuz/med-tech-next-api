import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="border-b border-gray-300 h-[60px] bg-gray-50">
      <div className="px-4 flex justify-between items-center h-full">
        <Link
          href="/admin/user"
          className="text-lg capitalize font-bold text-gray-500"
        >
          Admin panel
        </Link>

        <div className="flex items-center gap-x-3">
          <div className="w-10 h-10 rounded-full border border-gray-400 overflow-hidden">
            <img
              src="/admin.jpg"
              alt="admin"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="font-semibold text-sm text-gray-500 max-w-[100px] leading-4">
            Super
            <br /> Admin
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
