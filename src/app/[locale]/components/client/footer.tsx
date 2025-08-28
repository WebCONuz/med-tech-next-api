"use client";
import React from "react";
import { useTranslations } from "next-intl";

const Footer = () => {
  const t = useTranslations();
  return (
    <footer className="bg-[#171B2A] py-6 sm:py-8">
      <div className="container flex justify-center">
        <p className="text-white text-sm sm:text-base">
          &copy; {t("footer")} 2012
        </p>
      </div>
    </footer>
  );
};

export default Footer;
