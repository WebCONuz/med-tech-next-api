"use client";
import React, { useEffect, useState } from "react";
import { IoTrashOutline } from "react-icons/io5";
import SureModal from "@/app/[locale]/components/admin/modal/sure-modal";
import Pagination from "@/app/[locale]/components/ui/pagination";
import AdminLoader from "@/app/[locale]/components/ui/admin-loader";
import EmptyData from "@/app/[locale]/components/ui/empty-data";
import { OrderItem } from "@/types/order.types";
import axiosInstance from "@/lib/axios";

const OrderPage = () => {
  const [openSure, setOpenSure] = useState(false);
  const [orderId, setOrderId] = useState<number>();
  const [realOrders, setRealOrders] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);
  // paginate
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState(1);
  const limit = 10;
  const pageCount = Math.ceil(total / limit);

  const handlePageChange = ({ selected }: { selected: number }) => {
    setPage(selected + 1);
  };

  const getData = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/api/order", {
        params: {
          page,
          limit,
        },
      });
      setRealOrders(res.data.data.data);
      setTotal(res.data.data.total);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, [page]);

  const openDeleteModal = (id: number) => {
    setOrderId(id);
    setOpenSure(true);
  };

  const deleteData = async () => {
    console.log(`Order is Deleted: ${orderId}`);
    const res = await axiosInstance.delete(`/api/order/${orderId}`);
    if (res.status === 200) await getData();
    setOpenSure(false);
  };

  return (
    <>
      <SureModal
        title="Are you shure delete this order?"
        isOpen={openSure}
        closeModal={() => setOpenSure(false)}
        actionFn={deleteData}
      />

      <h3 className="text-xl font-bold mb-4">All Orders</h3>

      {loading ? (
        <AdminLoader />
      ) : realOrders.length === 0 ? (
        <EmptyData title="Empty data" />
      ) : (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-3 py-3">
                  id
                </th>
                <th scope="col" className="px-3 py-3">
                  Product
                </th>
                <th scope="col" className="px-3 py-3">
                  company
                </th>
                <th scope="col" className="px-3 py-3">
                  phone
                </th>
                <th scope="col" className="px-3 py-3">
                  email
                </th>
                <th scope="col" className="px-3 py-3">
                  type
                </th>
                <th scope="col" className="px-3 py-3">
                  title
                </th>
                <th scope="col" className="px-3 py-3">
                  content
                </th>
                <th scope="col" className="px-3 py-3">
                  code
                </th>
                <th scope="col" className="px-3 py-3">
                  status
                </th>
                <th scope="col" className="px-3 py-3">
                  create
                </th>
                <th scope="col" className="px-3 py-3">
                  <p className="text-end">Actions</p>
                </th>
              </tr>
            </thead>
            <tbody>
              {realOrders.map((order) => (
                <tr
                  key={order.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
                >
                  <td scope="row" className="px-3 py-4">
                    {order?.id}
                  </td>
                  <td scope="row" className="px-3 py-4">
                    {order?.product?.translations?.[0]?.name}
                  </td>
                  <td scope="row" className="px-3 py-4">
                    <p className="w-[100px]">{order?.company}</p>
                  </td>
                  <td scope="row" className="px-3 py-4">
                    <p className="w-[120px]">{order?.phone}</p>
                  </td>
                  <td scope="row" className="px-3 py-4">
                    {order?.email}
                  </td>
                  <td scope="row" className="px-3 py-4">
                    {order?.type}
                  </td>
                  <td scope="row" className="px-3 py-4">
                    <p className="w-[150px]">{order?.title}</p>
                  </td>
                  <td scope="row" className="px-3 py-4">
                    <p className="w-[250px]">{order?.content}</p>
                  </td>
                  <td scope="row" className="px-3 py-4">
                    {order?.code}
                  </td>
                  <td scope="row" className="px-3 py-4">
                    {order?.status}
                  </td>
                  <td scope="row" className="px-3 py-4">
                    <p className="w-[120px]">
                      {order?.createdAt?.slice(0, 10)}{" "}
                      <b>{order?.createdAt?.slice(11, 16)}</b>
                    </p>
                  </td>

                  <td className="px-3 py-4 text-right">
                    <div className="flex justify-center">
                      <IoTrashOutline
                        onClick={() => openDeleteModal(order?.id)}
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

export default OrderPage;
