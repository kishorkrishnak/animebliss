import React, { useEffect, useState, useMemo } from "react";
import {
  CalendarOutlined,
  OrderedListOutlined,
  PlayCircleOutlined,
  StarFilled,
  HeartFilled,
  HeartOutlined,
  ShareAltOutlined,
  StepBackwardOutlined,
  StepForwardOutlined,
  SearchOutlined,
  CheckCircleFilled,
  BranchesOutlined,
} from "@ant-design/icons";
import { useParams, useNavigate } from "react-router-dom";
import ScrollToTop from "react-scroll-to-top";
import CarouselRenderer from "../Layouts/CarouselRenderer";
import AnimePlayer from "../Players/AnimePlayer";
import AnimeSection from "../Sections/AnimeSection";
import Navbar from "../Sections/Navbar";
import {
  isInWatchlist,
  addToWatchlist,
  removeFromWatchlist,
  saveWatchProgress,
  getAnimeProgress,
} from "../../services/storage";
import { animeKaiApi, providerApi, CONSUMET_API_URL } from "../../services/api";
import toast, { Toaster } from "react-hot-toast";
import "./AnimePlayerPage.css";

const AnimePlayerPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [anime, setAnime] = useState(null);
  const [loadingAnime, setLoadingAnime] = useState(true);
  const [selectedEpIndex, setSelectedEpIndex] = useState(0); // 0-indexed
  const [currentStreamUrl, setCurrentStreamUrl] = useState(null);
  const [inWatchlist, setInWatchlist] = useState(false);
  const [autoNext, setAutoNext] = useState(true);
  const [episodeSearch, setEpisodeSearch] = useState("");
  const [selectedBatch, setSelectedBatch] = useState(0);
  const [loadingVideo, setLoadingVideo] = useState(true);
  const [selectedProvider, setSelectedProvider] = useState("animekai");
  const [servers, setServers] = useState([]);

  // Check watchlist state
  useEffect(() => {
    if (id) {
      setInWatchlist(isInWatchlist(id));
    }
  }, [id]);

  // Initial Fetch: Anime Metadata & Episode List via AnimeKai
  useEffect(() => {
    let isMounted = true;
    setLoadingAnime(true);
    setAnime(null);
    setCurrentStreamUrl(null);

    animeKaiApi
      .getInfo(id)
      .then((data) => {
        if (!isMounted) return;
        setAnime(data);

        // Check if there was saved progress to resume the right episode
        const savedProgress = getAnimeProgress(id);
        if (savedProgress && savedProgress.episodeNumber && data.episodes) {
          const targetIndex = savedProgress.episodeNumber - 1;
          if (targetIndex >= 0 && targetIndex < data.episodes.length) {
            setSelectedEpIndex(targetIndex);
            setSelectedBatch(Math.floor(targetIndex / 50));
            return;
          }
        }
        setSelectedEpIndex(0);
        setSelectedBatch(0);
      })
      .catch((err) => {
        if (!isMounted) return;
        console.error("Failed to fetch anime metadata", err);
        toast.error("Could not load anime details");
      })
      .finally(() => {
        if (isMounted) {
          setLoadingAnime(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  // Fetch Video Source for Currently Selected Episode via Provider Resolver
  useEffect(() => {
    if (!anime || !anime.episodes || anime.episodes.length === 0) return;

    const currentEpisode = anime.episodes[selectedEpIndex];
    if (!currentEpisode || !currentEpisode.id) return;

    let isMounted = true;
    setLoadingVideo(true);

    providerApi
      .resolveEpisodeStream(currentEpisode.id, selectedProvider)
      .then((streamResult) => {
        if (!isMounted) return;
        if (streamResult?.data?.sources && streamResult.data.sources.length > 0) {
          const urls = streamResult.data.sources.map((s) => s.url);
          setCurrentStreamUrl(urls);
        } else {
          setCurrentStreamUrl(null);
          toast.error(`No stream available for Episode ${selectedEpIndex + 1} on ${selectedProvider}`);
        }
      })
      .catch((err) => {
        if (!isMounted) return;
        console.error("Failed to fetch video stream", err);
        toast.error("Error retrieving video stream");
        setCurrentStreamUrl(null);
      })
      .finally(() => {
        if (isMounted) setLoadingVideo(false);
      });

    // Also fetch streaming servers for this episode
    animeKaiApi
      .getServers(currentEpisode.id)
      .then((serverList) => {
        if (!isMounted) return;
        setServers(Array.isArray(serverList) ? serverList : []);
      })
      .catch(() => {
        if (isMounted) setServers([]);
      });

    return () => {
      isMounted = false;
    };
  }, [anime, selectedEpIndex, selectedProvider]);

  // Track & Save Watch Progress
  const handleProgressUpdate = (currentTime, duration) => {
    if (!anime || !anime.episodes) return;
    const currentEpisode = anime.episodes[selectedEpIndex];
    if (!currentEpisode) return;

    saveWatchProgress({
      animeId: id,
      title: anime.title,
      image: anime.image || anime.cover,
      episodeNumber: selectedEpIndex + 1,
      episodeId: currentEpisode.id,
      currentTime,
      duration,
    });
  };

  // Next / Previous Episode handlers
  const handlePrevEpisode = () => {
    if (selectedEpIndex > 0) {
      const prev = selectedEpIndex - 1;
      setSelectedEpIndex(prev);
      setSelectedBatch(Math.floor(prev / 50));
      toast(`Playing Episode ${prev + 1}`);
    }
  };

  const handleNextEpisode = () => {
    if (anime?.episodes && selectedEpIndex < anime.episodes.length - 1) {
      const next = selectedEpIndex + 1;
      setSelectedEpIndex(next);
      setSelectedBatch(Math.floor(next / 50));
      toast(`Playing Episode ${next + 1}`);
    } else {
      toast("You are at the latest episode");
    }
  };

  // Auto-play next episode when playback ends
  const handleVideoEnded = () => {
    if (autoNext && anime?.episodes && selectedEpIndex < anime.episodes.length - 1) {
      toast.success("Episode finished! Loading next episode...");
      handleNextEpisode();
    }
  };

  // Watchlist Toggle
  const handleToggleWatchlist = () => {
    if (!anime) return;
    if (inWatchlist) {
      removeFromWatchlist(id);
      setInWatchlist(false);
      toast.success("Removed from Watchlist");
    } else {
      addToWatchlist({
        id,
        title: anime.title,
        image: anime.image || anime.cover,
        rating: anime.rating,
        releaseDate: anime.releaseDate,
        totalEpisodes: anime.episodes?.length || 0,
      });
      setInWatchlist(true);
      toast.success("Added to Watchlist!");
    }
  };

  // Share action
  const handleShare = () => {
    const shareUrl = window.location.href;
    const title = anime?.title?.english || anime?.title?.romaji || "AnimeBliss";

    if (navigator.share) {
      navigator
        .share({
          title: `Watch ${title} on AnimeBliss`,
          text: `Check out ${title} on AnimeBliss - Free anime streaming!`,
          url: shareUrl,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(shareUrl).then(() => {
        toast.success("Link copied to clipboard!");
      });
    }
  };

  // Seasons / Related Anime (Prequels, Sequels, Side Stories)
  const relatedSeasons = useMemo(() => {
    if (!anime || !anime.relations) return [];
    return anime.relations.filter(
      (rel) =>
        (rel.relationType === "SEQUEL" ||
          rel.relationType === "PREQUEL" ||
          rel.relationType === "SIDE_STORY" ||
          rel.relationType === "SPIN_OFF" ||
          rel.relationType === "ALTERNATIVE") &&
        rel.id &&
        rel.title
    );
  }, [anime]);

  // Episode Batches (50 per batch)
  const episodeBatches = useMemo(() => {
    if (!anime || !anime.episodes) return [];
    const batches = [];
    const total = anime.episodes.length;
    for (let i = 0; i < total; i += 50) {
      const start = i + 1;
      const end = Math.min(i + 50, total);
      batches.push({ start, end, index: Math.floor(i / 50) });
    }
    return batches;
  }, [anime]);

  // Filtered episodes inside the selected batch or search query
  const visibleEpisodes = useMemo(() => {
    if (!anime || !anime.episodes) return [];
    if (episodeSearch.trim()) {
      const q = episodeSearch.trim().toLowerCase();
      return anime.episodes
        .map((ep, idx) => ({ ...ep, displayIndex: idx + 1 }))
        .filter(
          (ep) =>
            String(ep.displayIndex).includes(q) ||
            (ep.title && ep.title.toLowerCase().includes(q))
        );
    }
    const start = selectedBatch * 50;
    const end = start + 50;
    return anime.episodes
      .slice(start, end)
      .map((ep, idx) => ({ ...ep, displayIndex: start + idx + 1 }));
  }, [anime, selectedBatch, episodeSearch]);

  const cleanDescription = (desc) => {
    if (!desc) return "No description available.";
    return desc
      .substring(0, desc.indexOf("(") === -1 ? desc.length : desc.indexOf("("))
      .replaceAll(/<\/?[\w\s]*>|<.+[\W]>/g, "");
  };

  const currentEpNumber = selectedEpIndex + 1;
  const totalEpisodes = anime?.episodes?.length || 0;
  const displayTitle = anime?.title?.english || anime?.title?.romaji || "Anime Player";

  return (
    <div className="player-page-root">
      <Navbar />
      <Toaster position="top-right" />

      {/* Loading Skeleton Layout while anime is fetching */}
      {loadingAnime ? (
        <div className="player-main-layout">
          <div className="player-left-col">
            <div className="video-player-container skeleton" style={{ minHeight: 480 }} />
            <div className="player-control-bar glass-panel skeleton" style={{ height: 60 }} />
            <div className="anime-details-card glass-panel" style={{ minHeight: 250, display: "flex", flexDirection: "column", gap: 14 }}>
              <div className="skeleton" style={{ width: "60%", height: 32, borderRadius: 6 }} />
              <div className="skeleton" style={{ width: "40%", height: 20, borderRadius: 6 }} />
              <div className="skeleton" style={{ width: "100%", height: 80, borderRadius: 6 }} />
            </div>
          </div>
          <div className="player-right-col">
            <div className="episode-browser-panel glass-panel" style={{ minHeight: 600 }}>
              <div className="skeleton" style={{ width: "50%", height: 24, marginBottom: 16, borderRadius: 6 }} />
              <div className="episodes-grid-list">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((n) => (
                  <div key={n} className="ep-card-item skeleton" />
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : anime ? (
        <>
          <div className="player-main-layout">
            {/* LEFT COLUMN: Player + Controls + Anime Info */}
            <div className="player-left-col">
              {/* Video Player */}
              <div className="video-player-container">
                {loadingVideo ? (
                  <div className="player-loading-skeleton skeleton">
                    <span>Loading Episode {currentEpNumber}...</span>
                  </div>
                ) : currentStreamUrl ? (
                  <AnimePlayer
                    src={currentStreamUrl}
                    animeInfoUrl={`anime_${id}_ep_${currentEpNumber}`}
                    onVideoEnded={handleVideoEnded}
                    onProgressUpdate={handleProgressUpdate}
                  />
                ) : (
                  <div className="player-error-fallback glass-panel">
                    <p>Stream unavailable for Episode {currentEpNumber}.</p>
                    <button onClick={handleNextEpisode} className="error-btn-next">
                      Try Next Episode
                    </button>
                  </div>
                )}
              </div>

              {/* Streaming Server & Provider Selection */}
              <div className="player-server-bar glass-panel">
                <span className="server-label">Server:</span>
                <div className="server-chips">
                  {[
                    { id: "animekai", name: "AnimeKai" },
                    { id: "animepahe", name: "AnimePahe" },
                    { id: "animesaturn", name: "AnimeSaturn" },
                    { id: "animeunity", name: "AnimeUnity" },
                  ].map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      className={`server-chip ${selectedProvider === p.id ? "active" : ""}`}
                      onClick={() => {
                        setSelectedProvider(p.id);
                        toast(`Switching to ${p.name}`);
                      }}
                    >
                      {p.name}
                    </button>
                  ))}
                  {servers && servers.length > 0 && servers.map((srv, idx) => (
                    <button
                      key={srv.name || idx}
                      type="button"
                      className={`server-chip ${selectedProvider === srv.name ? "active" : ""}`}
                      onClick={() => {
                        setSelectedProvider(srv.name);
                        toast(`Server: ${srv.name}`);
                      }}
                    >
                      {srv.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Episode Control Bar */}
              <div className="player-control-bar glass-panel">
                <div className="ep-nav-buttons">
                  <button
                    className="ep-ctrl-btn"
                    onClick={handlePrevEpisode}
                    disabled={selectedEpIndex <= 0}
                    title="Previous Episode"
                  >
                    <StepBackwardOutlined />
                    <span>Prev Ep</span>
                  </button>

                  <div className="current-ep-pill">
                    <span>Episode {currentEpNumber} of {totalEpisodes}</span>
                  </div>

                  <button
                    className="ep-ctrl-btn"
                    onClick={handleNextEpisode}
                    disabled={selectedEpIndex >= totalEpisodes - 1}
                    title="Next Episode"
                  >
                    <span>Next Ep</span>
                    <StepForwardOutlined />
                  </button>
                </div>

                <div className="player-options-bar">
                  {/* Auto-Next Switch */}
                  <label className="autonext-toggle" title="Automatically advance to next episode when video ends">
                    <input
                      type="checkbox"
                      checked={autoNext}
                      onChange={(e) => setAutoNext(e.target.checked)}
                    />
                    <span className="autonext-label">Auto-Next</span>
                  </label>

                  {/* Watchlist Toggle */}
                  <button
                    className={`player-action-btn ${inWatchlist ? "active" : ""}`}
                    onClick={handleToggleWatchlist}
                    title={inWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
                  >
                    {inWatchlist ? (
                      <>
                        <HeartFilled style={{ color: "#ec4899" }} />
                        <span>Saved</span>
                      </>
                    ) : (
                      <>
                        <HeartOutlined />
                        <span>Watchlist</span>
                      </>
                    )}
                  </button>

                  {/* Share Button */}
                  <button className="player-action-btn" onClick={handleShare} title="Share Anime">
                    <ShareAltOutlined />
                    <span>Share</span>
                  </button>
                </div>
              </div>

              {/* Anime Information Header */}
              <div className="anime-details-card glass-panel">
                <h1 className="anime-page-title">{displayTitle}</h1>

                {anime.genres && anime.genres.length > 0 && (
                  <div className="anime-genres-chips">
                    {anime.genres.map((genre) => (
                      <span
                        key={genre}
                        className="genre-chip"
                        onClick={() => navigate(`/filtered/genre/${genre.toLowerCase()}`)}
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                )}

                <div className="anime-meta-row">
                  <span className="meta-badge">
                    <PlayCircleOutlined /> TV Series
                  </span>
                  {anime.rating && (
                    <span className="meta-badge rating-badge">
                      <StarFilled style={{ color: "#fbbf24" }} /> {(anime.rating / 10).toFixed(1)}
                    </span>
                  )}
                  <span className="meta-badge">
                    <OrderedListOutlined /> {totalEpisodes} Episodes
                  </span>
                  {anime.releaseDate && (
                    <span className="meta-badge">
                      <CalendarOutlined /> {anime.releaseDate}
                    </span>
                  )}
                  {anime.status && <span className="meta-badge status-badge">{anime.status}</span>}
                </div>

                {/* Seasons & Related Anime Section */}
                {relatedSeasons.length > 0 && (
                  <div className="anime-relations-section">
                    <h3 className="section-subtitle">
                      <BranchesOutlined /> Seasons & Related
                    </h3>
                    <div className="relations-chips-row">
                      {relatedSeasons.map((rel) => {
                        const relTitle = rel.title?.english || rel.title?.romaji || "Related Anime";
                        const relType = (rel.relationType || "").replace("_", " ");
                        return (
                          <div
                            key={rel.id}
                            className="relation-chip-card"
                            onClick={() => {
                              navigate(`/watch/${rel.id}`);
                              window.scrollTo({ top: 0, behavior: "smooth" });
                            }}
                            title={`${relTitle} (${relType})`}
                          >
                            <span className="relation-type-tag">{relType}</span>
                            <span className="relation-title-text">{relTitle}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                <div className="anime-synopsis-section">
                  <h3 className="section-subtitle">Synopsis</h3>
                  <p className="synopsis-text">
                    {cleanDescription(anime.description)}
                  </p>
                </div>

                <div className="anime-extra-info">
                  {anime.studios && anime.studios.length > 0 && (
                    <div className="info-item">
                      <span className="info-label">Studios:</span>
                      <span className="info-value">{anime.studios.join(", ")}</span>
                    </div>
                  )}
                  {anime.status && (
                    <div className="info-item">
                      <span className="info-label">Status:</span>
                      <span className="info-value">{anime.status}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Episode Browser Panel */}
            <div className="player-right-col">
              <div className="episode-browser-panel glass-panel">
                <div className="ep-browser-header">
                  <h3 className="ep-browser-title">Episodes ({totalEpisodes})</h3>

                  {/* Episode Search */}
                  <div className="ep-search-box">
                    <SearchOutlined className="ep-search-icon" />
                    <input
                      type="text"
                      placeholder="Search episode #..."
                      value={episodeSearch}
                      onChange={(e) => setEpisodeSearch(e.target.value)}
                      className="ep-search-input"
                    />
                  </div>
                </div>

                {/* Batch Range Tabs (1-50, 51-100, etc.) if more than 50 episodes */}
                {episodeBatches.length > 1 && !episodeSearch && (
                  <div className="ep-batch-tabs">
                    {episodeBatches.map((batch) => (
                      <button
                        key={batch.index}
                        className={`ep-batch-tab ${selectedBatch === batch.index ? "active" : ""}`}
                        onClick={() => setSelectedBatch(batch.index)}
                      >
                        {batch.start} - {batch.end}
                      </button>
                    ))}
                  </div>
                )}

                {/* Episode Grid List */}
                <div className="episodes-grid-list">
                  {visibleEpisodes.map((ep) => {
                    const isCurrent = ep.displayIndex - 1 === selectedEpIndex;
                    return (
                      <div
                        key={ep.id || ep.displayIndex}
                        className={`ep-card-item ${isCurrent ? "current" : ""}`}
                        onClick={() => {
                          setSelectedEpIndex(ep.displayIndex - 1);
                          toast(`Selected Episode ${ep.displayIndex}`);
                        }}
                        title={`Episode ${ep.displayIndex}`}
                      >
                        <span className="ep-number">{ep.displayIndex}</span>
                        {isCurrent && <CheckCircleFilled className="ep-active-icon" />}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Recommendations Carousel (Rendered only after anime loads, placed below the player) */}
          {anime.recommendations && anime.recommendations.length > 0 && (
            <div style={{ marginTop: 30 }}>
              <CarouselRenderer
                sectionTitle="Recommended For You"
                finalQuery={anime.recommendations}
                isAnimeCard={true}
              />
            </div>
          )}

          {/* Trending Anime Carousel */}
          <AnimeSection
            url={`${CONSUMET_API_URL}/meta/anilist/trending`}
            id={"trending"}
            sectiontitle={"Trending Anime"}
          />
        </>
      ) : (
        <div style={{ textAlign: "center", padding: "120px 20px" }}>
          <h2>Failed to load anime</h2>
          <button
            onClick={() => navigate("/")}
            style={{ marginTop: 16, background: "#ffffff", color: "#0b0c10", fontWeight: 700, padding: "10px 24px", borderRadius: 9999 }}
          >
            Back to Home
          </button>
        </div>
      )}

      <ScrollToTop
        style={{
          border: "1px solid rgba(255, 255, 255, 0.12)",
          background: "rgba(20, 23, 32, 0.9)",
          borderRadius: "50%",
          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.4)",
          color: "#fff",
        }}
        className="scrolltop"
        top={800}
        smooth
        color="#ffffff"
      />
    </div>
  );
};

export default AnimePlayerPage;
