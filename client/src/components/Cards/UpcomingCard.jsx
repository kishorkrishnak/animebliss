import React, { useState } from "react";
import { YoutubeFilled, PlayCircleFilled } from "@ant-design/icons";
import "./UpcomingCard.css";

const UpcomingCard = ({
  title,
  image,
  trailerVideoId,
  setIsPlaying,
  setTrailerId,
}) => {
  const [imgLoaded, setImgLoaded] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    if (trailerVideoId) {
      setTrailerId(trailerVideoId);
      setIsPlaying(true);
    }
  };

  return (
    <div onClick={handleClick} className="upcomingcard-wrapper" title={title}>
      <div className="upcomingcard-poster-container">
        {!imgLoaded && <div className="upcomingcard-skeleton skeleton" />}
        <img
          src={image || "https://placehold.co/300x450/151824/8b5cf6?text=Upcoming"}
          alt={title}
          className={`upcomingcard-img ${imgLoaded ? "loaded" : "loading"}`}
          loading="lazy"
          onLoad={() => setImgLoaded(true)}
          onError={(e) => {
            e.target.src = "https://placehold.co/300x450/151824/8b5cf6?text=Upcoming";
            setImgLoaded(true);
          }}
        />

        <div className="upcomingcard-overlay">
          <div className="upcomingcard-play-btn">
            <PlayCircleFilled />
          </div>
        </div>

        <div className="upcomingcard-trailer-badge">
          <YoutubeFilled style={{ color: "#ef4444" }} />
          <span>Trailer</span>
        </div>
      </div>

      <div className="upcomingcard-info">
        <h4 className="upcomingcard-title">
          {title || "Untitled"}
        </h4>
      </div>
    </div>
  );
};

export default UpcomingCard;
