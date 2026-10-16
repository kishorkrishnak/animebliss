import React, { useState } from "react";
import {
  CalendarOutlined,
  ClockCircleOutlined,
  PlayCircleFilled,
  HeartFilled,
  HeartOutlined,
  StarFilled,
} from "@ant-design/icons";
import { faListOl } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { isInWatchlist, addToWatchlist, removeFromWatchlist } from "../../services/storage";
import toast from "react-hot-toast";
import "./HeroCard.css";

const HeaderCarouselCard = ({
  duration,
  cover,
  image,
  title,
  id,
  year,
  description,
  epcount,
  rating,
  spotlightIndex = 1,
  seasonLabel,
}) => {
  const navigate = useNavigate();
  const [inWatchlist, setInWatchlist] = useState(() => isInWatchlist(id));

  const displayTitle = typeof title === "object" ? title?.english || title?.romaji || "Untitled Anime" : title || "Untitled Anime";

  const cleanDescription = (desc) => {
    if (!desc) return "No description available.";
    return desc
      .substring(
        0,
        desc.indexOf("(") === -1 ? desc.length : desc.indexOf("(")
      )
      .replaceAll(/<\/?[\w\s]*>|<.+[\W]>/g, "");
  };

  const handleWatchlistToggle = (e) => {
    e.preventDefault();
    if (inWatchlist) {
      removeFromWatchlist(id);
      setInWatchlist(false);
      toast.success("Removed from Watchlist");
    } else {
      addToWatchlist({
        id,
        title: typeof title === "object" ? title : { english: displayTitle, romaji: displayTitle },
        image: cover || image,
        rating,
        releaseDate: year,
        totalEpisodes: epcount,
      });
      setInWatchlist(true);
      toast.success("Added to Watchlist!");
    }
  };

  const bgImage = cover || image || "https://placehold.co/1920x800/10121a/8b5cf6?text=AnimeBliss";

  return (
    <div
      className="herocard-wrapper"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      <div className="herocard-content">
        <div className="herocard-spotlight-badge">
          <span className="spotlight-dot"></span>
          <span>SPOTLIGHT #{spotlightIndex} {seasonLabel ? `• ${seasonLabel}` : "• THIS SEASON"}</span>
        </div>

        <h1 className="herocard-title" title={displayTitle}>
          {displayTitle}
        </h1>

        <div className="herocard-badges">
          <span className="hero-badge badge-tv">TV</span>
          {epcount && (
            <span className="hero-badge">
              <FontAwesomeIcon icon={faListOl} /> {epcount} EP
            </span>
          )}
          {duration && (
            <span className="hero-badge">
              <ClockCircleOutlined /> {duration}m
            </span>
          )}
          {year && (
            <span className="hero-badge">
              <CalendarOutlined /> {year}
            </span>
          )}
          {rating && (
            <span className="hero-badge badge-rating">
              <StarFilled style={{ color: "#fbbf24" }} /> {(rating / 10).toFixed(1)}
            </span>
          )}
          <span className="hero-badge badge-quality">HD</span>
        </div>

        <p className="herocard-description">
          {cleanDescription(description)}
        </p>

        <div className="herocard-actions">
          <button
            onClick={() => navigate(`/watch/${id}`)}
            className="hero-btn-watch"
          >
            <PlayCircleFilled style={{ fontSize: "1.2rem" }} />
            <span>Watch Now</span>
          </button>

          <button
            onClick={handleWatchlistToggle}
            className={`hero-btn-watchlist ${inWatchlist ? "active" : ""}`}
            title={inWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
          >
            {inWatchlist ? (
              <>
                <HeartFilled style={{ color: "#ec4899" }} />
                <span>In Watchlist</span>
              </>
            ) : (
              <>
                <HeartOutlined />
                <span>Add to Watchlist</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeaderCarouselCard;
