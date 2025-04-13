"use client";
import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { IoTrashOutline } from "react-icons/io5";
import SureModal from "@/app/[locale]/components/admin/modal/sure-modal";
import CategoryModal from "@/app/[locale]/components/admin/modal/category-modal";

type langCategory = {
  id: number;
  name: string;
  languageId: number;
  categoryId: number;
};

export type categoryType = {
  id: number;
  createdAt: string;
  updatedAt: string;
  logo: string;
  num?: number;
  translations: langCategory[];
};
const allCategories: categoryType[] = [
  {
    id: 1,
    createdAt: "2025-04-07T12:49:01.274Z",
    updatedAt: "2025-04-07T12:49:01.274Z",
    logo: "b2a8d0e1-cc51-46e2-b3a1-0bd21f3bb4a8.jpg",
    translations: [
      {
        id: 1,
        name: "Diagnostic Tools",
        languageId: 1,
        categoryId: 1,
      },
      {
        id: 2,
        name: "Диагностические инструменты",
        languageId: 3,
        categoryId: 1,
      },
      {
        id: 3,
        name: "Diagnostika asboblari",
        languageId: 2,
        categoryId: 1,
      },
    ],
  },
  {
    id: 2,
    createdAt: "2025-04-07T12:50:08.435Z",
    updatedAt: "2025-04-07T12:50:08.435Z",
    logo: "2d74d01e-4344-44d6-b093-05ca536d78ad.jpg",
    translations: [
      {
        id: 4,
        name: "Monitoring Equipment",
        languageId: 1,
        categoryId: 2,
      },
      {
        id: 5,
        name: "Kuzatuv uskunalari",
        languageId: 2,
        categoryId: 2,
      },
      {
        id: 6,
        name: "Оборудование для мониторинга",
        languageId: 3,
        categoryId: 2,
      },
    ],
  },
  {
    id: 3,
    createdAt: "2025-04-07T12:50:33.172Z",
    updatedAt: "2025-04-07T12:50:33.172Z",
    logo: "a8f02031-56b0-466c-884c-71984608dc24.jpg",
    translations: [
      {
        id: 7,
        name: "Therapeutic Devices",
        languageId: 1,
        categoryId: 3,
      },
      {
        id: 8,
        name: "Terapevtik qurilmalar",
        languageId: 2,
        categoryId: 3,
      },
      {
        id: 9,
        name: "Терапевтические устройства",
        languageId: 3,
        categoryId: 3,
      },
    ],
  },
  {
    id: 4,
    createdAt: "2025-04-07T12:51:03.906Z",
    updatedAt: "2025-04-07T12:51:03.906Z",
    logo: "088638cd-1ea5-4568-89ed-13d486827a56.jpg",
    translations: [
      {
        id: 10,
        name: "Surgical Instruments",
        languageId: 1,
        categoryId: 4,
      },
      {
        id: 11,
        name: "Jarrohlik asboblari",
        languageId: 2,
        categoryId: 4,
      },
      {
        id: 12,
        name: "Хирургические инструменты",
        languageId: 3,
        categoryId: 4,
      },
    ],
  },
];

const CategoryPage = () => {
  const [openSure, setOpenSure] = useState(false);
  const [openCategoryModal, setOpenCategoryModal] = useState(false);
  const [category, setCategory] = useState<categoryType>();

  const editData = (data: categoryType) => {
    setCategory({ ...data, num: Math.random() });
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
  const deleteData = () => {
    console.log(`Product is Deleted: ${category?.id}`);
    setOpenSure(false);
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
                    src="https://static.thenounproject.com/png/4866984-200.png"
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
    </>
  );
};

export default CategoryPage;
