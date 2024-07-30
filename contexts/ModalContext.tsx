"use client";

import Modal from "@/components/common/Modal";
import { createContext, useContext, useState } from "react";

interface ModalContextType {
  showModal: (content: string, onConfirm: () => void) => void;
  closeModal: () => void;
}
const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [onConfirm, setOnConfirm] = useState<() => void>(() => {});

  const showModal = (content: string, confirm: () => void) => {
    setModalContent(content);
    setOnConfirm(() => confirm);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <ModalContext.Provider value={{ showModal, closeModal }}>
      {modalVisible && (
        <Modal
          content={modalContent}
          onConfirm={onConfirm}
          onCancel={closeModal}
        />
      )}
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error("useModal must be used within a ModalProvider");
  return context;
};
