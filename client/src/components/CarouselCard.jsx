import React from "react";
import Trailer from "./Trailer";
import { useState } from "react";
import ModalVideo from "react-modal-video";
export default function CarouselCard({
  title,
  image,
  stretchedA,
  rowTitle,
  episodeNum,
  id,
  trailerVideoId,
  setIsPlaying,
  setTrailerId,
}) {
  return (
    <>
      <div
        onClick={(e) => {
          e.preventDefault();
          setTrailerId(trailerVideoId);
          setIsPlaying(true);
        }}
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
