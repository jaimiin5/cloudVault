/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
import { Card, CardBody, CardFooter, Button, Image } from "@nextui-org/react";
import ConfirmModal from "./modal/ConfirmModal";
import { UseReload } from "../context/ReloadContext";
import { FileModal } from "./modal/FileModal";

export function FileCard({ file }) {
  // modal state
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isFileModalOpen, setIsFileModalOpen] = useState(false);

  const [isDeleting, setIsDeleting] = useState(false);

  const { triggerReload } = UseReload();

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/files/delete/${file.file_id}`
      );
      // Handle success (e.g., trigger file list refresh)

      console.log("File deleted successfully");
      triggerReload();
    } catch (error) {
      console.error("Failed to delete file:", error);
    }
    setIsDeleting(false);
    setIsConfirmModalOpen(false); // Close the modal after delete
  };

  // handle modal for the confirm Delete
  const handleDeleteModalOpen = () => {
    setIsConfirmModalOpen(true);
  };

  const handleDeleteModalClose = () => {
    setIsConfirmModalOpen(false);
  };

  // handle modal for File modal
  const handleFileModalOpen = () => {
    setIsFileModalOpen(true);
  };

  const handleFileModalClose = () => {
    setIsFileModalOpen(false);
  };

  return (
    <Card
      className="rounded-lg bg-black "
      isPressable
      onPress={handleFileModalOpen}
    >
      <CardBody className="p-10 bg-[#1d1d1d]">
        <Image
          isZoomed
          src={`${import.meta.env.VITE_API_URL}/${file.file_path}`}
          className="w-full aspect-video"
          style={{ border: "none" }}
          loading="lazy"
        />
      </CardBody>
      <CardFooter className="flex flex-col items-start bg-[#0A0A0A] text-white">
        <h3 className="font-semibold text-lg text-left truncate w-full">
          <a
            href={`${import.meta.env.VITE_API_URL}/${file.file_path}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            {file.filename}
          </a>
        </h3>
        <p className="text-sm text-gray-500">
          Uploaded on {new Date(file.date).toLocaleDateString()}
        </p>
        <Button
          color="danger"
          onPress={handleDeleteModalOpen}
          disabled={isDeleting}
          className="mt-2"
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </Button>
      </CardFooter>

      {/* confirmation delete */}
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        handleDelete={handleDelete}
        onClose={handleDeleteModalClose}
      />
      <FileModal
        isOpen={isFileModalOpen}
        onClose={handleFileModalClose}
        file={file}
      />
    </Card>
  );
}
