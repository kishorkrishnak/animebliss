import React, { useState, useEffect } from "react";
import { PlayCircleFilled, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import TextTruncate from "react-text-truncate";
import { getWatchHistory, removeFromHistory } from "../../services/storage";
import "./ContinueWatching.css";

const ContinueWatching = () => {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    setHistory(getWatchHistory());
  }, []);

  const handleResume = (item) => {
    navigate(`/watch/${item.animeId}`);
  };

  const handleRemove = (e, animeId) => {
    e.stopPropagation();
    const updated = removeFromHistory(animeId);
    setHistory(updated);
  };

  if (!history || history.length === 0) return null;

  return (
    <section className="section section-continue-watching">
      <div className="continue-watching-header">
        <h2 className="section-title">Continue Watching</h2>
        <span className="history-count">{history.length} in progress</span>
      </div>

      <div className="continue-watching-grid">
        {history.slice(0, 6).map((item) => {
          const displayTitle =
            typeof item.title === "object"
              ? item.title?.english || item.title?.romaji || "Untitled"
              : item.title || "Untitled";

          return (
            <div
              key={item.animeId}
              className="continue-card"
              onClick={() => handleResume(item)}
            >
              <div className="continue-poster-wrapper">
                <img
                  src={item.image || "https://placehold.co/300x180/151824/8b5cf6?text=AnimeBliss"}
                  alt={displayTitle}
                  className="continue-img"
                  onError={(e) => {
                    e.target.src = "https://placehold.co/300x180/151824/8b5cf6?text=AnimeBliss";
                  }}
                />
                <div className="continue-overlay">
                  <div className="continue-play-btn">
                    <PlayCircleFilled />
                  </div>
                </div>

                <div className="continue-ep-badge">
                  EP {item.episodeNumber}
                </div>

                <button
                  className="continue-remove-btn"
                  onClick={(e) => handleRemove(e, item.animeId)}
                  title="Remove from history"
                  aria-label="Remove"
                >
                  <DeleteOutlined />
                </button>

                {/* Progress Bar */}
                <div className="continue-progress-bar-bg">
                  <div
                    className="continue-progress-bar-fill"
                    style={{ width: `${Math.max(5, item.progressPercent || 0)}%` }}
                  />
                </div>
              </div>

              <div className="continue-info">
                <h4 className="continue-title">
                  <TextTruncate line={1} element="span" truncateText="…" text={displayTitle} />
                </h4>
                <div className="continue-meta">
                  <span>Episode {item.episodeNumber}</span>
                  {item.progressPercent > 0 && <span>{item.progressPercent}%</span>}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ContinueWatching;
