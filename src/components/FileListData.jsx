import React, { useState, useEffect } from "react";
import axios from "axios";
import FileModal from "./modals/FileModal";
import ConfirmationModal from "./modals/ConfirmationModal";
import useForceUpdate from "./hooks/useForceUpdate";
import NoData from "./NoData";

const FileListData = () => {
  const [files, setFiles] = useState([]);
  const [activeUserId, setActiveUserId] = useState();
  const [searchValue, setSearchValue] = useState("");
  const [error, setError] = useState("");

  // <<<<<<Modals>>>>>>
  const [isconfirmModal, setIsConfirmModal] = useState(false); // for opening and closing
  const [confirmDeleteValue, setConfirmDeleteValue] = useState(false); // for deleting item
  const [fileIdToDelete, setFileIdToDelete] = useState(null); // Store the file ID to delete

  // <<<<<<reload state>>>>>>>>>
  const [reload, setReload] = useState(false);

  //<---- pagination state----->
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [totalPages, setTotalPages] = useState(30); // Total pages based on length and limit
  const [limit, setLimit] = useState(5);
  const [length, setLength] = useState(null);

  // Range of items displayed
  const startIndex = (currentPage - 1) * limit + 1;
  const endIndex = Math.min(currentPage * limit, length);

  // Calculate pages to be displayed

  // Calculate total pages whenever length or limit changes
  useEffect(() => {
    const totalPages = Math.ceil(length / limit);
    setTotalPages(totalPages);
  }, [length, limit]);

  const fetchFiles = async () => {
    const params = {
      page: currentPage,
      limit: 5,
    };
    try {
      const res = await axios.get(
        `http://127.0.0.1:5000/api/files/${activeUserId}`,
        { params }
      );
      setFiles(res.data.files);
      setLimit(res.data.limit);
      setCurrentPage(res.data.page);
      setLength(res.data.length);
    } catch (err) {
      setError("Error fetching files: " + err.message);
    }
  };

  // Fetch files whenever currentPage or reload state changes
  useEffect(() => {
    if (activeUserId) {
      fetchFiles();
    } else {
      setFiles([]);
    }
  }, [activeUserId]); // Removed `activeUserId` to prevent unnecessary re-renders


  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // Handle Previous and Next buttons
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  
  const handleCheck = (e) => {
    console.log(e.target);
  };

  const filterFiles = files.filter((file) =>
    file.filename.toLowerCase().includes(searchValue.toLowerCase())
  );
  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const handleRemove = (fileId) => {
    setFileIdToDelete(fileId); // Set the file ID to delete
    setIsConfirmModal(true); // Show the confirmation modal
  };

  // <<<< delete operation >>>>>
  const handleDeleteFile = async () => {
    try {
      await axios.delete(
        `http://127.0.0.1:5000/api/files/delete/${fileIdToDelete}`
      );
      setReload(!reload);
    } catch (err) {
      setError("Error Deleting files: " + err.message);
    } finally {
      setConfirmDeleteValue(true);
      setIsConfirmModal(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2);

    return `${day}/${month}/${year}`;
  };

  return (
    <>
      {files.length > 0 ? (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg m-10">
          {/* Search functionality */}
          <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-end mr-12 pb-4">
            <label htmlFor="table-search" className="sr-only">
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                value={searchValue}
                onChange={handleSearch}
                type="text"
                id="table-search"
                className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search for items"
              />
            </div>
          </div>

          {/* Table file data */}
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  File
                </th>
                <th scope="col" className="px-6 py-3">
                  File name
                </th>
                <th scope="col" className="px-6 py-3">
                  File Path
                </th>
                <th scope="col" className="px-6 py-3">
                  Upload date
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filterFiles.map((file, i) => (
                <tr
                  key={i}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-6 py-4">
                    <iframe
                      src={`http://127.0.0.1:5000/${file.file_path}`}
                      width="800px"
                      height="400px"
                      style={{ border: 2 }}
                      loading="lazy"
                      allowFullScreen
                    ></iframe>
                  </td>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <a
                      href={`http://127.0.0.1:5000/${file.file_path}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline text-blue-600"
                    >
                      {file.filename}
                    </a>
                  </th>
                  <td className="px-6 py-4">{file.file_path}</td>
                  <td className="px-6 py-4">{formatDate(file.date)}</td>
                  <td className="px-6 py-4">
                    <button
                      className="font-medium text-red-600 dark:text-blue-500 hover:underline"
                      onClick={() => handleRemove(file.file_id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <nav className="flex items-center flex-column flex-wrap md:flex-row justify-between p-4">
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
              Showing{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                {startIndex}-{endIndex}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                {length}
              </span>
            </span>

            <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
              <li>
                <button
                  onClick={handlePrevious}
                  className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Previous
                </button>
              </li>
              {pageNumbers.map((page) => (
                <li key={page}>
                  <a
                    onClick={() => handlePageChange(page)}
                    className={`flex items-center justify-center px-3 h-8 leading-tight ${
                      page === currentPage
                        ? "text-white bg-blue-500 border-blue-500"
                        : "text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    }`}
                  >
                    {page}
                  </a>
                </li>
              ))}
              <li>
                <button
                  onClick={handleNext}
                  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>

          <ConfirmationModal
            isconfirmModal={isconfirmModal}
            setIsConfirmModal={setIsConfirmModal}
            confirmDeleteValue={confirmDeleteValue}
            setConfirmDeleteValue={setConfirmDeleteValue}
            title="Are you sure you want to delete this file?"
            actionLabel="Yes, delete it"
            cancelLabel="No, cancel"
            onConfirmAction={handleDeleteFile}
          />
        </div>
      ) : (
        <div className="flex justify-center items-center w-full pl-60 mt-40">
          <NoData />
        </div>
      )}
    </>
  );
};

export default FileListData;
