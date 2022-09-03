import {
  PlayCircleOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { faListOl } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import VideoPlayer from "./VideoPlayer";
import { useEffect, useState } from "react";
import React from "react";

setTimeout(() => {
  const cards = document.querySelectorAll(".animecard-wrapper");
  console.log(cards);
  Array.from(cards).forEach((card) => {
    card.addEventListener("click", () => {});
  });
}, 3000);
const streamapi = {
  enime: "https://consumet-api.herokuapp.com/meta/anilist/info/",
};
export default function AnimeCard({
  title,
  image,
  stretchedA,
  rowTitle,
  episodeNum,
  id,
  api,
}) {
  const [videoOn, setVideoOn] = useState(false);
  const [episodes, setEpisodes] = useState([]);
  const [genres, setGenres] = useState([]);
  const [studios, setStudios] = useState("");
  const [epcount, setEpcount] = useState(0);
  const [recos, setRecos] = useState([]);
  const [year, setYear] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("nill");
  const [doneLoading, setDoneLoading] = useState(false);
  useEffect(() => {
    if (rowTitle === "Trending") {
      fetch(streamapi.enime + id)
        .then((res) => res.json())
        .then((data) => {
          setEpisodes(data.episodes);

          setGenres(data.genres);
          setStudios(data.studios[0]);
          setEpcount(data.episodes.length);
          setRecos(data.recommendations);
          setYear(data.releaseDate);

          setCompleted(data.status === "Completed");
          let regexed = data.description.replaceAll(
            /<\/?[\w\s]*>|<.+[\W]>/g,
            ""
          );
          setDescription(regexed.substring(0, regexed.indexOf("(")));

          if (episodes.length > 0) {
            console.log("All episode details fetched");
            setDoneLoading(true);
          }
        });
    }
  }, []);

  const loadVideo = (e) => {
    e.preventDefault();

    fetch(
      "https://consumet-api.herokuapp.com/meta/anilist/watch/" + episodes[0].id
    )
      .then((res) => res.json())
      .then((data) => {
        setLink(link);
        console.log(link);
      });
  };
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

        paddingTop: 8,
      }}
    >
      <div
        style={{
          borderRadius: "10px",
          backgroundImage: `url(${image})`,
          height: stretchedA ? "340px" : "240px",
          width: stretchedA ? "230px" : "430px",
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
          loadVideo(e);
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
