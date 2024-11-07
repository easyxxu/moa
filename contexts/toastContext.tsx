"use client";

import { createContext, useState, useContext, useCallback } from "react";
import Toast from "@/components/common/Toast";

type ToastType = "ERROR" | "INFO" | "SUCCESS" | "WARNING";

interface ToastContextProps {
  openToast: (params: { type: ToastType; content: string }) => void;
}

const ToastContext = createContext<ToastContextProps>({
  openToast: () => {},
});

interface ToastProviderProps {
  children: React.ReactNode;
}

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [toastProps, setToastProps] = useState<{
    type: ToastType;
    content: string;
  } | null>(null);

  const openToast = useCallback(
    (params: { type: ToastType; content: string }) => {
      setToastProps(params);
      setIsOpen(true);
    },
    []
  );

  const closeToast = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <ToastContext.Provider value={{ openToast }}>
      {isOpen && toastProps && <Toast onClose={closeToast} {...toastProps} />}
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within a ToastProvider");
  return context;
};
