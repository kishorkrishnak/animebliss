import React from "react";
import Trailer from "./Trailer";
import { useState } from "react";
import ModalVideo from "react-modal-video";
import "react-modal-video/scss/modal-video.scss";
export default function CarouselCard({
  title,
  image,
  stretchedA,
  rowTitle,
  episodeNum,
  id,
  trailerVideoId,
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const playTrailer = () => {
    setIsPlaying(true);
  };
  const [trailerId, setTrailerId] = useState(trailerVideoId);
  return (
    <>
     <ModalVideo
        style={{ background: "red" }}
        channel="youtube"
        autoplay
        isOpen={isPlaying}
        videoId={trailerId}
        onClose={() => setIsPlaying(false)}
      />
    <div
      className="animecard-wrapper"
      style={{
        display: "flex",

        flexDirection: "column",
        alignItems: "center",
        height: "fit-content",

        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <div
        style={{
          borderRadius: "10px",
          backgroundImage: `url(${image})`,
          height: stretchedA ? "340px" : "240px",
          width: stretchedA ? "230px" : "430px",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      ></div>

      {episodeNum > 0 && (
        <h5 style={{ color: "white", fontWeight: "lighter" }}>
          Episode {episodeNum}
        </h5>
      )}

      <a
        onClick={(e) => {
          e.preventDefault();
          playTrailer();
        }}
        href="/"
        className="anime-card-title"
        style={{ color: "white", fontWeight: "lighter" }}
      >
        {title}
      </a>
     
    </div>

    </>
  );
}
