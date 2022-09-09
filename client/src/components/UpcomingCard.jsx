import { useEffect, useState, useContext } from "react";
import TextTruncate from "react-text-truncate";


import { motion } from "framer-motion"
import { SharedState } from "../App";
const UpcomingCard = ({
  title,
  image,

  rowTitle,
  episodeNum,
  trailerVideoId,
  setIsPlaying,
  setTrailerId,
  id,
}) => {
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowSize(window.innerWidth);
    });
  });

  const navstate = useContext(SharedState);

  const calculateSize = (windowSize) => {
    if (windowSize > 1750) return [240, 430];
    else if (windowSize >= 1600 && windowSize < 1750) return [230, 360];
    else if (windowSize >= 1300 && windowSize < 1600) return [200, 310];
    else if (windowSize >= 800 && windowSize < 1300) return [180, 270];
    else if (windowSize >= 475 && windowSize < 800) return [130, 225];
    else if (windowSize >= 440 && windowSize < 475) return [130, 210];
    else if (windowSize >= 420 && windowSize < 440) return [130, 185];
    else if (windowSize >= 390 && windowSize < 420) return [110, 175];
    else if (windowSize >= 360 && windowSize < 390) return [110, 165];
    else return [90, 150];
  };
  return (
    <>
      <motion.div
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
          }}
          href="/"
          className="anime-card-title"
          style={{ color: "white", fontWeight: "lighter", marginTop: 5 }}
        >
          <TextTruncate text={title} line={2}></TextTruncate>
        </a>
    </motion.div>
    </>
  );
};

export default UpcomingCard;
