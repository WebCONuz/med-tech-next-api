import React, { useEffect, useState } from "react";
import ModalBase from "../modal-base";
import { langType } from "../../../admin/user/lang/page";

// props structure
interface LangModalProps {
  isOpen: boolean;
  closeModal: () => void;
  initialData?: langType;
}

const LangModal = ({ isOpen, closeModal, initialData }: LangModalProps) => {
  // form values
  const [formData, setFormData] = useState<string>("");

  // pill data for update
  useEffect(() => {
    if (initialData) {
      setFormData(initialData.name);
    }
  }, [initialData]);

  // close & reset modal
  const reset = () => {
    setFormData("");
    closeModal();
  };

  // handle translations input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(e.target.value);
  };

  // CREATE & UPDATE LOGIC
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (initialData) {
      console.log("Update: ", { id: initialData.id, name: formData }); // UPDATE LOGIC
    } else {
      console.log("Create: ", formData); // CREATE LOGIC
    }
    reset();
  };

  return (
    <ModalBase isOpen={isOpen} closeModal={reset} classes="w-1/2">
      <h3 className="text-lg font-bold text-main-color mb-4 uppercase text-center">
        {initialData ? "Update new langugage" : "Create new langugage"}
      </h3>
      <form className="block" onSubmit={handleSubmit}>
        <label className="flex flex-col w-full mb-3">
          <span className="text-sm text-gray-500 mb-1">Language</span>
          <input
            type="text"
            onChange={handleChange}
            value={formData}
            className="w-full p-2 border rounded-md"
            required
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

export default LangModal;
