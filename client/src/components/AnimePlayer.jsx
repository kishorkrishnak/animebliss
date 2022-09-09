import ShakaPlayer from "shaka-player-react";
import "shaka-player-react/dist/controls.css";
import Select from "react-select";
import { useEffect, useState } from "react";
import TextTruncate from "react-text-truncate";
import axios from "axios";
import CarouselRenderer from "./CarouselRenderer";
const AnimePlayer = ({ animeInfo, onOpenModal }) => {
  const [anime, setAnime] = useState(animeInfo);
  const [allEpisodes, setAllEpisodes] = useState(animeInfo.episodes);
  const [epcount, setEpCount] = useState(animeInfo.episodes.length);
  const [selectedOption, setSelectedOption] = useState({ value: 1, label: 1 });
  let [currentStreamUrl, setCurrentStreamUrl] = useState(null);
  const [currentId, setCurrentId] = useState(allEpisodes[0].id);
  const options = [];
  const selectStyles = {
    menuList: (styles) => {
      return {
        ...styles,
        maxHeight: 180,
      };
    },
  };

  async function fetchVideoById(url) {
    return await axios.get(url).then((response) => {
      console.log("hello");
      console.log(response);
      setCurrentStreamUrl(response.data.sources[1].url);
    });
  }

  const changeStream = () => {
    setCurrentId(allEpisodes[selectedOption.value - 1].id);
  };

  useEffect(() => {
    fetchVideoById(
      " https://consumet-api.herokuapp.com/meta/anilist/watch/" + currentId
    );
  }, [currentId]);

  useEffect(() => {
    changeStream();
  }, [selectedOption]);
  for (let i = 1; i <= epcount; i++) {
    options.push({
      value: i,
      label: i,
    });
  }
  let regexeddescription = anime.description.replaceAll(
    /<\/?[\w\s]*>|<.+[\W]>/g,
    ""
  );
  regexeddescription = regexeddescription.substring(
    0,
    regexeddescription.indexOf("("),
    4
  );

  return (
    <>
      {currentStreamUrl !== null && (
        <>
          <ShakaPlayer autoPlay src={currentStreamUrl} />

          <div
            className="curranime"
            style={{ height: "100%", padding: 30, backgroundColor: "#10141e" }}
          >
            <h2 style={{ color: "red" }}>{animeInfo.title.english}</h2>
            <div
              className="curranimeinfo"
              style={{ marginTop: 5, display: "flex", gap: 25 }}
            >
              <span style={{ color: "white" }} className="curranime-platform">
                TV Show
              </span>
              <span style={{ color: "white" }} className="curranime-score">
                Rating: {anime.rating}
              </span>
              <span style={{ color: "white" }} className="curranime-epaired">
                Episodes Aired: {anime.episodes.length}
              </span>
              <span
                style={{ color: "white" }}
                className="curranime-releaseyear"
              >
                {anime.releaseDate}
              </span>
              <span style={{ color: "white" }} className="curranime-status">
                {anime.status}
              </span>
            </div>

            <form style={{ marginTop: 10 }}>
              <div style={{ width: 100 }}>
                <Select
                  defaultValue={selectedOption}
                  onChange={setSelectedOption}
                  options={options}
                  styles={selectStyles}
                />
              </div>
            </form>
            <h3 style={{ color: "red", marginTop: 10 }}>Summary</h3>
            <p style={{ textAlign: "justify", color: "white" }}>
              <TextTruncate
                text={regexeddescription}
                line={window.innerWidth < 800 ? 4 : 8}
              ></TextTruncate>
            </p>
            <br />
            <h4 style={{ color: "red" }}>
              Genres:&nbsp;
              <span style={{ color: "white" }}>{anime.genres.join(", ")}</span>
            </h4>
            <h4 style={{ color: "red" }}>
              Studios:&nbsp;
              <span style={{ color: "white" }}>{anime.studios.join(", ")}</span>
            </h4>

            <h4 style={{ color: "red" }}>Adapation: </h4>

            <h4 style={{ color: "red" }}>Sequel: </h4>

            <br />
            <div className="recommendations">
              <h3 style={{ color: "red" }}>Recommendations</h3>

              <CarouselRenderer
                type={"reco"}
                finalQuery={anime.recommendations}
                stretchedA={true}
              ></CarouselRenderer>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AnimePlayer;
