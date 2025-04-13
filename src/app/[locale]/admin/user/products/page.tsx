"use client";
import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { IoTrashOutline } from "react-icons/io5";
import SureModal from "@/app/[locale]/components/admin/modal/sure-modal";
import ProductModal from "@/app/[locale]/components/admin/modal/product-modal";

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
}
interface TranslationType {
  id: number;
  name: string;
  description: string;
  languageId: number;
  productId: number;
}
interface LangType {
  id: number;
  name: string;
  languageId: number;
  categoryId: number;
}
export interface productType {
  id: number;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
  images: string;
  num?: number;
  Order?: OrderType[];
  translations: TranslationType[];
  category?: {
    translations: LangType[];
  };
}
const productReal: productType[] = [
  {
    id: 1,
    categoryId: 1,
    createdAt: "2025-04-08T20:38:13.298Z",
    updatedAt: "2025-04-08T20:38:13.298Z",
    images: "f5c0c3d8-6e74-4f82-aa87-84d33bde1a47.svg",
    Order: [
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
      },
    ],
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
    category: {
      translations: [
        {
          id: 1,
          name: "Diagnostic Tools",
          languageId: 1,
          categoryId: 1,
        },
        {
          id: 2,
          name: "Diagnostika asboblari",
          languageId: 2,
          categoryId: 1,
        },
        {
          id: 3,
          name: "Диагностические инструменты",
          languageId: 3,
          categoryId: 1,
        },
      ],
    },
  },
  {
    id: 2,
    categoryId: 1,
    createdAt: "2025-04-08T20:38:42.871Z",
    updatedAt: "2025-04-08T20:38:42.871Z",
    images: "e9273ca1-1f6c-4ece-94c3-7a5f3a4da6f7.svg",
    Order: [],
    translations: [
      {
        id: 4,
        name: "Otoscope",
        description: "Used to examine the ear canal and eardrum",
        languageId: 1,
        productId: 2,
      },
      {
        id: 5,
        name: "Otoskop",
        description:
          "Tashqi quloq kanali va tympanumni tekshirish uchun ishlatiladi",
        languageId: 2,
        productId: 2,
      },
      {
        id: 6,
        name: "Отоскоп",
        description:
          "Используется для осмотра слухового прохода и барабанной перепонки",
        languageId: 3,
        productId: 2,
      },
    ],
    category: {
      translations: [
        {
          id: 1,
          name: "Diagnostic Tools",
          languageId: 1,
          categoryId: 1,
        },
        {
          id: 2,
          name: "Diagnostika asboblari",
          languageId: 2,
          categoryId: 1,
        },
        {
          id: 3,
          name: "Диагностические инструменты",
          languageId: 3,
          categoryId: 1,
        },
      ],
    },
  },
  {
    id: 3,
    categoryId: 1,
    createdAt: "2025-04-08T20:38:55.967Z",
    updatedAt: "2025-04-08T20:38:55.967Z",
    images: "97fd17c2-d29b-40a6-9fe5-f676f61cfa30.svg",
    Order: [],
    translations: [
      {
        id: 7,
        name: "Blood Test Kit",
        description:
          "Used for conducting blood tests for different medical conditions",
        languageId: 1,
        productId: 3,
      },
      {
        id: 8,
        name: "Qon tahlil to‘plami",
        description:
          "Turli tibbiy holatlarni tekshirish uchun qon tahlilini o‘tkazish uchun ishlatiladi",
        languageId: 2,
        productId: 3,
      },
      {
        id: 9,
        name: "Набор для анализа крови",
        description:
          "Используется для проведения анализов крови при различных заболеваниях",
        languageId: 3,
        productId: 3,
      },
    ],
    category: {
      translations: [
        {
          id: 1,
          name: "Diagnostic Tools",
          languageId: 1,
          categoryId: 1,
        },
        {
          id: 2,
          name: "Diagnostika asboblari",
          languageId: 2,
          categoryId: 1,
        },
        {
          id: 3,
          name: "Диагностические инструменты",
          languageId: 3,
          categoryId: 1,
        },
      ],
    },
  },
  {
    id: 4,
    categoryId: 2,
    createdAt: "2025-04-08T20:39:17.868Z",
    updatedAt: "2025-04-08T20:39:17.868Z",
    images: "03e7e5e4-380f-4dfa-8286-f548faacf59e.svg",
    Order: [],
    translations: [
      {
        id: 10,
        name: "Scalpel",
        description: "A small, sharp blade used in surgery for cutting tissues",
        languageId: 1,
        productId: 4,
      },
      {
        id: 11,
        name: "Skalpel",
        description:
          "Jarrohlikda to‘qimalarni kesish uchun ishlatiladigan kichik va o'tkir pichoq",
        languageId: 2,
        productId: 4,
      },
      {
        id: 12,
        name: "Скальпель",
        description:
          "Маленький острый нож, используемый в хирургии для разрезания тканей",
        languageId: 3,
        productId: 4,
      },
    ],
    category: {
      translations: [
        {
          id: 4,
          name: "Surgical Instruments",
          languageId: 1,
          categoryId: 2,
        },
        {
          id: 5,
          name: "Jarrohlik asboblari",
          languageId: 2,
          categoryId: 2,
        },
        {
          id: 6,
          name: "Хирургические инструменты",
          languageId: 3,
          categoryId: 2,
        },
      ],
    },
  },
  {
    id: 5,
    categoryId: 2,
    createdAt: "2025-04-08T20:39:31.736Z",
    updatedAt: "2025-04-08T20:39:31.736Z",
    images: "c8f17027-a8a6-49c2-9c88-9d90fc3f84e9.svg",
    Order: [],
    translations: [
      {
        id: 13,
        name: "Forceps",
        description:
          "Used for grasping, holding, or manipulating tissues during surgery",
        languageId: 1,
        productId: 5,
      },
      {
        id: 14,
        name: "Pensa",
        description:
          "Jarrohlikda to‘qimalarni ushlash, ushlab turish yoki manipulyatsiya qilish uchun ishlatiladi",
        languageId: 2,
        productId: 5,
      },
      {
        id: 15,
        name: "Щипцы",
        description:
          "Используется для захвата, удержания или манипулирования тканями во время операции",
        languageId: 3,
        productId: 5,
      },
    ],
    category: {
      translations: [
        {
          id: 4,
          name: "Surgical Instruments",
          languageId: 1,
          categoryId: 2,
        },
        {
          id: 5,
          name: "Jarrohlik asboblari",
          languageId: 2,
          categoryId: 2,
        },
        {
          id: 6,
          name: "Хирургические инструменты",
          languageId: 3,
          categoryId: 2,
        },
      ],
    },
  },
  {
    id: 6,
    categoryId: 2,
    createdAt: "2025-04-08T20:39:46.341Z",
    updatedAt: "2025-04-08T20:39:46.341Z",
    images: "662664df-d2a9-4888-bbf5-92e54718bb84.svg",
    Order: [],
    translations: [
      {
        id: 16,
        name: "Surgical Scissors",
        description:
          "Specialized scissors used for cutting tissues and sutures during surgery",
        languageId: 1,
        productId: 6,
      },
      {
        id: 17,
        name: "Jarrohlik qaychi",
        description:
          "Jarrohlikda to‘qimalar va tikuvlarni kesish uchun maxsus qaychi",
        languageId: 2,
        productId: 6,
      },
      {
        id: 18,
        name: "Хирургические ножницы",
        description:
          "Специализированные ножницы, используемые для разрезания тканей и швов во время операции",
        languageId: 3,
        productId: 6,
      },
    ],
    category: {
      translations: [
        {
          id: 4,
          name: "Surgical Instruments",
          languageId: 1,
          categoryId: 2,
        },
        {
          id: 5,
          name: "Jarrohlik asboblari",
          languageId: 2,
          categoryId: 2,
        },
        {
          id: 6,
          name: "Хирургические инструменты",
          languageId: 3,
          categoryId: 2,
        },
      ],
    },
  },
  {
    id: 7,
    categoryId: 3,
    createdAt: "2025-04-08T20:40:07.123Z",
    updatedAt: "2025-04-08T20:40:07.123Z",
    images: "0870a857-be90-4ed9-a6b3-6db7f0911059.svg",
    Order: [],
    translations: [
      {
        id: 19,
        name: "Nebulizer",
        description:
          "Device for inhalation therapy to treat respiratory conditions",
        languageId: 1,
        productId: 7,
      },
      {
        id: 20,
        name: "Nebulizator",
        description:
          "Respirator kasalliklarni davolash uchun inhalyatsiya terapiyasi qurilmasi",
        languageId: 2,
        productId: 7,
      },
      {
        id: 21,
        name: "Небулайзер",
        description:
          "Устройство для ингаляционной терапии для лечения респираторных заболеваний",
        languageId: 3,
        productId: 7,
      },
    ],
    category: {
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
  },
  {
    id: 8,
    categoryId: 3,
    createdAt: "2025-04-08T20:40:20.843Z",
    updatedAt: "2025-04-08T20:40:20.843Z",
    images: "2fae013b-ad0f-4660-a582-09bc40545f21.svg",
    Order: [],
    translations: [
      {
        id: 22,
        name: "Inhaler",
        description:
          "Device used to deliver medication directly into the lungs",
        languageId: 1,
        productId: 8,
      },
      {
        id: 23,
        name: "Ingalyator",
        description:
          "Dori vositasini to‘g‘ridan-to‘g‘ri o‘pkaga etkazish uchun ishlatiladigan qurilma",
        languageId: 2,
        productId: 8,
      },
      {
        id: 24,
        name: "Ингалятор",
        description:
          "Устройство, используемое для доставки лекарства непосредственно в легкие",
        languageId: 3,
        productId: 8,
      },
    ],
    category: {
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
  },
  {
    id: 9,
    categoryId: 3,
    createdAt: "2025-04-08T20:40:33.307Z",
    updatedAt: "2025-04-08T20:40:33.307Z",
    images: "aa0dca6f-8608-4173-9095-02b6bc67709f.svg",
    Order: [],
    translations: [
      {
        id: 25,
        name: "Heating Pad",
        description:
          "Used for applying heat therapy to relieve pain and muscle stiffness",
        languageId: 1,
        productId: 9,
      },
      {
        id: 26,
        name: "Isituvchi yostiqcha",
        description:
          "Og‘riqni va mushaklar qattiqligini kamaytirish uchun issiqlik terapiyasini qo‘llash uchun ishlatiladi",
        languageId: 2,
        productId: 9,
      },
      {
        id: 27,
        name: "Грелка",
        description:
          "Используется для применения тепловой терапии для облегчения боли и скованности мышц",
        languageId: 3,
        productId: 9,
      },
    ],
    category: {
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
  },
];
const productColumns: string[] = [
  "id",
  "name",
  "images",
  "categoryName",
  "description",
];

const ProductsPage = () => {
  const [openSure, setOpenSure] = useState(false);
  const [openProductModal, setOpenProductModal] = useState(false);
  const [product, setProduct] = useState<productType>();

  const editData = (data: productType) => {
    setProduct({ ...data, num: Math.random() });
    setOpenProductModal(true);
  };

  const createProduct = () => {
    setProduct(undefined);
    setOpenProductModal(true);
  };

  const openDeleteModal = (data: productType) => {
    setProduct(data);
    setOpenSure(true);
  };

  const deleteData = () => {
    console.log(`Product is Deleted: ${product?.id}`);
    setOpenSure(false);
  };

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

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
              >
                <td scope="row" className="px-6 py-4">
                  {product.id}
                </td>
                <td scope="row" className="px-6 py-4">
                  <b className="text-gray-600">
                    {product?.translations?.[0].name}
                  </b>
                </td>
                <td scope="row" className="px-6 py-4">
                  <img
                    src="https://cdn.farmako.in/inventory/images/976c7a23ee3e876a9505aa4c23e421ba7aa6d94e/ba727b5f2c522f13775a7b7f8c74065cf38929ea.png"
                    className="w-14 rounded-md shadow-md"
                  />
                </td>
                <td scope="row" className="px-6 py-4">
                  {product?.category?.translations?.[0].name}
                </td>
                <td scope="row" className="px-6 py-4">
                  <p className="max-w-[350px]">
                    {product?.translations?.[0].description}
                  </p>
                </td>

                <td className="px-6 py-4 text-right">
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
    </>
  );
};

export default ProductsPage;
