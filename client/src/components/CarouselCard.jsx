import { useEffect, useState, useContext } from "react";
import TextTruncate from "react-text-truncate";
import axios from "axios";
import ClockLoader from "react-spinners/ClockLoader";
import { SharedState } from "../App";

export default function CarouselCard({
  title,
  image,
  rowTitle,
  episodeNum,
  type = "",
  rating,
  id,
}) {
  const animestate = useContext(SharedState);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowSize(window.innerWidth);
    });
  });
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  const calculateSize = (windowSize) => {
    if (windowSize > 1700) return [340, 230];
    else if (windowSize > 1600 && windowSize < 1700) return [230, 360];
    else if (windowSize > 1300 && windowSize < 1600) return [200, 310];
    else if (windowSize >= 800 && windowSize < 1300) return [180, 270];
    else if (windowSize >= 475 && windowSize < 800 && type !== "reco") {
      return [230, 225];
    } else if (windowSize >= 475 && windowSize < 800 && type === "reco") {
      return [100, 140];
    } else if (windowSize >= 440 && windowSize < 475) return [130, 210];
    else if (windowSize >= 420 && windowSize < 440) return [130, 185];
    else if (windowSize >= 390 && windowSize < 420) return [110, 175];
    else if (windowSize >= 360 && windowSize < 390) return [110, 165];
    else return [90, 150];
  };

  async function fetchVideo(id) {
    animestate.setVideoIsLoading(true);
    animestate.setActive("nav__menu");
    animestate.setIcon("nav__toggler");
    return await axios
      .get("https://consumet-api.herokuapp.com/meta/anilist/info/" + id)
      .then((res) => {
        animestate.setAnimeInfo(res.data);
        animestate.onOpenModal();
        animestate.setVideoIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  return (
    <>
      <div
        onClick={() => {
          fetchVideo(id);
        }}
        className="animecard-wrapper"
        style={{
          display: "flex",
          marginTop: 5,
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
          style={{ color: "white", fontWeight: "lighter", marginTop: 5 }}
        >
          <TextTruncate text={title} line={2}></TextTruncate>
        </a>
      </div>
    </>
  );
}
