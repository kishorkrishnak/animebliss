import React, { useContext, useEffect, useRef, useState } from "react";
import {
  SearchOutlined,
  CloseOutlined,
  StarFilled,
  HeartFilled,
  UserOutlined,
  LogoutOutlined,
  FireFilled,
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { GlobalContext } from "../../App";
import logo from "../../assets/images/logo.png";
import { getWatchlist, getUserProfile, saveUserProfile } from "../../services/storage";
import { animeKaiApi } from "../../services/api";
import toast, { Toaster } from "react-hot-toast";
import "./Navbar.css";

const Navbar = () => {
  const SharedState = useContext(GlobalContext);
  const location = useLocation();
  const navigate = useNavigate();
  const wrapperRef = useRef(null);

  const [searchValue, setSearchValue] = useState("");
  const [liveResults, setLiveResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [watchlistCount, setWatchlistCount] = useState(0);
  const [userProfile, setUserProfile] = useState(() => getUserProfile());
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  // Sync watchlist count
  useEffect(() => {
    const list = getWatchlist();
    setWatchlistCount(list.length);
  }, [location.pathname]);

  // Click outside listener for dropdowns
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowDropdown(false);
        setMobileMenuOpen(false);
        setProfileDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debounced live search using AnimeKai search suggestions
  useEffect(() => {
    if (!searchValue || searchValue.trim().length < 2) {
      setLiveResults([]);
      setShowDropdown(false);
      return;
    }

    const timer = setTimeout(() => {
      setIsSearching(true);
      animeKaiApi
        .getSearchSuggestions(searchValue.trim())
        .then((results) => {
          if (results && results.length > 0) {
            setLiveResults(results.slice(0, 6));
            setShowDropdown(true);
          } else {
            setLiveResults([]);
          }
        })
        .catch(() => {
          setLiveResults([]);
        })
        .finally(() => {
          setIsSearching(false);
        });
    }, 280);

    return () => clearTimeout(timer);
  }, [searchValue]);

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    if (!searchValue || searchValue.trim() === "") {
      toast.error("Please enter a search term!");
      return;
    }
    setShowDropdown(false);
    setMobileSearchOpen(false);
    navigate(`/search?q=${encodeURIComponent(searchValue.trim())}`);
  };

  const handleSelectAnime = (animeId) => {
    setShowDropdown(false);
    setSearchValue("");
    setMobileSearchOpen(false);
    navigate(`/watch/${animeId}`);
  };

  const handleToggleLogin = () => {
    if (userProfile.isLoggedIn) {
      const guest = {
        isLoggedIn: false,
        name: "Guest",
        avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=AnimeBliss",
      };
      saveUserProfile(guest);
      setUserProfile(guest);
      if (SharedState.setIsLoggedIn) SharedState.setIsLoggedIn(false);
      toast.success("Logged out");
    } else {
      navigate("/login");
    }
    setProfileDropdownOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="nav glass-panel" ref={wrapperRef}>
      <Toaster position="top-right" toastOptions={{ duration: 2000 }} />

      <div className="nav-container">
        {/* Brand */}
        <div
          className="nav-brand"
          onClick={() => {
            navigate("/");
            setMobileMenuOpen(false);
          }}
        >
          <img className="nav-brand-logo" src={logo} alt="AnimeBliss logo" />
          <span className="nav-brand-title">
            Anime<span className="title-accent">Bliss</span>
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <ul className="nav-links">
          <li className={`nav-item ${isActive("/") ? "active" : ""}`}>
            <span onClick={() => navigate("/")} className="nav-link">
              Home
            </span>
          </li>
          <li className={`nav-item ${isActive("/movies") ? "active" : ""}`}>
            <span onClick={() => navigate("/movies")} className="nav-link">
              Movies
            </span>
          </li>
          <li className={`nav-item ${isActive("/recentep") ? "active" : ""}`}>
            <span onClick={() => navigate("/recentep")} className="nav-link">
              Recent
            </span>
          </li>
          <li className={`nav-item ${isActive("/filter") ? "active" : ""}`}>
            <span onClick={() => navigate("/filter")} className="nav-link">
              Filter
            </span>
          </li>
          <li className={`nav-item ${isActive("/watchlist") ? "active" : ""}`}>
            <span onClick={() => navigate("/watchlist")} className="nav-link nav-watchlist">
              Watchlist
              {watchlistCount > 0 && <span className="watchlist-badge">{watchlistCount}</span>}
            </span>
          </li>
        </ul>

        {/* Live Search Bar */}
        <div className="nav-search-wrapper">
          <form onSubmit={handleSearchSubmit} className="search-form">
            <SearchOutlined className="search-icon" />
            <input
              type="text"
              placeholder="Search anime, movies, genres..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onFocus={() => liveResults.length > 0 && setShowDropdown(true)}
              className="search-input"
            />
            {searchValue && (
              <CloseOutlined
                className="search-clear-icon"
                onClick={() => {
                  setSearchValue("");
                  setLiveResults([]);
                  setShowDropdown(false);
                }}
              />
            )}
          </form>

          {/* Live Search Dropdown */}
          {showDropdown && liveResults.length > 0 && (
            <div className="search-dropdown glass-panel">
              <div className="search-dropdown-header">
                <span>Matching Anime</span>
                {isSearching && <span className="searching-indicator">Searching...</span>}
              </div>
              <div className="search-dropdown-list">
                {liveResults.map((anime) => {
                  const title = anime.title?.english || anime.title?.romaji || "Untitled";
                  return (
                    <div
                      key={anime.id}
                      className="search-result-item"
                      onClick={() => handleSelectAnime(anime.id)}
                    >
                      <img
                        src={anime.image}
                        alt={title}
                        className="search-result-thumb"
                        onError={(e) => {
                          e.target.src = "https://placehold.co/50x70/151824/8b5cf6?text=AB";
                        }}
                      />
                      <div className="search-result-details">
                        <span className="search-result-title">{title}</span>
                        <div className="search-result-meta">
                          {anime.releaseDate && <span>{anime.releaseDate}</span>}
                          {anime.type && <span className="type-chip">{anime.type}</span>}
                          {anime.rating && (
                            <span className="rating-chip">
                              <StarFilled style={{ color: "#fbbf24" }} />{" "}
                              {(anime.rating / 10).toFixed(1)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="search-dropdown-footer" onClick={handleSearchSubmit}>
                <span>View all results for "{searchValue}"</span>
              </div>
            </div>
          )}
        </div>

        {/* Right Actions: Mobile Search Toggle + Profile */}
        <div className="nav-actions">
          {/* Mobile Search Toggle */}
          <button
            className="mobile-search-toggle"
            onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
            aria-label="Toggle Search"
          >
            {mobileSearchOpen ? <CloseOutlined /> : <SearchOutlined />}
          </button>

          {/* User Profile Dropdown */}
          <div className="profile-wrapper">
            <button
              className="profile-btn"
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              aria-label="User Profile"
            >
              <img
                src={userProfile.avatar}
                alt="User"
                className="profile-avatar"
                onError={(e) => {
                  e.target.src = "https://api.dicebear.com/7.x/bottts/svg?seed=AnimeBliss";
                }}
              />
            </button>

            {profileDropdownOpen && (
              <div className="profile-dropdown glass-panel">
                <div className="profile-dropdown-user">
                  <span className="profile-name">{userProfile.name}</span>
                  <span className="profile-role">
                    {userProfile.isLoggedIn ? "Member" : "Guest Mode"}
                  </span>
                </div>
                <div className="profile-dropdown-divider" />
                <button
                  className="profile-dropdown-item"
                  onClick={() => {
                    navigate("/watchlist");
                    setProfileDropdownOpen(false);
                  }}
                >
                  <HeartFilled style={{ color: "#ec4899" }} />
                  <span>My Watchlist ({watchlistCount})</span>
                </button>
                <button
                  className="profile-dropdown-item"
                  onClick={() => {
                    navigate("/");
                    setProfileDropdownOpen(false);
                    setTimeout(() => {
                      const el = document.querySelector(".section-continue-watching");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }, 100);
                  }}
                >
                  <FireFilled style={{ color: "#f97316" }} />
                  <span>Watch History</span>
                </button>
                <div className="profile-dropdown-divider" />
                <button className="profile-dropdown-item" onClick={handleToggleLogin}>
                  {userProfile.isLoggedIn ? (
                    <>
                      <LogoutOutlined />
                      <span>Log Out</span>
                    </>
                  ) : (
                    <>
                      <UserOutlined />
                      <span>Sign In</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Hamburger Menu Toggler */}
          <button
            className={`nav-toggler ${mobileMenuOpen ? "toggle" : ""}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            <div className="line1"></div>
            <div className="line2"></div>
            <div className="line3"></div>
          </button>
        </div>
      </div>

      {/* Mobile Search Bar Expandable Drawer */}
      {mobileSearchOpen && (
        <div className="mobile-search-bar">
          <form onSubmit={handleSearchSubmit} className="search-form">
            <SearchOutlined className="search-icon" />
            <input
              type="text"
              placeholder="Search anime..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              autoFocus
              className="search-input"
            />
            <button type="submit" className="mobile-search-submit">
              Go
            </button>
          </form>
        </div>
      )}

      {/* Mobile Drawer Menu */}
      <div className={`mobile-menu ${mobileMenuOpen ? "open" : ""} glass-panel`}>
        <div className="mobile-menu-links">
          <span
            onClick={() => {
              navigate("/");
              setMobileMenuOpen(false);
            }}
            className={`mobile-link ${isActive("/") ? "active" : ""}`}
          >
            Home
          </span>
          <span
            onClick={() => {
              navigate("/movies");
              setMobileMenuOpen(false);
            }}
            className={`mobile-link ${isActive("/movies") ? "active" : ""}`}
          >
            Top Movies
          </span>
          <span
            onClick={() => {
              navigate("/recentep");
              setMobileMenuOpen(false);
            }}
            className={`mobile-link ${isActive("/recentep") ? "active" : ""}`}
          >
            Recent Episodes
          </span>
          <span
            onClick={() => {
              navigate("/filter");
              setMobileMenuOpen(false);
            }}
            className={`mobile-link ${isActive("/filter") ? "active" : ""}`}
          >
            Filter & Genres
          </span>
          <span
            onClick={() => {
              navigate("/watchlist");
              setMobileMenuOpen(false);
            }}
            className={`mobile-link ${isActive("/watchlist") ? "active" : ""}`}
          >
            Watchlist ({watchlistCount})
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
