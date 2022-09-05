import { useEffect,useState } from "react";
import TextTruncate from "react-text-truncate";

export default function CarouselCard({
  title,
  image,
  rowTitle,
  episodeNum,
  id,
}) {
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
            height: "340px",
            width: "230px",
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
