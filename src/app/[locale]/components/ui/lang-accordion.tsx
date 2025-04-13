"use client";
import React, { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { FaAngleDown } from "react-icons/fa";

const LangAccordion = () => {
  const [open, setOpen] = useState(false);
  const accordionRef = useRef<HTMLDivElement>(null);
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  // change lang function
  const changeLang = (newLang: string) => {
    let newUrl = pathname;
    if (pathname.includes(locale)) {
      newUrl = pathname.replace(locale, newLang);
    } else {
      newUrl = "/" + newLang + newUrl;
    }
    router.replace(newUrl);
    setOpen(false);
  };

  // accordiondan tashqariga bosilganda yopilib ketishi uchun
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        accordionRef.current &&
        !accordionRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    // Faqat accordion ochiq bo'lganda event listener qo'shamiz
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div ref={accordionRef} className="relative z-10 cursor-pointer">
      <div
        onClick={() => setOpen(!open)}
        className="h-6 sm:h-7 flex items-center gap-x-[2px] border border-white rounded-md px-2"
      >
        <span className="text-xs sm:text-sm text-white">{locale}</span>
        <FaAngleDown
          className={`text-white text-sm ${open ? "rotate-180" : "rotate-0"}`}
        />
      </div>
      <div
        className={`absolute top-[calc(100%+2px)] right-0 w-full shadow-lg border rounded-md overflow-hidden duration-200 ${
          open
            ? "max-h-[500px] border-gray-300 bg-white"
            : "max-h-0 border-transparent bg-transparent"
        }`}
      >
        <button
          onClick={() => changeLang("en")}
          className={`w-full text-gray-600 outline-0 border-0 text-sm py-1 hover:bg-main-bg duration-200 ${
            locale === "en" ? "bg-main-bg" : "bg-white"
          }`}
        >
          en
        </button>
        <button
          onClick={() => changeLang("ru")}
          className={`w-full text-gray-600 outline-0 border-0 text-sm py-1 hover:bg-main-bg duration-200 ${
            locale === "ru" ? "bg-main-bg" : "bg-white"
          }`}
        >
          ru
        </button>
        <button
          onClick={() => changeLang("uz")}
          className={`w-full text-gray-600 outline-0 border-0 text-sm py-1 hover:bg-main-bg duration-200 ${
            locale === "uz" ? "bg-main-bg" : "bg-white"
          }`}
        >
          uz
        </button>
      </div>
    </div>
  );
};

export default LangAccordion;
