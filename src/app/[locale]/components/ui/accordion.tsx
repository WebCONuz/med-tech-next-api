"use client";
import React, { useEffect, useRef, useState } from "react";
import { FaAngleDown } from "react-icons/fa";

const Accordion = () => {
  const [open, setOpen] = useState(false);
  const [filterText, setFilterText] = useState("Default Sorting");
  const accordionRef = useRef<HTMLDivElement>(null);

  // filter function
  const filterProduct = (filter: string) => {
    setFilterText(filter);
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
    <div ref={accordionRef} className="cursor-pointer relative z-10">
      <div
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between gap-x-[6px] sm:gap-x-2 text-gray-600 bg-white border border-gray-400 rounded-md py-[6px] sm:py-2 px-3 sm:px-4"
      >
        <span className="font-bold text-sm sm:text-base">{filterText}</span>
        <FaAngleDown
          className={`duration-200 text-sm sm:text-base ${
            open ? "rotate-180" : "rotate-0"
          }`}
        />
      </div>
      <div
        className={`absolute top-[calc(100%+2px)] right-0 w-[180px] bg-white shadow-lg border rounded-md overflow-hidden duration-200 ${
          open ? "max-h-[500px] border-gray-400" : "max-h-0 border-white"
        }`}
      >
        <button
          onClick={() => filterProduct("Default Sorting")}
          className="w-full text-gray-600 text-start outline-0 border-0 text-sm sm:text-base py-2 sm:py-[10px] px-3 sm:px-4 hover:bg-gray-100 duration-200"
        >
          Default Sorting
        </button>
        <button
          onClick={() => filterProduct("Sort by popularity")}
          className="w-full text-gray-600 text-start outline-0 border-0 text-sm sm:text-base py-2 sm:py-[10px] px-3 sm:px-4 hover:bg-gray-100 duration-200"
        >
          Sort by popularity
        </button>
        <button
          onClick={() => filterProduct("Sort by new arrivals")}
          className="w-full text-gray-600 text-start outline-0 border-0 text-sm sm:text-base py-2 sm:py-[10px] px-3 sm:px-4 hover:bg-gray-100 duration-200"
        >
          Sort by new arrivals
        </button>
        <button
          onClick={() => filterProduct("Sort by price")}
          className="w-full text-gray-600 text-start outline-0 border-0 text-sm sm:text-base py-2 sm:py-[10px] px-3 sm:px-4 hover:bg-gray-100 duration-200"
        >
          Sort by price
        </button>
      </div>
    </div>
  );
};

export default Accordion;
