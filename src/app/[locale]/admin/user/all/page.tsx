"use client";
import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { IoTrashOutline } from "react-icons/io5";
import SureModal from "@/app/[locale]/components/admin/modal/sure-modal";
import AdminModal from "@/app/[locale]/components/admin/modal/admin-modal";
import AdminLoader from "@/app/[locale]/components/ui/admin-loader";
import axiosInstance from "@/lib/axios";

export type adminType = {
  id: number;
  name: string;
  email: string;
  password: string;
  is_creator: boolean;
  refresh_token: null | string;
  createdAt: string;
  updatedAt: string;
  num?: number;
};

const AdminPage = () => {
  const [openSure, setOpenSure] = useState<boolean>(false);
  const [isSuperAdmin, setIsSuperAdmin] = useState<boolean>(false);
  const [adminId, setAdminId] = useState<number>(0);
  const [admin, setAdmin] = useState<adminType>();
  const [openAdminModal, setOpenAdminModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [admins, setAdmins] = useState<adminType[]>([]);

  const getData = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/api/admin");
      if (res.status === 200) {
        setAdmins(res.data.data);
        setIsSuperAdmin(true);
      } else if (res.status === 403) {
        setIsSuperAdmin(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const editData = (data: adminType) => {
    console.log(data);

    setAdmin({ ...data, num: Math.random() });
    setOpenAdminModal(true);
  };
  const createAdmin = () => {
    setAdmin(undefined);
    setOpenAdminModal(true);
  };
  const openDeleteModal = (id: number) => {
    setAdminId(id);
    setOpenSure(true);
  };

  const deleteData = () => {
    console.log(`Contact is Deleted: ${adminId}`);
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
      <AdminModal
        isOpen={openAdminModal}
        closeModal={() => setOpenAdminModal(false)}
        initialData={admin}
        id={adminId}
        getAll={getData}
      />

      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold ">All admins</h3>
        <button
          onClick={createAdmin}
          type="submit"
          className="outline-none border-0 bg-main-color text-white px-4 py-2 rounded-md"
        >
          Create new admin
        </button>
      </div>

      {loading ? (
        <AdminLoader />
      ) : !isSuperAdmin ? (
        <div className="h-[50vh] w-full rounded-md bg-main-bg flex items-center justify-center">
          <span>You do not have permission for this right.</span>
        </div>
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
                  Role
                </th>
                <th scope="col" className="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin) => (
                <tr
                  key={admin.id + "baa"}
                  className="bg-white border-b border-gray-200"
                >
                  <td scope="row" className="px-6 py-4">
                    {admin.id}
                  </td>
                  <td scope="row" className="px-6 py-4">
                    <b className="text-gray-600">{admin.name}</b>
                  </td>
                  <td scope="row" className="px-6 py-4">
                    {admin.email}
                  </td>
                  <td scope="row" className="px-6 py-4">
                    {admin.is_creator ? (
                      <b className="text-green-500">Super Admin</b>
                    ) : (
                      <b className="text-gray-500">Admin</b>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex gap-x-2 justify-end">
                      <CiEdit
                        onClick={() => editData(admin)}
                        className="text-green-500 text-lg cursor-pointer"
                      />
                      <IoTrashOutline
                        onClick={() => openDeleteModal(admin?.id)}
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

export default AdminPage;
