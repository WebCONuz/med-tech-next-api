"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Accordion from "@/app/[locale]/components/ui/accordion";
import TopProductCard from "@/app/[locale]/components/ui/top-product-card";
import ProductCard from "@/app/[locale]/components/ui/product-card";
import RowProductCard from "@/app/[locale]/components/ui/row-product-card";
import Pagination from "@/app/[locale]/components/ui/pagination";

import { IoGrid } from "react-icons/io5";
import { FaThList } from "react-icons/fa";
import { FaLongArrowAltRight } from "react-icons/fa";
import { LuChartColumnIncreasing } from "react-icons/lu";
import { FaSliders } from "react-icons/fa6";
import { MdClose } from "react-icons/md";
import { useTranslations } from "next-intl";
import { ProductItem } from "@/types/product.types";
import Skeleton from "../ui/skeleton";
import { ILang } from "@/types/lang.types";
import { categoryType } from "../../admin/user/category/page";

const ProductsGrid = ({ locale }: { locale: string }) => {
  const [isGrid, setIsGrid] = useState(true);
  const [openFilter, setOpenFilter] = useState(false);

  const [langId, setLangId] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<ProductItem[]>([]);

  const [category, setCategory] = useState<ILang[]>([]);
  const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null);
  const [catLoading, setCatLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // backend total count asosida hisoblanadi
  const limit = 3;

  const t = useTranslations("ProductsPage");
  const skeleton = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const closeResponsiveModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.target === e.currentTarget) {
      setOpenFilter(false);
    }
  };

  async function getLangs() {
    const res1 = await axios.get(`http://3.122.24.252:3002/api/language`);
    const lang = res1.data;
    const langObj = lang.data.find((item: ILang) => item.name === locale);
    if (langObj) {
      setLangId(langObj.id);
    }
  }

  async function getCategories() {
    setCatLoading(true);
    const res = await axios.get("http://3.122.24.252:3002/api/category");
    const categories: categoryType[] = res.data.data;
    const filterCategory: ILang[] = categories?.map((item) => {
      let translation = item.translations.find((c) => c.languageId === langId);
      return { id: item.id, name: translation?.name || "" };
    });
    setCategory(filterCategory);
    setCatLoading(false);
  }

  // get all
  async function getProducts(page: number = 1, limit: number = 9) {
    try {
      setLoading(true);
      const res = await axios.get("http://3.122.24.252:3002/api/product", {
        headers: {
          lang: String(langId),
        },
        params: {
          page,
          limit,
        },
      });
      if (res.status !== 200) throw new Error("Some error");
      console.log(res.data.data.data);

      setProducts(res.data.data.data);
      setTotalPages(Math.ceil(res.data.data.total / limit));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  // get by category
  async function getProductsByCategory(
    categoryId: number,
    page: number = 1,
    limit: number = 9
  ) {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://3.122.24.252:3002/api/product/category/${categoryId}`,
        {
          headers: {
            lang: String(langId),
          },
          params: {
            page,
            limit,
          },
        }
      );
      if (res.status !== 200) throw new Error("Category product error");
      setProducts(res.data.data.data);
      setTotalPages(Math.ceil(res.data.data.total / limit));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  // get by pagination
  const handlePageChange = ({ selected }: { selected: number }) => {
    const newPage = selected + 1;
    setCurrentPage(newPage);
    if (activeCategoryId) {
      getProductsByCategory(activeCategoryId, newPage, limit);
    } else {
      getProducts(newPage, limit);
    }
  };

  useEffect(() => {
    getLangs();
  }, [locale]);

  useEffect(() => {
    if (!langId) return;
    getCategories();
    getProducts(1, limit);
  }, [langId]);

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
            {catLoading ? (
              <div className="w-full h-[200px] flex items-center justify-center rounded-md bg-main-bg">
                <div className="w-6 h-6 rounded-full border border-white border-l-0 animate-spin"></div>
              </div>
            ) : (
              <ul>
                <li
                  onClick={() => {
                    setOpenFilter(false);
                    setActiveCategoryId(null);
                    getProducts(1, limit);
                  }}
                  className={`flex items-center justify-between px-4 py-3 rounded-md cursor-pointer duration-200 ${
                    activeCategoryId === null
                      ? "bg-main-bg"
                      : "hover:bg-main-bg"
                  }`}
                >
                  <span>{t("allProducts")}</span>
                </li>
                {category.map((item) => (
                  <li
                    key={item.id}
                    onClick={() => {
                      setOpenFilter(false);
                      setActiveCategoryId(item.id);
                      getProductsByCategory(item.id, 1, limit);
                      setCurrentPage(1);
                    }}
                    className={`flex items-center justify-between px-4 py-3 rounded-md cursor-pointer duration-200 ${
                      activeCategoryId === item.id
                        ? "bg-main-bg"
                        : "hover:bg-main-bg"
                    }`}
                  >
                    <span>{item.name}</span>
                    <FaLongArrowAltRight className="text-main-color text-lg" />
                  </li>
                ))}
              </ul>
            )}
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
                  isGrid ? "text-main-color" : "text-gray-400"
                }`}
              />
              <FaThList
                onClick={() => setIsGrid(false)}
                className={`text-[28px] cursor-pointer ${
                  !isGrid ? "text-main-color" : "text-gray-400"
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
        <Pagination
          pageCount={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </main>
    </div>
  );
};

export default ProductsGrid;
