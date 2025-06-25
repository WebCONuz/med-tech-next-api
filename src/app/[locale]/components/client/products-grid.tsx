"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTranslations } from "next-intl";
import TopProductCard from "@/app/[locale]/components/ui/top-product-card";
import ProductCard from "@/app/[locale]/components/ui/product-card";
import RowProductCard from "@/app/[locale]/components/ui/row-product-card";
import Pagination from "@/app/[locale]/components/ui/pagination";
import { ProductItem } from "@/types/product.types";
import { ILang } from "@/types/lang.types";
import { categoryType } from "@/types/category.types";
import Skeleton from "../ui/skeleton";
import EmptyData from "../ui/empty-data";

import { IoGrid } from "react-icons/io5";
import { FaThList } from "react-icons/fa";
import { FaLongArrowAltRight } from "react-icons/fa";
import { LuChartColumnIncreasing } from "react-icons/lu";
import { FaSliders } from "react-icons/fa6";
import { MdClose } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { BiSolidCategoryAlt } from "react-icons/bi";

interface ICategory extends ILang {
  logo: string;
}

const ProductsGrid = ({ locale }: { locale: string }) => {
  const [isGrid, setIsGrid] = useState(true);
  const [openFilter, setOpenFilter] = useState(false);

  const [langId, setLangId] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [category, setCategory] = useState<ICategory[]>([]);
  const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null);
  const [catLoading, setCatLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // backend total count asosida hisoblanadi
  const limit = 12;

  const t = useTranslations("ProductsPage");
  const skeleton = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const closeResponsiveModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.target === e.currentTarget) {
      setOpenFilter(false);
    }
  };

  async function getLangs() {
    const res1 = await axios.get(
      `https://api.berlinmed-export.com/api/language`
    );
    const lang = res1.data;
    const langObj = lang.data.find((item: ILang) => item.name === locale);
    if (langObj) {
      setLangId(langObj.id);
    }
  }

  async function getCategories() {
    setCatLoading(true);
    const res = await axios.get(
      "https://api.berlinmed-export.com/api/category"
    );
    const categories: categoryType[] = res.data.data;
    const filterCategory: ICategory[] = categories?.map((item) => {
      let translation = item.translations.find((c) => c.languageId === langId);
      return {
        id: item.id,
        name: translation?.name || "",
        logo: "https://api.berlinmed-export.com/" + item.logo,
      };
    });
    setCategory(filterCategory);
    setCatLoading(false);
  }

  // get all
  async function getProducts(page: number = 1, limit: number = 9) {
    try {
      setLoading(true);
      const res = await axios.get(
        "https://api.berlinmed-export.com/api/product",
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
      if (res.status !== 200) throw new Error("Some error");
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
        `https://api.berlinmed-export.com/api/product/category/${categoryId}`,
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

  // get by search
  async function searchProducts(
    term: string,
    page: number = 1,
    limit: number = 9
  ) {
    try {
      setLoading(true);
      const res = await axios.get(
        "https://api.berlinmed-export.com/api/product/search",
        {
          headers: {
            lang: String(langId),
          },
          params: {
            term,
            page,
            limit,
          },
        }
      );
      if (res.status !== 200) throw new Error("Search error");
      const filtered = res.data.data.data?.map((item: any) => ({
        id: item?.id,
        categoryId: item?.categoryId,
        categoryName: item?.category?.translations?.[0]?.name,
        images: item?.images,
        name: item?.translations?.[0]?.name,
        description: item?.translations?.[0]?.description,
        languageId: item?.translations?.[0]?.languageId,
      }));
      setProducts(filtered);
      setTotalPages(Math.ceil(res.data.data.total / limit)); // agar total kelayotgan bo‘lsa
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

    if (searchTerm) {
      searchProducts(searchTerm, newPage, limit);
    } else if (activeCategoryId) {
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

  useEffect(() => {
    if (searchTerm === "") {
      getProducts(currentPage, limit);
    }
  }, [searchTerm]);

  return (
    <div className="container flex pt-10 pb-20">
      <aside
        onClick={closeResponsiveModal}
        className={`client-sidebar fixed lg:sticky left-0 lg:left-auto top-0 lg:top-1 z-50 lg:z-10 w-full lg:w-1/3 xl:w-1/4 h-screen bg-[#000000b6] lg:bg-transparent px-2 sm:px-4 lg:px-0 lg:pr-2 overflow-y-auto custom-scrollbar max-lg:flex max-lg:items-center max-lg:justify-center duration-200 ${
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
                className="close-btn text-2xl absolute top-1/2 -translate-1/2 right-0 lg:hidden"
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
                  <div className="flex gap-x-2 items-center">
                    <BiSolidCategoryAlt className="text-main-color text-xl sm:text-3xl" />
                    <span>{t("allProducts")}</span>
                  </div>
                  <FaLongArrowAltRight className="text-main-color text-lg" />
                </li>
                {category.map((item) => (
                  <li
                    key={item?.id}
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
                    <div className="flex gap-x-2 items-center w-[90%] line-clamp-2">
                      <img
                        src={item.logo}
                        alt="category-item-img"
                        className="w-6 sm:w-8"
                      />
                      <span>{item.name}</span>
                    </div>
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
              {products.map((item, index) => {
                if (index < 6)
                  return <TopProductCard key={item?.id} data={item} />;
                else return <div key={index + 78}></div>;
              })}
            </div>
          </div>

          {/* <img
            src="https://tunatheme.com/tf/html/vicodin-preview/vicodin/img/banner/2.jpg"
            alt="rec"
            className="w-full rounded-md hidden lg:block"
          /> */}
        </div>
      </aside>
      <main className="client-main w-full lg:w-2/3 xl:w-3/4 min-h-[calc(100vh-118px-88px)] lg:pl-6">
        <nav className=" py-2 mb-8 xl:mb-10">
          <div className="flex items-center justify-between">
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
              {t("info", {
                start: (currentPage - 1) * limit + 1,
                end: limit * currentPage,
                total: totalPages,
              })}
            </p>
            <div className="flex gap-x-2 lg:gap-x-0">
              {/* <Accordion /> */}

              <div className="relative hidden md:block">
                <input
                  id="search_input"
                  type="text"
                  placeholder={t("placeholder")}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setCurrentPage(1);
                      searchProducts(searchTerm, 1, limit);
                    }
                  }}
                  className="outline-none border border-gray-300 py-[6px] md:py-2 pl-9 pr-4 rounded-4xl w-[200px] xl:w-[300px] placeholder:text-gray-400 text-gray-600"
                />
                <label
                  htmlFor="search_input"
                  onClick={() => {
                    if (searchTerm) {
                      setCurrentPage(1);
                      searchProducts(searchTerm, 1, limit);
                    }
                  }}
                  className="absolute left-5 top-1/2 -translate-1/2 cursor-pointer"
                >
                  <FiSearch className="text-xl text-gray-400" />
                </label>
              </div>

              {/* bar */}
              <div
                onClick={() => setOpenFilter(true)}
                className="lg:hidden flex items-center justify-center py-[6px] sm:py-2 px-2 sm:px-3 border border-gray-400 rounded-md"
              >
                <FaSliders className="text-lg sm:text-xl text-gray-500" />
              </div>
            </div>
          </div>
          <div className="mt-4 mb-2 relative md:hidden">
            <input
              id="search_input_res"
              type="text"
              placeholder={t("placeholder")}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setCurrentPage(1);
                  searchProducts(searchTerm, 1, limit);
                }
              }}
              className="outline-none border border-gray-300 py-[6px] pl-9 pr-4 rounded-4xl w-full placeholder:text-gray-400 text-gray-600"
            />
            <label
              htmlFor="search_input_res"
              onClick={() => {
                if (searchTerm) {
                  setCurrentPage(1);
                  searchProducts(searchTerm, 1, limit);
                }
              }}
              className="absolute left-5 top-1/2 -translate-1/2 cursor-pointer"
            >
              <FiSearch className="text-xl text-gray-400" />
            </label>
          </div>
          <p className="sm:hidden text-gray-600">
            {t("info", {
              start: (currentPage - 1) * limit + 1,
              end: limit * currentPage,
              total: totalPages,
            })}
          </p>
        </nav>

        {products.length === 0 ? (
          <EmptyData title={t("empty_title")} />
        ) : isGrid ? (
          <div className="grid grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-5 md:gap-6 lg:gap-7 xl:gap-8">
            {!loading
              ? products?.map((item) => (
                  <ProductCard key={item?.id + 2} data={item} />
                ))
              : skeleton?.map((item) => (
                  <Skeleton key={item + 15} height="300px" />
                ))}
          </div>
        ) : (
          <div className="flex flex-col gap-y-4 sm:gap-y-6 xl:gap-y-8">
            {!loading
              ? products?.map((item) => (
                  <RowProductCard key={item?.id + 100} data={item} />
                ))
              : skeleton?.map((item) => (
                  <Skeleton height="200px" key={item + 41} />
                ))}
          </div>
        )}

        {totalPages > 1 && (
          <Pagination
            pageCount={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        )}
      </main>
    </div>
  );
};

export default ProductsGrid;
