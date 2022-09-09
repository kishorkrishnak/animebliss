import { useState, useEffect, useContext } from "react";
import axios from "axios";
import MoonLoader from "react-spinners/ClockLoader";
import { SharedState } from "../App";

export default function GridCard({
  title,
  image,
  episodeNum,
  year,
  rating,
  setAnimeInfo,
  onOpenModal,
  id,
  navstate,
  results,
}) {
  const animestate = useContext(SharedState);

  const [windowSize, setWindowSize] = useState(window.innerWidth);
  async function fetchVideo(id) {
    if (!navstate) {
      animestate.setVideoIsLoading(true);
      animestate.setActive("nav__menu");
      animestate.setIcon("nav__toggler");
    } else {
      navstate.setVideoIsLoading(true);
      navstate.setActive("nav__menu");
      navstate.setIcon("nav__toggler");
    }
    return await axios
      .get("https://consumet-api.herokuapp.com/meta/anilist/info/" + id)
      .then((res) => {
        if (!onOpenModal) {
          animestate.setAnimeInfo(res.data);

          animestate.setActive("nav__menu");
          animestate.onOpenModal();
        } else {
          setAnimeInfo(res.data);
          animestate.setActive("nav__menu");

          onOpenModal();
        }
        if (!navstate) {
          animestate.setVideoIsLoading(false);
        } else {
          navstate.setVideoIsLoading(false);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  const calculateSize = (windowSize) => {
    if (windowSize > 1500) return [380, 280];
    else if (windowSize > 1168 && windowSize < 1500) return [250, 210];
    else if (windowSize >= 800 && windowSize < 1300) return [180, 270];
    else if (windowSize >= 475 && windowSize < 800) return [230, 225];
    else if (windowSize >= 440 && windowSize < 475) return [230, 200];
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
  return (
    <>
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
    </>
  );
}
