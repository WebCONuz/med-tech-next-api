import React from "react";

const AdminLoader = () => {
  return (
    <div className="w-full h-[60vh] flex items-center justify-center rounded-md bg-main-bg">
      <div className="w-10 h-10 rounded-full border-3 border-main-color border-l-0 animate-spin"></div>
    </div>
  );
};

export default AdminLoader;
