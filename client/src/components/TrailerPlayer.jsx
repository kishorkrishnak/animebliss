import ModalVideo from "react-modal-video";
import "react-modal-video/scss/modal-video.scss";

export default function TrailerPlayer({ trailerId, isPlaying, setIsPlaying }) {
  return (
    <ModalVideo
      channel="youtube"
      autoplay
      isOpen={isPlaying}
      videoId={trailerId}
      onClose={() => setIsPlaying(false)}
    />
  );
}
