"use client";
import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { IoTrashOutline } from "react-icons/io5";
import SureModal from "@/app/[locale]/components/admin/modal/sure-modal";
import CategoryModal from "@/app/[locale]/components/admin/modal/category-modal";
import axiosInstance from "@/lib/axios";
import { ILang } from "@/types/lang.types";
import { categoryType } from "@/types/category.types";
import EmptyData from "@/app/[locale]/components/ui/empty-data";
import AdminLoader from "@/app/[locale]/components/ui/admin-loader";
import { getCategories } from "@/lib/category";

const CategoryPage = () => {
  const [openSure, setOpenSure] = useState(false);
  const [loading, setLoading] = useState(true);
  const [openCategoryModal, setOpenCategoryModal] = useState(false);
  const [category, setCategory] = useState<categoryType>();
  const [langs, setLangs] = useState<ILang[]>([]);
  const [ID, setID] = useState<number>(0);
  const [allCategories, setAllCategories] = useState<categoryType[]>([]);

  const editData = (data: categoryType) => {
    setCategory({ ...data, num: Math.random() });
    setID(data?.id);
    setOpenCategoryModal(true);
  };

  const createCategory = () => {
    setCategory(undefined);
    setOpenCategoryModal(true);
  };

  const openDeleteModal = (data: categoryType) => {
    setCategory(data);
    setOpenSure(true);
  };

  // get langs & category
  const getLangs = async () => {
    const res = await axiosInstance.get("/api/language");
    if (res.status === 200) setLangs(res.data.data);
  };
  const getAllCategories = async () => {
    try {
      setLoading(true);
      const res = await getCategories();
      setAllCategories(res);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getLangs();
    getAllCategories();
  }, []);

  const deleteData = async () => {
    try {
      await axiosInstance.delete(`/api/category/${category?.id}`);
      await getAllCategories();
    } catch (error) {
      console.log(error);
    } finally {
      setOpenSure(false);
    }
  };

  return (
    <>
      <SureModal
        title="Are you shure delete this category?"
        isOpen={openSure}
        closeModal={() => setOpenSure(false)}
        actionFn={deleteData}
      />

      <CategoryModal
        isOpen={openCategoryModal}
        closeModal={() => setOpenCategoryModal(false)}
        initialData={category}
        langs={langs}
        id={ID}
        getAll={getAllCategories}
      />

      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold ">All categories</h3>
        <button
          onClick={createCategory}
          type="submit"
          className="outline-none border-0 bg-main-color text-white px-4 py-2 rounded-md"
        >
          Create new category
        </button>
      </div>

      {loading ? (
        <AdminLoader />
      ) : allCategories.length === 0 ? (
        <EmptyData title="No data yet!" />
      ) : (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  ID
                </th>
                <th scope="col" className="px-6 py-3">
                  IMAGE
                </th>
                <th scope="col" className="px-6 py-3">
                  NAME (EN)
                </th>
                <th scope="col" className="px-6 py-3">
                  NAME (RU)
                </th>
                <th scope="col" className="px-6 py-3">
                  NAME (UZ)
                </th>
                <th scope="col" className="px-6 py-3">
                  <p className="text-end">Actions</p>
                </th>
              </tr>
            </thead>
            <tbody>
              {allCategories.map((category) => (
                <tr
                  key={category.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
                >
                  <td scope="row" className="px-6 py-4">
                    {category.id}
                  </td>
                  <td scope="row" className="px-6 py-4">
                    <img
                      src={"https://api.berlinmed-export.com/" + category?.logo}
                      alt="category-logo"
                      className="w-10 rounded-md shadow-md"
                    />
                  </td>
                  {category.translations.map((translate) => (
                    <td
                      key={translate.id + "123"}
                      scope="row"
                      className="px-6 py-4"
                    >
                      {translate.name}
                    </td>
                  ))}
                  <td className="px-6 py-4 text-right">
                    <div className="flex gap-x-2 justify-end">
                      <CiEdit
                        onClick={() => editData(category)}
                        className="text-green-500 text-lg cursor-pointer"
                      />
                      <IoTrashOutline
                        onClick={() => openDeleteModal(category)}
                        className="text-red-500 text-lg cursor-pointer"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default CategoryPage;
