"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Accordion from "@/app/[locale]/components/ui/accordion";
import TopProductCard from "@/app/[locale]/components/ui/top-product-card";
import ProductCard from "@/app/[locale]/components/ui/product-card";
import Button from "@/app/[locale]/components/ui/button";
import RowProductCard from "@/app/[locale]/components/ui/row-product-card";

import { IoGrid } from "react-icons/io5";
import { FaThList } from "react-icons/fa";
import { FaLongArrowAltRight } from "react-icons/fa";
import { LuChartColumnIncreasing } from "react-icons/lu";
import { FaSliders } from "react-icons/fa6";
import { MdClose } from "react-icons/md";
import { useTranslations } from "next-intl";
import { ProductItem } from "@/types/product.types";
import Skeleton from "../ui/skeleton";

const ProductsGrid = () => {
  const [isGrid, setIsGrid] = useState(true);
  const [openFilter, setOpenFilter] = useState(false);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<ProductItem[]>([]);
  const t = useTranslations("ProductsPage");
  const skeleton = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const closeResponsiveModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.target === e.currentTarget) {
      setOpenFilter(false);
    }
  };

  async function getProducts() {
    try {
      setLoading(true);
      const res = await axios.get("http://3.122.24.252:3002/api/product", {
        headers: {
          lang: "1",
        },
      });
      if (res.status !== 200) throw new Error("Some error");
      const prod = res.data.data;
      setProducts(prod);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="container flex pt-10 pb-20">
      <aside
        onClick={closeResponsiveModal}
        className={`fixed lg:sticky left-0 lg:left-auto top-0 lg:top-1 z-50 lg:z-10 w-full lg:w-1/3 xl:w-1/4 h-screen bg-[#000000b6] lg:bg-transparent px-2 sm:px-4 lg:px-0 lg:pr-2 overflow-y-auto custom-scrollbar max-lg:flex max-lg:items-center max-lg:justify-center duration-200 ${
          openFilter
            ? "max-lg:opacity-100 max-lg:visible"
            : "max-lg:opacity-0 max-lg:invisible"
        }`}
      >
        <div className="bg-white rounded-md w-full sm:w-4/5 lg:w-full">
          <div className="lg:mb-5 px-4 py-6 lg:border lg:border-gray-300 rounded-md">
            <div className="flex items-center gap-x-4 mb-5 relative">
              <FaSliders className="text-xl text-main-color" />
              <h5 className="font-semibold">{t("aside.title1")}</h5>
              <MdClose
                onClick={() => setOpenFilter(false)}
                className="text-2xl absolute top-1/2 -translate-1/2 right-0 lg:hidden"
              />
            </div>
            <ul>
              <li
                onClick={() => setOpenFilter(false)}
                className="flex items-center justify-between px-4 py-3 rounded-md cursor-pointer hover:bg-main-bg duration-200"
              >
                <span>Hand Sanitizer</span>
                <FaLongArrowAltRight className="text-main-color text-lg" />
              </li>
              <li
                onClick={() => setOpenFilter(false)}
                className="flex items-center justify-between px-4 py-3 rounded-md cursor-pointer hover:bg-main-bg duration-200"
              >
                <span>Hand Sanitizer</span>
                <FaLongArrowAltRight className="text-main-color text-lg" />
              </li>
              <li
                onClick={() => setOpenFilter(false)}
                className="flex items-center justify-between px-4 py-3 rounded-md cursor-pointer hover:bg-main-bg duration-200"
              >
                <span>Hand Sanitizer</span>
                <FaLongArrowAltRight className="text-main-color text-lg" />
              </li>
              <li
                onClick={() => setOpenFilter(false)}
                className="flex items-center justify-between px-4 py-3 rounded-md cursor-pointer hover:bg-main-bg duration-200"
              >
                <span>Hand Sanitizer</span>
                <FaLongArrowAltRight className="text-main-color text-lg" />
              </li>
              <li
                onClick={() => setOpenFilter(false)}
                className="flex items-center justify-between px-4 py-3 rounded-md cursor-pointer hover:bg-main-bg duration-200"
              >
                <span>Hand Sanitizer</span>
                <FaLongArrowAltRight className="text-main-color text-lg" />
              </li>
            </ul>
          </div>

          {/* <div className="mb-5 px-4 py-6 border border-gray-300 rounded-md">
            <div className="flex items-center gap-x-4 mb-5">
              <IoFilter className="text-2xl text-main-color" />
              <h5 className="font-semibold">Filter by price</h5>
            </div>
          </div> */}

          <div className="mb-5 px-4 py-6 border border-gray-300 rounded-md hidden lg:block">
            <div className="flex items-center gap-x-4 mb-8">
              <LuChartColumnIncreasing className="text-2xl text-main-color" />
              <h5 className="font-semibold">{t("aside.title2")}</h5>
            </div>
            <div className="flex flex-col gap-y-3">
              <TopProductCard />
              <TopProductCard />
              <TopProductCard />
              <TopProductCard />
            </div>
          </div>

          <img
            src="https://tunatheme.com/tf/html/vicodin-preview/vicodin/img/banner/2.jpg"
            alt="rec"
            className="w-full rounded-md hidden lg:block"
          />
        </div>
      </aside>
      <main className="w-full lg:w-2/3 xl:w-3/4 min-h-[calc(100vh-118px-88px)] lg:pl-6">
        <nav className=" py-2 mb-8 xl:mb-10">
          <div className="flex items-center justify-between mb-4 sm:mb-0">
            <div className="flex gap-x-2">
              <IoGrid
                onClick={() => setIsGrid(true)}
                className={`text-[28px] cursor-pointer ${
                  isGrid ? "text-main-color" : "text-gray-600"
                }`}
              />
              <FaThList
                onClick={() => setIsGrid(false)}
                className={`text-[28px] cursor-pointer ${
                  !isGrid ? "text-main-color" : "text-gray-600"
                }`}
              />
            </div>
            <p className="hidden sm:block text-gray-600">
              {t("info", { start: 1, end: 6, total: 23 })}
            </p>
            <div className="flex gap-x-2 lg:gap-x-0">
              <Accordion />
              <div
                onClick={() => setOpenFilter(true)}
                className="lg:hidden flex items-center justify-center py-[6px] sm:py-2 px-2 sm:px-3 border border-gray-400 rounded-md"
              >
                <FaSliders className="text-lg sm:text-xl text-gray-500" />
              </div>
            </div>
          </div>
          <p className="sm:hidden text-gray-600">Showing 1–12 of 18 results</p>
        </nav>
        {isGrid ? (
          <div className="grid grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-5 md:gap-6 lg:gap-7 xl:gap-8">
            {!loading
              ? products?.map((item) => (
                  <ProductCard key={item.id + 2} data={item} />
                ))
              : skeleton?.map((item) => <Skeleton height="300px" key={item} />)}
          </div>
        ) : (
          <div className="flex flex-col gap-y-4 sm:gap-y-6 xl:gap-y-8">
            {!loading
              ? products?.map((item) => (
                  <RowProductCard key={item.id + 2} data={item} />
                ))
              : skeleton?.map((item) => <Skeleton height="200px" key={item} />)}
          </div>
        )}
        <div className="flex justify-center items-center gap-x-2 mt-10">
          <Button>1</Button>
          <Button>2</Button>
          <Button>3</Button>
          <span className="text-2xl">...</span>
          <Button>12</Button>
        </div>
      </main>
    </div>
  );
};

export default ProductsGrid;
