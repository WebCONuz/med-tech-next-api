"use client";
import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { IoTrashOutline } from "react-icons/io5";
import SureModal from "@/app/[locale]/components/admin/modal/sure-modal";
import ProductModal from "@/app/[locale]/components/admin/modal/product-modal";
import Pagination from "@/app/[locale]/components/ui/pagination";
import EmptyData from "@/app/[locale]/components/ui/empty-data";
import AdminLoader from "@/app/[locale]/components/ui/admin-loader";
import { AdminProductItem, LangType } from "@/types/product.types";
import { deleteProduct, getAdminProducts } from "@/lib/product";
import { ILang } from "@/types/lang.types";
import axiosInstance from "@/lib/axios";

const productColumns: string[] = [
  "id",
  "name",
  "images",
  "categoryName",
  "description",
];

const ProductsPage = () => {
  const [openSure, setOpenSure] = useState(false);
  const [ID, setID] = useState<number>(0);
  const [openProductModal, setOpenProductModal] = useState(false);
  const [product, setProduct] = useState<AdminProductItem>();
  const [productReal, setProductReal] = useState<AdminProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  // pagination
  const [page, setPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const limit = 10;
  // lang & category
  const [langs, setLangs] = useState<ILang[]>([]);
  const [categories, setCategories] = useState<ILang[]>([]);

  // get langs & category
  const getLangs = async () => {
    const res = await axiosInstance.get("/api/language");
    if (res.status === 200) setLangs(res.data.data);
  };
  const getCategories = async () => {
    const res = await axiosInstance.get("/api/category");
    if (res.status === 200) {
      const availableCategories = res.data.data.map((item: any) => {
        const translation = item.translations.find(
          (i: LangType) => i.languageId === 1
        );
        return {
          id: item.id,
          name: translation.name,
        };
      });
      setCategories(availableCategories);
    }
  };
  useEffect(() => {
    getLangs();
    getCategories();
  }, []);

  const editData = (data: AdminProductItem) => {
    setProduct({ ...data, num: Math.random() });
    setID(data.id);
    setOpenProductModal(true);
  };

  const createProduct = () => {
    setProduct(undefined);
    setOpenProductModal(true);
  };

  const openDeleteModal = (data: AdminProductItem) => {
    setProduct(data);
    setOpenSure(true);
  };

  // get products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await getAdminProducts(page, limit);
      setProductReal(res.data);
      setTotalProducts(res.total);
    } catch (error) {
      console.error("Mahsulotlarni olishda xatolik:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, [page]);

  const deleteData = async () => {
    try {
      await deleteProduct(product?.id);
      fetchProducts();
    } catch (error) {
      console.error("O'chirishda xatolik:", error);
    } finally {
      setOpenSure(false);
    }
  };

  // pagination
  const handlePageChange = ({ selected }: { selected: number }) => {
    setPage(selected + 1);
  };
  const pageCount = Math.ceil(totalProducts / limit);

  return (
    <>
      <SureModal
        title="Are you shure delete this product?"
        isOpen={openSure}
        closeModal={() => setOpenSure(false)}
        actionFn={deleteData}
      />
      <ProductModal
        isOpen={openProductModal}
        closeModal={() => setOpenProductModal(false)}
        initialData={product}
        langs={langs}
        categories={categories}
        getAll={fetchProducts}
        id={ID}
      />

      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold ">All products</h3>
        <button
          onClick={createProduct}
          type="submit"
          className="outline-none border-0 bg-main-color text-white px-4 py-2 rounded-md"
        >
          Create new product
        </button>
      </div>

      {loading ? (
        <AdminLoader />
      ) : productReal.length === 0 ? (
        <EmptyData title="No products have been added to the database yet." />
      ) : (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                {productColumns.map((title) => (
                  <th key={title + "abc"} scope="col" className="px-6 py-3">
                    {title}
                  </th>
                ))}
                <th scope="col" className="px-6 py-3">
                  <p className="text-end">Actions</p>
                </th>
              </tr>
            </thead>
            <tbody>
              {productReal.map((product) => (
                <tr
                  key={product.id}
                  className="bg-white border-b border-gray-200"
                >
                  <td scope="row" className="px-4 py-2">
                    {product.id}
                  </td>
                  <td scope="row" className="px-4 py-2">
                    <b className="text-gray-600">
                      {product?.translations?.[0].name}
                    </b>
                  </td>
                  <td scope="row" className="px-4 py-2">
                    <div className="w-14 p-2 rounded-md shadow-md border border-gray-200">
                      <img
                        src={
                          "https://api.berlinmed-export.com/" + product?.images
                        }
                        className="w-full"
                      />
                    </div>
                  </td>
                  <td scope="row" className="px-4 py-2">
                    {product?.category?.translations?.[0].name}
                  </td>
                  <td scope="row" className="px-4 py-2">
                    <p className="max-w-[350px]">
                      {product?.translations?.[0].description}
                    </p>
                  </td>

                  <td className="px-4 py-2 text-right">
                    <div className="flex gap-x-2 justify-end">
                      <CiEdit
                        onClick={() => editData(product)}
                        className="text-green-500 text-lg cursor-pointer"
                      />
                      <IoTrashOutline
                        onClick={() => openDeleteModal(product)}
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

      {pageCount > 1 && (
        <Pagination
          pageCount={pageCount}
          currentPage={page}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
};

export default ProductsPage;
