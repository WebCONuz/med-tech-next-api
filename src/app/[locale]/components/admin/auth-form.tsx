"use client";
import axios from "axios";
// import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const AuthForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("mainadmin@gmail.com");
  const [password, setPassword] = useState("admin1234");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://api.berlinmed-export.com/api/auth/admin-login",
        {
          email,
          password,
        }
      );
      if (res.status === 200) {
        localStorage.setItem("dmin_uth", "true");
        localStorage.setItem("access_token", res.data.data.access_token);
        router.push("/admin/user/products");
      } else {
        setError(res.data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      setError("Server error");
    }
  };

  return (
    <form className="block" onSubmit={handleLogin}>
      <input
        type="email"
        className="py-3 px-4 rounded-md outline-none border border-gray-300 hover:border-main-color focus:border-main-color w-full mb-3"
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        className="py-3 px-4 rounded-md outline-none border border-gray-300 hover:border-main-color focus:border-main-color w-full mb-3"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="submit"
        className="py-3 px-4 rounded-md outline-none text-white bg-main-color w-full"
        placeholder="Password"
      />
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      {/* <Link
        href="/admin/user"
        className="block w-full text-center text-sm text-main-color mt-2"
      >
        Home page
      </Link> */}
    </form>
  );
};

export default AuthForm;
