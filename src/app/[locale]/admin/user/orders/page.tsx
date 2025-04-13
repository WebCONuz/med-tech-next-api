"use client";
import React, { useState } from "react";
import { IoTrashOutline } from "react-icons/io5";
import { productType } from "../products/page";
import SureModal from "@/app/[locale]/components/admin/modal/sure-modal";

interface OrderType {
  id: number;
  productId: number;
  company: string;
  phone: string;
  email: string;
  type: string;
  title: string;
  content: string;
  code: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  product: productType;
}
const realOrders: OrderType[] = [
  {
    id: 1,
    productId: 1,
    company: "Acme Corp",
    phone: "+1-202-555-0143",
    email: "user@example.com",
    type: "bulk",
    title: "Office Chairs Order",
    content: "Need 50 ergonomic chairs delivered by May.",
    code: 1234,
    status: "START",
    createdAt: "2025-04-09T15:19:48.200Z",
    updatedAt: "2025-04-09T15:19:48.200Z",
    product: {
      id: 1,
      categoryId: 1,
      createdAt: "2025-04-08T20:38:13.298Z",
      updatedAt: "2025-04-08T20:38:13.298Z",
      images: "f5c0c3d8-6e74-4f82-aa87-84d33bde1a47.svg",
      translations: [
        {
          id: 1,
          name: "Stethoscope",
          description: "Used to listen to heartbeats and lung sounds",
          languageId: 1,
          productId: 1,
        },
        {
          id: 2,
          name: "Stetoskop",
          description: "Yurak va o‘pka tovushlarini eshitish uchun ishlatiladi",
          languageId: 2,
          productId: 1,
        },
        {
          id: 3,
          name: "Стетоскоп",
          description:
            "Используется для прослушивания сердечных и легочных звуков",
          languageId: 3,
          productId: 1,
        },
      ],
    },
  },
  {
    id: 2,
    productId: 1,
    company: "Acme Corp",
    phone: "+1-202-555-0143",
    email: "user@example.com",
    type: "bulk",
    title: "Office Chairs Order",
    content: "Need 50 ergonomic chairs delivered by May.",
    code: 1234,
    status: "START",
    createdAt: "2025-04-09T15:19:48.200Z",
    updatedAt: "2025-04-09T15:19:48.200Z",
    product: {
      id: 1,
      categoryId: 1,
      createdAt: "2025-04-08T20:38:13.298Z",
      updatedAt: "2025-04-08T20:38:13.298Z",
      images: "f5c0c3d8-6e74-4f82-aa87-84d33bde1a47.svg",
      translations: [
        {
          id: 1,
          name: "Stethoscope",
          description: "Used to listen to heartbeats and lung sounds",
          languageId: 1,
          productId: 1,
        },
        {
          id: 2,
          name: "Stetoskop",
          description: "Yurak va o‘pka tovushlarini eshitish uchun ishlatiladi",
          languageId: 2,
          productId: 1,
        },
        {
          id: 3,
          name: "Стетоскоп",
          description:
            "Используется для прослушивания сердечных и легочных звуков",
          languageId: 3,
          productId: 1,
        },
      ],
    },
  },
  {
    id: 3,
    productId: 1,
    company: "Acme Corp",
    phone: "+1-202-555-0143",
    email: "user@example.com",
    type: "bulk",
    title: "Office Chairs Order",
    content: "Need 50 ergonomic chairs delivered by May.",
    code: 1234,
    status: "START",
    createdAt: "2025-04-09T15:19:48.200Z",
    updatedAt: "2025-04-09T15:19:48.200Z",
    product: {
      id: 1,
      categoryId: 1,
      createdAt: "2025-04-08T20:38:13.298Z",
      updatedAt: "2025-04-08T20:38:13.298Z",
      images: "f5c0c3d8-6e74-4f82-aa87-84d33bde1a47.svg",
      translations: [
        {
          id: 1,
          name: "Stethoscope",
          description: "Used to listen to heartbeats and lung sounds",
          languageId: 1,
          productId: 1,
        },
        {
          id: 2,
          name: "Stetoskop",
          description: "Yurak va o‘pka tovushlarini eshitish uchun ishlatiladi",
          languageId: 2,
          productId: 1,
        },
        {
          id: 3,
          name: "Стетоскоп",
          description:
            "Используется для прослушивания сердечных и легочных звуков",
          languageId: 3,
          productId: 1,
        },
      ],
    },
  },
];

const OrderPage = () => {
  const [openSure, setOpenSure] = useState(false);
  const [orderId, setOrderId] = useState<number>();

  const openDeleteModal = (id: number) => {
    setOrderId(id);
    setOpenSure(true);
  };

  const deleteData = () => {
    console.log(`Order is Deleted: ${orderId}`);
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
    </>
  );
};

export default OrderPage;
