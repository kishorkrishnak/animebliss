import { useContext } from "react";
import TextTruncate from "react-text-truncate";
import { SharedStateContext } from "../../App.jsx";
import { StarFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./AnimeCard.css";
import React from "react";
const CarouselCard = ({ title, image, episodeNumber, id, rating, year }) => {
  const navigate = useNavigate();
  const SharedState = useContext(SharedStateContext);
  async function fetchVideo(id) {
    SharedState.setVideoIsLoading(true);
    navigate("/watch/" + id);
  }
  return (
    <>
      <div
        style={{ marginTop: rating ? 16 : "" }}
        onClick={() => {
          fetchVideo(id);
        }}
        className="animecard-wrapper"
      >
        <div
          className="animecard-card"
          style={{
            backgroundImage: `url(${image})`,
          }}
        >
          {rating && (
            <div className="animecard-starcontainer">
              <StarFilled />
              <span style={{ color: "white" }}>{rating / 10}</span>
            </div>
          )}
        </div>
        {episodeNumber > 0 && (
          <h5 className="animecard-epnumber">Episode {episodeNumber}</h5>
        )}
        {title && (
          <a href={`/watch/${id}`} className="animecard-title">
            <TextTruncate
              text={title.english || title.romaji}
              line={2}
            ></TextTruncate>
          </a>
        )}
        {year && <p className="animecard-year">{year}</p>}
      </div>
    </>
  );
};
export default CarouselCard;
