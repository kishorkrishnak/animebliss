import { useEffect, useState } from "react";
import TextTruncate from "react-text-truncate";
import axios from "axios";
import MoonLoader from "react-spinners/MoonLoader";

export default function CarouselCard({
  setAnimeInfo,

  onOpenModal,
  title,
  image,
  rowTitle,
  episodeNum,
  type = "",
  rating,
  id,
}) {
  const override = {
    position: "fixed",
    zIndex: 1,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,

    margin: "auto",

    borderColor: "red",
  };
  useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowSize(window.innerWidth);
      console.log(windowSize);
    });
  });
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const [videoIsLoading, setVideoIsLoading] = useState(false);

  const calculateSize = (windowSize) => {
    if (windowSize > 1700) return [340, 230];
    else if (windowSize > 1600 && windowSize < 1700) return [230, 360];
    else if (windowSize > 1300 && windowSize < 1600) return [200, 310];
    else if (windowSize >= 800 && windowSize < 1300) return [180, 270];
    else if (windowSize >= 475 && windowSize < 800 && type!=="reco") {
      
      return [230, 225];
    } else if (windowSize >= 475 && windowSize < 800 && type==="reco") {
      return [100,140]
    }
    else if (windowSize >= 440 && windowSize < 475) return [130, 210];
    else if (windowSize >= 420 && windowSize < 440) return [130, 185];
    else if (windowSize >= 390 && windowSize < 420) return [110, 175];
    else if (windowSize >= 360 && windowSize < 390) return [110, 165];
    else return [90, 150];
  };

  async function fetchVideo(id) {
    setVideoIsLoading(true);
    return await axios
      .get("https://consumet-api.herokuapp.com/meta/anilist/info/" + id)
      .then((res) => {
        setAnimeInfo(res.data);
        onOpenModal();
        setVideoIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  return (
    <>
      {videoIsLoading && (
        <MoonLoader
          color={"white"}
          loading={videoIsLoading}
          cssOverride={override}
          size={80}
        />
      )}
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
