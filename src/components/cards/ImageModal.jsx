import React, { useState } from "react";
import '../styling/modal.css'

const ImageModal = ({ artwork }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="modal">

      <img
        src={artwork?.image}
        alt={artwork?.title}
        id="art-image"
        onClick={openModal}
      />

      {isOpen && (
        <div
          onClick={closeModal}
          className="opened-modal"
        >
          <img
            src={artwork?.image}
            alt={artwork?.title}
            className="modal-image"
          />
        </div>
      )}
      <p>(click image to enlarge)</p>
    </div>
  );
};

export default ImageModal;
