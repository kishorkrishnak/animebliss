import { useState } from "react";
import ModalVideo from "react-modal-video";
import "react-modal-video/scss/modal-video.scss";

export default function Trailer({ trailerId }) {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <ModalVideo
        style={{ background: "red" }}
        channel="youtube"
        autoplay
        isOpen={isOpen}
        videoId={trailerId}
        onClose={() => setOpen(false)}
      />

      <button className="btn-primary" onClick={() => setOpen(true)}>
        VIEW DEMO
      </button>
    </>
  );
}
