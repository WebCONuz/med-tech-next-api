"use client";
import React, { useEffect, useState } from "react";
import { IoTrashOutline } from "react-icons/io5";
import SureModal from "@/app/[locale]/components/admin/modal/sure-modal";
import AdminLoader from "@/app/[locale]/components/ui/admin-loader";
import EmptyData from "@/app/[locale]/components/ui/empty-data";
import Pagination from "@/app/[locale]/components/ui/pagination";
import axiosInstance from "@/lib/axios";

type contactType = {
  id: number;
  name: string;
  email: string;
  message: string;
};

const ContactPage = () => {
  const [openSure, setOpenSure] = useState(false);
  const [contactId, setContactId] = useState<number>();
  const [contacts, setContacts] = useState<contactType[]>([]);
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
      const res = await axiosInstance.get("/api/contact", {
        params: {
          page,
          limit,
        },
      });
      setContacts(res.data.data.data);
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
    setContactId(id);
    setOpenSure(true);
  };

  const deleteData = async () => {
    console.log(`Contact is Deleted: ${contactId}`);
    const res = await axiosInstance.delete(`/api/contact/${contactId}`);
    if (res.status === 200) await getData();
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

      {loading ? (
        <AdminLoader />
      ) : contacts.length === 0 ? (
        <EmptyData title="Empty data" />
      ) : (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
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
                  className="bg-white border-b border-gray-200"
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

export default ContactPage;
