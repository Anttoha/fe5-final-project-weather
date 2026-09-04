import React, { useEffect, useState } from "react";

import { ModalContext } from "../shared/contexts/modalContext";

const ModalProvider = ({ children }) => {
  const [modalJSX, setModalJSX] = useState(null);

  const openModal = (jsx) => {
    setModalJSX(jsx);
  };

  const closeModal = () => {
    setModalJSX(null);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeModal]);

  const value = {
    isModalOpen: modalJSX !== null,
    openModal,
    closeModal,
  };

  return (
    <ModalContext value={value}>
      {children}

      {modalJSX && (
        <div
          className="fixed inset-0 z-20 flex items-center justify-center bg-black/50 p-4"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              closeModal();
            }
          }}
        >
          {modalJSX}
        </div>
      )}
    </ModalContext>
  );
};

export default ModalProvider;
