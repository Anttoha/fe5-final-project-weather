import React from "react";
import { useModal } from "../../shared/contexts/modalContext";
import { X } from "lucide-react";

const NatureItemModal = ({ item }) => {
  const { closeModal } = useModal();

  return (
    <div className="w-full max-w-3xl min-h-50 relative">
      <div className="squircle-50 bg-white overflow-hidden">
        <img
          src={item.largeImageURL}
          alt={`Nature ${item.id}`}
          className="max-h-[80vh] w-full object-contain"
        />
      </div>

      <button
        type="button"
        aria-label="Close image"
        className="squircle-50 absolute right-0 -top-12 z-20 flex h-10 w-10 cursor-pointer items-center justify-center bg-white shadow-md transition-all
 hover:bg-brand hover:text-white
 active:scale-90"
        onClick={closeModal}
      >
        <X />
      </button>
    </div>
  );
};

export default NatureItemModal;
