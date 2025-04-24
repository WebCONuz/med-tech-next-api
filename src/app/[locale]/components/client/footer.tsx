import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#171B2A] py-6 sm:py-8">
      <div className="container flex justify-center">
        <p className="text-white text-sm sm:text-base">
          &copy; Copyright {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
