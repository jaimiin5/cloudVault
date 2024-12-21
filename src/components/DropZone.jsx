import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "./Navbar";

const DropZone = () => {
  const [fileData, setFileData] = useState(null);
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    console.log(selectedFile);

    if (selectedFile) {
      setFileData(selectedFile);
    }
  };

  const handleFileSubmit = async () => {
    if (!fileData) {
      toast("Please select a file first");
      return;
    }

    const formData = new FormData();
    formData.append("file", fileData);
    formData.append("activeUserId", localStorage.getItem("activeUserId"));

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/upload",
        formData
      );

      console.log("File uploaded successfully:", response.data);
      toast.success("File uploaded successfully!");
      setFileData(null);
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Error uploading file. Please try again.");
    }
  };
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center mt-20">
        <Toaster />
        <div className="flex items-center justify-center w-9/12 rouded-lg">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG, PDF (Max file size: 10MB)
              </p>
            </div>
            <input
              name="file_url"
              onChange={handleFileChange}
              id="dropzone-file"
              type="file"
              className="hidden"
            />
          </label>
        </div>

        <div>
          {fileData && (
            <div>
              <h3>File Selected:</h3>
              <p>Name: {fileData.name}</p>
              <p>Size: {fileData.size} bytes</p>
              <p>Type: {fileData.type}</p>
            </div>
          )}
        </div>

        <button
          onClick={handleFileSubmit}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Upload File
        </button>
      </div>
    </>
  );
};

export default DropZone;
