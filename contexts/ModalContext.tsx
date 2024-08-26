"use client";

import Modal from "@/components/common/modal/Modal";
import { createContext, useContext, useEffect, useState } from "react";

interface ModalContextType {
  showModal: (params: {
    type: "CONFIRM" | "MODIFY" | "QUANTITY";
    content: string;
    onConfirm:
      | ((quantity: number) => void)
      | ((quantity: number) => Promise<void>);
    onCancelAction?: () => void;
    quantity?: number;
  }) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalProps, setModalProps] = useState<any>({});
  const [onCancel, setOnCancel] = useState<() => void>(() => {});

  const showModal = (params: {
    type: "CONFIRM" | "MODIFY" | "QUANTITY";
    content: string;
    onConfirm:
      | ((quantity: number) => void)
      | ((quantity: number) => Promise<void>);
    onCancelAction?: () => void;
    quantity?: number;
  }) => {
    let { onCancelAction, ...modalProps } = params;
    setModalProps({ ...params });
    setOnCancel(() => onCancelAction);
    setModalVisible(true);
  };

  const closeModal = () => {
    onCancel && onCancel();
    setModalVisible(false);
  };

  useEffect(() => {
    if (modalVisible) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [modalVisible]);
  return (
    <ModalContext.Provider value={{ showModal, closeModal }}>
      {modalVisible && <Modal onCancel={closeModal} {...modalProps} />}
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error("useModal must be used within a ModalProvider");
  return context;
};
