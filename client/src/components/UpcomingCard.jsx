import { useEffect, useState } from "react";
import TextTruncate from "react-text-truncate";

export default function UpcomingCard({
  title,
  image,

  rowTitle,
  episodeNum,
  trailerVideoId,
  setIsPlaying,
  setTrailerId,
  id,
}) {
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowSize(window.innerWidth);
    });
  });

  const calculateSize = (windowSize) => {
    if (windowSize > 1750) return [240, 430];
    else if (windowSize > 1600 && windowSize < 1850) return [230, 360];
    else if (windowSize > 1300 && windowSize < 1600) return [200, 310];
    else if (windowSize > 800 && windowSize < 1300) return [180, 270];
    else if (windowSize > 350 && windowSize < 800) return [130, 225];

    else return [130, 200];
  };
  return (
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
          height: calculateSize(windowSize)[0],
          width: calculateSize(windowSize)[1],
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
        <TextTruncate text={title} line={2}></TextTruncate>
      </a>
    </div>
  );
}
