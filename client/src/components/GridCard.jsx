import { useState, useEffect } from "react";
import axios from "axios";
export default function GridCard({
  title,
  image,
  episodeNum,
  year,
  rating,
  setAnimeInfo,
  onOpenModal,
  id,
  results,
}) {
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  async function fetchVideo(id) {
    return await axios
      .get("https://consumet-api.herokuapp.com/meta/anilist/info/" + id)
      .then((res) => {
        setAnimeInfo(res.data);
        onOpenModal();
      })
      .catch((e) => {
        console.log(e);
      });
  }
  const calculateSize = (windowSize) => {
    if (windowSize > 1500) return [380, 280];
    else if (windowSize > 1168 && windowSize < 1500) return [250, 210];
    else if (windowSize > 450 && windowSize < 1168) return [250, 225];
    else if (windowSize > 380 && windowSize < 450) return [230, 175];
    else if (windowSize > 360 && windowSize < 380) return [230, 165];
    else if (windowSize >= 475 && windowSize < 1168) return [230, 225];
    else if (windowSize >= 440 && windowSize < 475) return [230, 210];
    else if (windowSize >= 420 && windowSize < 440) return [225, 185];
    else if (windowSize >= 390 && windowSize < 420) return [225, 175];
    else if (windowSize >= 360 && windowSize < 390) return [220, 165];
    else return [230, 150];
  };
  useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowSize(window.innerWidth);
    });
  });
  const [data, setData] = useState(results);
  return (
    <div
      className="gridcard-wrapper"
      onClick={() => {
        fetchVideo(id);
      }}
      style={{
        display: "flex",
        marginTop: "20px",
        flexDirection: "column",
        alignItems: "center",
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
      {rating && year && (
        <div
          style={{ display: "flex", gap: 10, marginTop: 8 }}
          className="gridcardinfo"
        >
          <p style={{ color: "white", fontSize: "1.35rem" }}>{year}</p>
          <p style={{ color: "white", fontSize: "1.35rem" }}>
            Rating: {rating}
          </p>
        </div>
      )}

      <h4
        className="grid-card-title"
        style={{
          textAlign: "center",
          color: "white",
          fontWeight: "lighter",
        }}
      >
        {title}
      </h4>
    </div>
  );
}
