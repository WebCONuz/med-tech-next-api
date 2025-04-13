"use client";
import React from "react";

const Button = ({ children }: { children: React.ReactNode }) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("+++");
  };

  return (
    <button
      className="rounded-md py-2 px-4 bg-main-color hover:bg-main-bg text-white hover:text-black"
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export default Button;
