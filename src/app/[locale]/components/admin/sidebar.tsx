"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axios";

const links = [
  // { id: 1, page: "home", href: "/admin/user" },
  { id: 2, page: "products", href: "/admin/user/products" },
  { id: 3, page: "category", href: "/admin/user/category" },
  { id: 4, page: "languages", href: "/admin/user/lang" },
  { id: 5, page: "orders", href: "/admin/user/orders" },
  { id: 6, page: "contacts", href: "/admin/user/contact" },
  // { id: 7, page: "admins", href: "/admin/user/all" },
];

const Sidebar = () => {
  const router = useRouter();
  const logout = async () => {
    await axiosInstance.post("/api/auth/admin-sign-out");
    localStorage.removeItem("dmin_uth");
    localStorage.removeItem("access_token");
    router.push("/admin/login");
  };

  return (
    <aside className="border-r border-gray-300 h-full p-4 flex flex-col justify-between bg-gray-50">
      <div className="flex flex-col gap-y-2">
        {links.map((link) => (
          <Link
            key={link.id}
            href={link.href}
            className="py-2 px-6 rounded-md bg-main-bg duration-200 hover:bg-main-color hover:text-white capitalize shadow-md"
          >
            {link.page}
          </Link>
        ))}
      </div>
      <button
        onClick={logout}
        type="button"
        className="py-2 border border-red-300 outline-none rounded-md text-red-500 bg-red-100 duration-200 hover:bg-red-500 hover:text-white shadow-md"
      >
        Log out
      </button>
    </aside>
  );
};

export default Sidebar;
