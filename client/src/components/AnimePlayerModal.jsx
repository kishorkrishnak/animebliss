import React, { useState } from "react";
import ReactDOM from "react-dom";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import HlsPLayer from "./HlsPlayer";
const AnimePlayerModal = ({ url }) => {
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  return (
    <div>
      <button onClick={onOpenModal}>Open modal</button>
      <Modal
        classNames={{
          modal: "customModal",
        }}
        open={open}
        onClose={onCloseModal}
        center
      >
        <HlsPLayer></HlsPLayer>
      </Modal>
    </div>
  );
};

export default AnimePlayerModal;
