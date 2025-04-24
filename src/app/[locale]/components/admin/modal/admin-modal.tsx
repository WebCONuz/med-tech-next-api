import React, { useEffect, useState } from "react";
import ModalBase from "../modal-base";
import { adminType } from "@/app/[locale]/admin/user/all/page";
import axiosInstance from "@/lib/axios";

interface adminForm {
  name: string;
  email: string;
  password: string;
}
// props structure
interface AdminModalProps {
  isOpen: boolean;
  closeModal: () => void;
  initialData?: adminType;
  id: number;
  getAll: () => void;
}

const AdminModal = ({
  isOpen,
  closeModal,
  initialData,
  id,
  getAll,
}: AdminModalProps) => {
  // form values
  const [formData, setFormData] = useState<adminForm>({
    name: "",
    email: "",
    password: "",
  });

  // close & reset modal
  const reset = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
    });

    closeModal();
  };

  // handle translations input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(formData);

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // CREATE & UPDATE LOGIC
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (initialData && id) {
      const res = await axiosInstance.patch(`/api/admin/${id}`, formData); // UPDATE LOGIC
      if (res.status === 200) {
        getAll();
      } else if (res.status === 403) {
        alert("You do not have permission for this right.");
      }
    } else {
      const res = await axiosInstance.post(
        "/api/auth/admin-resgister",
        formData
      ); // CREATE LOGIC
      if (res.status === 200) {
        getAll();
      } else if (res.status === 403) {
        alert("You do not have permission for this right.");
      }
    }

    reset();
  };

  // pill data for update
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        email: initialData.email,
        password: "",
      });
    } else {
      setFormData({
        name: "",
        email: "",
        password: "",
      });
    }
  }, [initialData]);

  return (
    <ModalBase isOpen={isOpen} closeModal={reset} classes="w-1/2">
      <h3 className="text-lg font-bold text-main-color mb-4 uppercase text-center">
        {initialData ? "Update admin" : "Create admin"}
      </h3>
      <form className="block" onSubmit={handleSubmit}>
        <label className="flex flex-col w-full mb-3">
          <span className="text-sm text-gray-500 mb-1">Admin name</span>
          <input
            type="text"
            onChange={handleChange}
            value={formData.name ?? ""}
            className="w-full p-2 border rounded-md"
            required={!initialData}
          />
        </label>
        <label className="flex flex-col w-full mb-3">
          <span className="text-sm text-gray-500 mb-1">Admin email</span>
          <input
            type="email"
            onChange={handleChange}
            value={formData.email ?? ""}
            className="w-full p-2 border rounded-md"
            required={!initialData}
          />
        </label>
        <label className="flex flex-col w-full mb-3">
          <span className="text-sm text-gray-500 mb-1">
            {initialData ? "New password" : "Password"}
          </span>
          <input
            type="password"
            onChange={handleChange}
            value={formData.password ?? ""}
            className="w-full p-2 border rounded-md"
            required={!initialData}
          />
        </label>

        <div className="flex justify-end gap-x-2 mt-4">
          <button
            onClick={reset}
            type="button"
            className="outline-none border-0 bg-gray-500 text-white px-4 py-2 rounded-md"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="outline-none border-0 bg-green-600 text-white px-4 py-2 rounded-md"
          >
            {initialData ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </ModalBase>
  );
};

export default AdminModal;
