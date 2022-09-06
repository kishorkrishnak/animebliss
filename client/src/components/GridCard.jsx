import { useState, useEffect } from "react";
export default function GridCard({
  title,
  image,
  episodeNum,
  year,
  score,
  results,
}) {
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  const calculateSize = (windowSize) => {
    if (windowSize > 1500) return [380, 280];
    else if (windowSize < 1500 && windowSize > 1168) return [250, 210];
    else if (windowSize > 350 && windowSize < 800) return [250, 225];
    else return [250, 200];
  };
  useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowSize(window.innerWidth);
      console.log(windowSize);
    });
  });
  const [data, setData] = useState(results);
  return (
    <div
      className="gridcard-wrapper"
      style={{
        display: "flex",
        marginTop: "20px",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      <div
        style={{
          borderRadius: "15px",
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
      <div className="gridcardinfo">
        <p>{score}</p>
      </div>

      <h4
        className="grid-card-title"
        style={{
          textAlign: "center",
          color: "white",
          fontWeight: "lighter",
          marginTop: 8,
        }}
      >
        {title}
      </h4>
    </div>
  );
}
