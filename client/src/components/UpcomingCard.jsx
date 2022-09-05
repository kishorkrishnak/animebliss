import React from "react";

export default function CarouselCard({
  title,
  image,

  rowTitle,
  episodeNum,
  id,
}) {
  return (
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
          height: "240px",
          width: "430px",
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
          console.log("Anime title clicked");
        }}
        href="/"
        className="anime-card-title"
        style={{ color: "white", fontWeight: "lighter" }}
      >
        {title}
      </a>
    </div>
  );
}
