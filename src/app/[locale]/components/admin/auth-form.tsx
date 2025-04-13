"use client";
import Link from "next/link";
import React from "react";

const AuthForm = () => {
  return (
    <div>
      <input
        type="email"
        className="py-3 px-4 rounded-md outline-none border border-gray-300 hover:border-main-color focus:border-main-color w-full mb-3"
        placeholder="Your email"
        defaultValue="mainadmin@gmail.com"
      />
      <input
        type="password"
        className="py-3 px-4 rounded-md outline-none border border-gray-300 hover:border-main-color focus:border-main-color w-full mb-3"
        placeholder="Password"
        defaultValue="admin1234"
      />
      <input
        type="submit"
        className="py-3 px-4 rounded-md outline-none text-white bg-main-color w-full"
        placeholder="Password"
      />
      <Link
        href="/admin/user"
        className="block w-full text-center text-sm text-main-color mt-2"
      >
        Home page
      </Link>
    </div>
  );
};

export default AuthForm;
