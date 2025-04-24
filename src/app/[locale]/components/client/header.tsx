"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { BsEnvelope } from "react-icons/bs";
import { LiaPhoneVolumeSolid } from "react-icons/lia";
import { GrLocation } from "react-icons/gr";
import { FaFacebook } from "react-icons/fa6";
import { FaTelegram } from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";
import { IoMdSunny } from "react-icons/io";
import { IoMoon } from "react-icons/io5";

import { FiSearch } from "react-icons/fi";
import { LuMenu } from "react-icons/lu";
import { MdClose } from "react-icons/md";
import LangAccordion from "../ui/lang-accordion";
import { useTranslations } from "next-intl";
import axios from "axios";
import { ILang } from "@/types/lang.types";

const Header = ({ locale }: { locale: string }) => {
  const [isDark, setIsDark] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [langs, setLangs] = useState<ILang[]>([]);
  const pathname = usePathname();
  const t = useTranslations("header");

  const navLinks = [
    { name: t("nav.item1"), href: "/" },
    { name: t("nav.item2"), href: "/products" },
    { name: t("nav.item3"), href: "/contact" },
  ];

  const getLanguages = async () => {
    const res = await axios.get(
      "https://api.berlinmed-export.com/api/language"
    );
    if (res.status === 200) setLangs(res.data.data);
  };

  const activeLink = (pageHref: string): boolean => {
    const href =
      locale === "eng"
        ? pageHref
        : pageHref === "/"
        ? `/${locale}`
        : `/${locale}${pageHref}`;
    return href === pathname;
  };

  const darkMode = () => {
    setIsDark(!isDark);
  };

  useEffect(() => {
    getLanguages();
  }, []);

  return (
    <header className="shadow relative">
      <div className="bg-main-color">
        <div className="container flex items-center justify-between py-[6px] lg:py-2">
          <div className="flex items-center gap-x-2 sm:gap-x-4">
            <Link href="#" className="flex items-center text-white">
              <BsEnvelope className="sm:text-lg lg:mr-2" />
              <span className="text-sm hidden lg:block">
                med-exapmle@gmail.com
              </span>
            </Link>
            <Link href="#" className="flex items-center text-white">
              <LiaPhoneVolumeSolid className="sm:text-lg lg:mr-2" />
              <span className="text-sm hidden lg:block">
                +998(90) 100-10-10
              </span>
            </Link>
            <Link href="#" className="flex items-center text-white">
              <GrLocation className="sm:text-lg lg:mr-2" />
              <span className="text-sm hidden lg:block">{t("address")}</span>
            </Link>
          </div>
          <div className="flex items-center gap-x-3 sm:gap-x-5">
            <div className="flex items-center gap-x-1 sm:gap-x-2">
              {/* darkmode btn */}
              <button
                className="cursor-pointer w-6 sm:w-7 h-6 sm:h-7 flex items-center justify-center outline-none border border-white dark:border-gray-600 rounded-md"
                onClick={darkMode}
              >
                {isDark ? (
                  <IoMoon className="text-white text-sm sm:text-base" />
                ) : (
                  <IoMdSunny className="sm:text-lg text-white" />
                )}
              </button>

              {/* language */}
              <LangAccordion langs={langs} />
            </div>

            {/* socials */}
            <div className="flex gap-x-2 sm:gap-x-3">
              <Link href="#" className="text-white sm:text-lg">
                <FaFacebook />
              </Link>
              <Link href="#" className="text-white sm:text-lg">
                <FaTelegram />
              </Link>
              <Link href="#" className="text-white sm:text-lg">
                <FiInstagram />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="container flex items-center justify-between py-2 border-b border-gray-100">
        <Link href="/" className="block">
          <Image
            src="/logo.png"
            alt="Logo"
            width={56}
            height={56}
            className="w-12 lg:w-14 shadow-md rounded-full bg-main-bg"
          />
        </Link>
        <nav className="hidden sm:flex gap-x-6 lg:gap-x-8">
          {navLinks.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={`font-semibold ${
                activeLink(item.href) ? "text-blue-700" : "text-main-color"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="relative hidden md:block">
          <input
            id="search_input"
            disabled
            type="text"
            placeholder={t("placeholder")}
            className="outline-none border border-gray-300 py-[6px] lg:py-2 pl-9 pr-4 rounded-4xl w-[250px] lg:w-[300px] placeholder:text-gray-400 text-gray-600"
          />
          <label
            htmlFor="search_input"
            className="absolute left-5 top-1/2 -translate-1/2 cursor-pointer"
          >
            <FiSearch className="text-xl text-gray-400" />
          </label>
        </div>
        <div
          onClick={() => setOpenMenu(!openMenu)}
          className="sm:hidden w-9 h-8 border-1 border-main-color rounded-md flex items-center justify-center"
        >
          {openMenu ? (
            <MdClose className="text-main-color text-2xl" />
          ) : (
            <LuMenu className="text-main-color text-2xl" />
          )}
        </div>
      </div>
      {/* responsive menu bar  */}
      <div
        className={`sm:hidden fixed top-[100.4px] z-50 left-0 w-full h-[calc(100vh-100px)] ${
          openMenu ? "visible" : "invisible"
        }`}
      >
        <div
          onClick={() => setOpenMenu(false)}
          className={`bg-[#000000a8] w-full h-full duration-200 ${
            openMenu ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        ></div>
        <div
          className={`bg-white w-[85%] h-full absolute top-0 z-10 duration-200 px-8 py-8 flex flex-col gap-y-5 ${
            openMenu ? "left-0" : "-left-full"
          }`}
        >
          {navLinks.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={`font-semibold ${
                activeLink(item.href) ? "text-blue-700" : "text-main-color"
              }`}
              onClick={() => setOpenMenu(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
