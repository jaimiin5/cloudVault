/* eslint-disable react/prop-types */
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";

export function FileModal({ isOpen, onClose, file }) {
  if (!file) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="5xl">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalBody>
              <div className="aspect-video w-full">
                <iframe
                  src={`${import.meta.env.VITE_API_URL}/${file.file_path}`}
                  // style={{ border: "none", overflow: "hidden" }}
                  // allowFullScreen
                  className="object-contain w-full h-full overflow-hidden"
                />
              </div>
              <p className="text-sm text-gray-500">
                Uploaded on {new Date(file.date).toLocaleDateString()}
              </p>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button
                color="primary"
                onPress={() =>
                  window.open(
                    `${import.meta.env.VITE_API_URL}/${file.file_path}`,
                    "_blank"
                  )
                }
              >
                Open in New Tab
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
