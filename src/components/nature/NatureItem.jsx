import React from "react";
import { useModal } from "../../shared/contexts/modalContext";
import NatureItemModal from "./NatureItemModal";

const NatureItem = ({ item }) => {
  const { openModal } = useModal();

  return (
    <div
      type="button"
      aria-label={`Open nature photo ${item.id}`}
      className="block w-full h-full squircle-25 overflow-hidden cursor-pointer border-0 p-0"
      onClick={() => openModal(<NatureItemModal item={item} />)}
    >
      <img
        src={item.webformatURL}
        alt={`Nature photo ${item.id}`}
        loading="lazy"
        decoding="async"
        width={item.webformatWidth}
        height={item.webformatHeight}
        className="w-full h-full object-cover shadow-lg"
      />
    </div>
  );
};

export default NatureItem;
