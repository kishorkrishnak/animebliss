import { StarFilled } from "@ant-design/icons";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import TextTruncate from "react-text-truncate";
import { SharedStateContext } from "../../App.jsx";
import "./AnimeCard.css";
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

        {title && (
          <a href={`/watch/${id}`} className="animecard-title">
            <TextTruncate
              text={
                typeof title === "string"
                  ? title
                  : title.english || title.romaji
              }
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
