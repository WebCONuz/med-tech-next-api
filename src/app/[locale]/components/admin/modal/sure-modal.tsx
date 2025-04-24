import React from "react";
import ModalBase from "../modal-base";

const SureModal = ({
  title,
  isOpen,
  closeModal,
  actionFn,
}: Readonly<{
  title: string;
  isOpen: boolean;
  closeModal: () => void;
  actionFn: () => void;
}>) => {
  return (
    <ModalBase isOpen={isOpen} closeModal={closeModal} classes="w-1/3">
      <h3 className="text-lg font-bold text-gray-700 mb-4">{title}</h3>
      <div className="flex gap-x-2">
        <button
          onClick={closeModal}
          className="outline-none border-0 bg-gray-500 text-white px-4 py-2 rounded-md"
        >
          Cancel
        </button>
        <button
          onClick={actionFn}
          className="outline-none border-0 bg-green-600 text-white px-4 py-2 rounded-md"
        >
          Yes
        </button>
      </div>
    </ModalBase>
  );
};

export default SureModal;
