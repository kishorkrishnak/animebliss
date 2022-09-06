import { useEffect, useState } from "react";
import TextTruncate from "react-text-truncate";

export default function CarouselCard({
  title,
  image,
  rowTitle,
  episodeNum,
  rating,
  id,
}) {
  const calculateSize = (windowSize) => {
    if (windowSize > 1700) return [340, 230];
    else if (windowSize > 1600 && windowSize < 1850) return [230, 360];
    else if (windowSize > 1300 && windowSize < 1600) return [200, 310];
    else if (windowSize > 800 && windowSize < 1300) return [180, 270];
    else if (windowSize > 450 && windowSize < 800) return [130, 225];

    else return [130, 200];
  };
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowSize(window.innerWidth);
      console.log(windowSize);
    });
  });
  return (
    <>
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
          href="/"
          className="anime-card-title"
          style={{ color: "white", fontWeight: "lighter" }}
        >
         <TextTruncate text={title}
          
            line={2}
          ></TextTruncate>
        </a>
      </div>
    </>
  );
}
