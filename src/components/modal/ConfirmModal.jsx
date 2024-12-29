/* eslint-disable react/prop-types */
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";

export default function ConfirmModal({ isOpen, handleDelete, onClose }) {
  return (
    <Modal
      backdrop="opaque"
      isOpen={isOpen}
      onClose={onClose}
      motionProps={{
        variants: {
          enter: {
            y: 0,
            opacity: 1,
            transition: {
              duration: 0.3,
              ease: "easeOut",
            },
          },
          exit: {
            y: -20,
            opacity: 0,
            transition: {
              duration: 0.2,
              ease: "easeIn",
            },
          },
        },
      }}
    >
      <ModalContent>
        <ModalHeader>Confirm Delete</ModalHeader>
        <ModalBody>
          <p>Are you sure you want to delete this file?</p>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={onClose}>
            Cancel
          </Button>
          <Button color="primary" onPress={handleDelete}>
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
