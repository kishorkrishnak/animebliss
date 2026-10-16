import React, { useState, useEffect } from "react";
import Navbar from "../Sections/Navbar";
import {
  HeartFilled,
  DeleteOutlined,
  PlayCircleFilled,
  SearchOutlined,
  CompassOutlined,
  StarFilled,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import TextTruncate from "react-text-truncate";
import {
  getWatchlist,
  removeFromWatchlist,
  updateWatchlistStatus,
} from "../../services/storage";
import toast, { Toaster } from "react-hot-toast";
import "./Watchlist.css";

const Watchlist = () => {
  const navigate = useNavigate();
  const [watchlist, setWatchlist] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const refreshList = () => {
    setWatchlist(getWatchlist());
  };

  useEffect(() => {
    refreshList();
  }, []);

  const handleRemove = (e, id) => {
    e.stopPropagation();
    removeFromWatchlist(id);
    refreshList();
    toast.success("Removed from Watchlist");
  };

  const handleStatusChange = (e, id) => {
    e.stopPropagation();
    const newStatus = e.target.value;
    updateWatchlistStatus(id, newStatus);
    refreshList();
    toast.success(`Moved to ${newStatus.replace("_", " ")}`);
  };

  const filteredList = watchlist.filter((item) => {
    const matchesTab = activeTab === "all" || item.status === activeTab;
    const title = typeof item.title === "object" ? item.title?.english || item.title?.romaji || "" : item.title || "";
    const matchesSearch = title.toLowerCase().includes(searchQuery.toLowerCase().trim());
    return matchesTab && matchesSearch;
  });

  const getStatusCount = (status) => {
    if (status === "all") return watchlist.length;
    return watchlist.filter((i) => i.status === status).length;
  };

  return (
    <div className="watchlist-page-root">
      <Navbar />
      <Toaster position="top-right" />

      <main className="watchlist-container">
        {/* Header */}
        <div className="watchlist-header">
          <div className="watchlist-title-wrapper">
            <h1 className="watchlist-main-title">
              <HeartFilled style={{ color: "#ec4899", marginRight: 12 }} />
              My Watchlist
            </h1>
            <p className="watchlist-subtitle">
              Keep track of everything you're watching, plan to watch, and completed.
            </p>
          </div>

          {/* Quick Search */}
          <div className="watchlist-search-wrapper">
            <SearchOutlined className="watchlist-search-icon" />
            <input
              type="text"
              placeholder="Filter your watchlist..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="watchlist-search-input"
            />
          </div>
        </div>

        {/* Status Filter Tabs */}
        <div className="watchlist-tabs glass-panel">
          <button
            className={`watchlist-tab-btn ${activeTab === "all" ? "active" : ""}`}
            onClick={() => setActiveTab("all")}
          >
            All <span>({getStatusCount("all")})</span>
          </button>
          <button
            className={`watchlist-tab-btn ${activeTab === "watching" ? "active" : ""}`}
            onClick={() => setActiveTab("watching")}
          >
            Watching <span>({getStatusCount("watching")})</span>
          </button>
          <button
            className={`watchlist-tab-btn ${activeTab === "plan_to_watch" ? "active" : ""}`}
            onClick={() => setActiveTab("plan_to_watch")}
          >
            Plan to Watch <span>({getStatusCount("plan_to_watch")})</span>
          </button>
          <button
            className={`watchlist-tab-btn ${activeTab === "completed" ? "active" : ""}`}
            onClick={() => setActiveTab("completed")}
          >
            Completed <span>({getStatusCount("completed")})</span>
          </button>
        </div>

        {/* Watchlist Grid */}
        {filteredList.length > 0 ? (
          <div className="watchlist-grid">
            {filteredList.map((item) => {
              const displayTitle =
                typeof item.title === "object"
                  ? item.title?.english || item.title?.romaji || "Untitled Anime"
                  : item.title || "Untitled Anime";

              return (
                <div
                  key={item.id}
                  className="watchlist-card"
                  onClick={() => navigate(`/watch/${item.id}`)}
                >
                  <div className="watchlist-poster-wrapper">
                    <img
                      src={item.image || "https://placehold.co/300x450/151824/8b5cf6?text=AnimeBliss"}
                      alt={displayTitle}
                      className="watchlist-card-img"
                      onError={(e) => {
                        e.target.src = "https://placehold.co/300x450/151824/8b5cf6?text=AnimeBliss";
                      }}
                    />

                    <div className="watchlist-overlay">
                      <div className="watchlist-play-icon">
                        <PlayCircleFilled />
                      </div>
                    </div>

                    {item.rating && (
                      <div className="watchlist-rating-badge">
                        <StarFilled style={{ color: "#fbbf24" }} />
                        <span>{(item.rating > 10 ? item.rating / 10 : item.rating).toFixed(1)}</span>
                      </div>
                    )}

                    <button
                      className="watchlist-card-remove"
                      onClick={(e) => handleRemove(e, item.id)}
                      title="Remove from watchlist"
                      aria-label="Remove"
                    >
                      <DeleteOutlined />
                    </button>
                  </div>

                  <div className="watchlist-card-info">
                    <h3 className="watchlist-card-title" title={displayTitle}>
                      <TextTruncate text={displayTitle} line={2} element="span" truncateText="…" />
                    </h3>

                    <div className="watchlist-card-actions" onClick={(e) => e.stopPropagation()}>
                      <select
                        value={item.status || "watching"}
                        onChange={(e) => handleStatusChange(e, item.id)}
                        className="status-selector"
                      >
                        <option value="watching">Watching</option>
                        <option value="plan_to_watch">Plan to Watch</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="watchlist-empty-state glass-panel">
            <CompassOutlined className="empty-state-icon" />
            <h2 className="empty-state-title">Your Watchlist is Empty</h2>
            <p className="empty-state-text">
              {searchQuery
                ? `No anime in your watchlist match "${searchQuery}".`
                : "Explore trending and popular anime to start building your personal watchlist!"}
            </p>
            <button className="empty-state-btn" onClick={() => navigate("/")}>
              Discover Anime
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Watchlist;
