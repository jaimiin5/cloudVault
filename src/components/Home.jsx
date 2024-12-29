import { useState } from "react";
import { Card, CardBody, CardHeader, Button } from "@nextui-org/react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

export default function Home() {
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
      toast.error("Please select a file first!!");
      return;
    }

    const formData = new FormData();
    formData.append("file", fileData);
    formData.append("activeUserId", localStorage.getItem("activeUserId"));

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/upload`,
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
    <div className="w-full flex flex-col items-center justify-center ">
      {/* Welcome Card */}
      <Card className="w-1/3 mb-10 bg-[#0A0A0A] text-white">
        <CardHeader>
          <h1 className="text-3xl font-bold text-center font-mono">
            Welcome to Your File Manager
          </h1>
        </CardHeader>
        <CardBody>
          <p className="text-center text-sm font-mono text-gray-500">
            You can upload and manage your files here. Simply click or drag and
            drop files to upload them.
          </p>
        </CardBody>
      </Card>

      {/* File Upload Card */}
      <Card className="bg-[#0A0A0A] text-white">
        <CardBody>
          <div className="flex items-center justify-center w-96 mb-4">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-[#1d1d1d] hover:bg-gray-900"
            >
              <div className="flex flex-col items-center justify-center w-auto pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500"
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
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                onChange={handleFileChange}
                multiple
              />
            </label>
          </div>

          {fileData && (
            <p className="text-sm text-gray-500 mt-4">
              <strong>Selected file:</strong> {fileData.name} (Size:{" "}
              {fileData.size} bytes, Type: {fileData.type})
            </p>
          )}

          {/* Upload Button */}
          <Button
            type="submit"
            color="primary"
            className="w-full mt-4"
            onPress={handleFileSubmit}
          >
            Upload File
          </Button>
        </CardBody>
      </Card>

      {/* Toaster for notifications */}
      <Toaster position="top-right" />
    </div>
  );
}
