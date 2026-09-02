import React, { useState } from "react";

import { ModalContext } from "../shared/contexts/modalContext";

const ModalProvider = ({ children }) => {
  const [modalJSX, setModalJSX] = useState(null);

  const openModal = (jsx) => {
    setModalJSX(jsx);
  };

  const closeModal = () => {
    setModalJSX(null);
  };

  const value = {
    isModalOpen: modalJSX !== null,
    openModal,
    closeModal,
  };

  return (
    <ModalContext value={value}>
      {children}

      {modalJSX && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          {modalJSX}
        </div>
      )}
    </ModalContext>
  );
};

export default ModalProvider;