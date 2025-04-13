"use client";
import React, { useState } from "react";
import { IoTrashOutline } from "react-icons/io5";
import SureModal from "@/app/[locale]/components/admin/modal/sure-modal";

type contactType = {
  id: number;
  name: string;
  email: string;
  message: string;
};

const contacts: contactType[] = [
  {
    id: 1,
    name: "Shaxa dolimov",
    email: "shaxa@gmail.com",
    message: "Lorem ipsum solir set amequet ametur colorados solomon ...",
  },
  {
    id: 2,
    name: "Jama olimov",
    email: "jamaa@gmail.com",
    message: "Lorem ipsum solir set ...",
  },
  {
    id: 3,
    name: "Kama solimov",
    email: "kama@gmail.com",
    message:
      "Lorem ipsum solir set amequet ametur colorados solomon wanterium daxalos teru killoma tarenium ...",
  },
];

const ContactPage = () => {
  const [openSure, setOpenSure] = useState(false);
  const [contactId, setContactId] = useState<number>();

  const openDeleteModal = (id: number) => {
    setContactId(id);
    setOpenSure(true);
  };

  const deleteData = () => {
    console.log(`Contact is Deleted: ${contactId}`);
    setOpenSure(false);
  };

  return (
    <>
      <SureModal
        title="Are you shure delete this contact?"
        isOpen={openSure}
        closeModal={() => setOpenSure(false)}
        actionFn={deleteData}
      />

      <h3 className="text-xl font-bold mb-4">All Contacts</h3>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                NAME
              </th>
              <th scope="col" className="px-6 py-3">
                EMAIL
              </th>
              <th scope="col" className="px-6 py-3">
                MESSAGE
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr
                key={contact.id + "aaa"}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
              >
                <td scope="row" className="px-6 py-4">
                  {contact.id}
                </td>
                <td scope="row" className="px-6 py-4">
                  <b className="text-gray-600">{contact.name}</b>
                </td>
                <td scope="row" className="px-6 py-4">
                  {contact.email}
                </td>
                <td scope="row" className="px-6 py-4">
                  <p className="max-w-[400px]">{contact.message}</p>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-center">
                    <IoTrashOutline
                      onClick={() => openDeleteModal(contact?.id)}
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

export default ContactPage;
