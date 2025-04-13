import React from "react";
import { MdClose } from "react-icons/md";

const ModalBase = ({
  classes,
  isOpen,
  closeModal,
  children,
}: Readonly<{
  classes: string | undefined;
  isOpen: boolean;
  closeModal: () => void;
  children: React.ReactNode;
}>) => {
  return (
    <div
      className={`fixed top-0 left-0 z-50 w-full h-screen flex justify-center items-center duration-200 ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      <div
        onClick={closeModal}
        className="absolute top-0 left-0 z-0 bg-[#000000ca] w-full h-full"
      ></div>
      <div
        className={`relative z-10 bg-white rounded-md p-5 py-4 overflow-y-auto max-h-[90vh] ${
          classes || ""
        }`}
      >
        <MdClose
          onClick={closeModal}
          className="absolute right-3 top-3 text-xl cursor-pointer"
        />
        {children}
      </div>
    </div>
  );
};

export default ModalBase;
