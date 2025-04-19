"use client";
import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { IoTrashOutline } from "react-icons/io5";
import SureModal from "@/app/[locale]/components/admin/modal/sure-modal";
import LangModal from "@/app/[locale]/components/admin/modal/lang-modal";
import AdminLoader from "@/app/[locale]/components/ui/admin-loader";
import EmptyData from "@/app/[locale]/components/ui/empty-data";
import axiosInstance from "@/lib/axios";
import { LangItem } from "@/types/lang.types";

const LanguagePage = () => {
  const [openSure, setOpenSure] = useState(false);
  const [lang, setLang] = useState<LangItem>();
  const [openLangModal, setOpenLangModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [langs, setLangs] = useState<LangItem[]>([]);
  const [ID, setID] = useState<number>(0);

  const editData = (data: LangItem) => {
    setLang({ ...data, num: Math.random() });
    setID(data.id);
    setOpenLangModal(true);
  };

  const createLang = () => {
    setLang(undefined);
    setOpenLangModal(true);
  };

  const openDeleteModal = (data: LangItem) => {
    setLang(data);
    setOpenSure(true);
  };

  const getAllLangs = async () => {
    const res = await axiosInstance.get("/api/language");
    if (res.status === 200) {
      setLangs(res.data.data);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllLangs();
  }, []);

  const deleteData = async () => {
    console.log(`Contact is Deleted: ${lang?.id}`);
    await axiosInstance.delete(`/api/language/${lang?.id}`);
    await getAllLangs();
    setOpenSure(false);
  };

  return (
    <>
      <SureModal
        title="Are you shure delete this admin?"
        isOpen={openSure}
        closeModal={() => setOpenSure(false)}
        actionFn={deleteData}
      />
      <LangModal
        isOpen={openLangModal}
        closeModal={() => setOpenLangModal(false)}
        initialData={lang}
        id={ID}
        detaData={getAllLangs}
      />

      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold ">All languages</h3>
        <button
          type="button"
          onClick={createLang}
          className="outline-none border-0 bg-main-color text-white px-4 py-2 rounded-md"
        >
          Create new language
        </button>
      </div>

      {loading ? (
        <AdminLoader />
      ) : langs.length === 0 ? (
        <EmptyData title="Database is empty!" />
      ) : (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  id
                </th>
                <th scope="col" className="px-6 py-3">
                  name
                </th>
                <th scope="col" className="px-6 py-3">
                  actions
                </th>
              </tr>
            </thead>
            <tbody>
              {langs.map((lang) => (
                <tr
                  key={lang.id + "baa"}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
                >
                  <td scope="row" className="px-6 py-4">
                    {lang.id}
                  </td>
                  <td scope="row" className="px-6 py-4">
                    <b className="text-gray-600">{lang.name}</b>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex gap-x-2">
                      <CiEdit
                        onClick={() => editData(lang)}
                        className="text-green-500 text-lg cursor-pointer"
                      />
                      <IoTrashOutline
                        onClick={() => openDeleteModal(lang)}
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

export default LanguagePage;
