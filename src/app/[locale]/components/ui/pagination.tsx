"use client";
import React from "react";
import ReactPaginate from "react-paginate";

type Props = {
  pageCount: number;
  onPageChange: (selectedItem: { selected: number }) => void;
  currentPage: number;
};

const Pagination = ({ pageCount, onPageChange, currentPage }: Props) => {
  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel=">"
      onPageChange={onPageChange}
      pageRangeDisplayed={3}
      marginPagesDisplayed={2}
      pageCount={pageCount}
      previousLabel="<"
      containerClassName="flex items-center justify-center gap-2 mt-10"
      pageClassName="px-3 py-1 border rounded text-gray-700 cursor-pointer"
      activeClassName="bg-main-color text-white"
      forcePage={currentPage - 1}
    />
  );
};

export default Pagination;
