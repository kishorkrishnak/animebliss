// Storage service for AnimeBliss
// Handles Watchlist, Watch History (Continue Watching), and User Profile

const WATCHLIST_KEY = "animebliss_watchlist";
const HISTORY_KEY = "animebliss_history";
const PROFILE_KEY = "animebliss_profile";

/**
 * Watchlist Management
 */
export const getWatchlist = () => {
  try {
    const raw = localStorage.getItem(WATCHLIST_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error("Error reading watchlist from storage", e);
    return [];
  }
};

export const isInWatchlist = (animeId) => {
  if (!animeId) return false;
  const list = getWatchlist();
  return list.some((item) => String(item.id) === String(animeId));
};

export const addToWatchlist = (anime, status = "watching") => {
  if (!anime || !anime.id) return;
  const list = getWatchlist();
  const existingIndex = list.findIndex((item) => String(item.id) === String(anime.id));

  const entry = {
    id: String(anime.id),
    title: anime.title || { english: "Unknown Anime", romaji: "Unknown Anime" },
    image: anime.image || anime.cover || "",
    rating: anime.rating || 0,
    releaseDate: anime.releaseDate || anime.year || "",
    totalEpisodes: anime.totalEpisodes || anime.episodes?.length || 0,
    status: status, // "watching" | "plan_to_watch" | "completed"
    addedAt: Date.now(),
  };

  if (existingIndex >= 0) {
    list[existingIndex] = { ...list[existingIndex], ...entry, addedAt: list[existingIndex].addedAt };
  } else {
    list.unshift(entry);
  }

  try {
    localStorage.setItem(WATCHLIST_KEY, JSON.stringify(list));
  } catch (e) {
    console.error("Error saving watchlist", e);
  }
  return list;
};

export const removeFromWatchlist = (animeId) => {
  if (!animeId) return;
  const list = getWatchlist().filter((item) => String(item.id) !== String(animeId));
  try {
    localStorage.setItem(WATCHLIST_KEY, JSON.stringify(list));
  } catch (e) {
    console.error("Error removing from watchlist", e);
  }
  return list;
};

export const updateWatchlistStatus = (animeId, status) => {
  const list = getWatchlist().map((item) => {
    if (String(item.id) === String(animeId)) {
      return { ...item, status };
    }
    return item;
  });
  try {
    localStorage.setItem(WATCHLIST_KEY, JSON.stringify(list));
  } catch (e) {
    console.error("Error updating watchlist status", e);
  }
  return list;
};

/**
 * Watch History (Continue Watching)
 */
export const getWatchHistory = () => {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error("Error reading history from storage", e);
    return [];
  }
};

export const saveWatchProgress = ({
  animeId,
  title,
  image,
  episodeNumber,
  episodeId,
  currentTime,
  duration,
}) => {
  if (!animeId) return;
  const history = getWatchHistory();
  const existingIndex = history.findIndex((item) => String(item.animeId) === String(animeId));

  const progressPercent = duration > 0 ? Math.min(100, Math.round((currentTime / duration) * 100)) : 0;

  const entry = {
    animeId: String(animeId),
    title: title || { english: "Unknown Anime", romaji: "Unknown Anime" },
    image: image || "",
    episodeNumber: Number(episodeNumber) || 1,
    episodeId: episodeId || "",
    currentTime: Math.floor(currentTime || 0),
    duration: Math.floor(duration || 0),
    progressPercent,
    updatedAt: Date.now(),
  };

  if (existingIndex >= 0) {
    history.splice(existingIndex, 1);
  }
  // Keep up to 30 recent items
  history.unshift(entry);
  if (history.length > 30) history.pop();

  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch (e) {
    console.error("Error saving watch progress", e);
  }
};

export const getAnimeProgress = (animeId) => {
  if (!animeId) return null;
  const history = getWatchHistory();
  return history.find((item) => String(item.animeId) === String(animeId)) || null;
};

export const removeFromHistory = (animeId) => {
  const history = getWatchHistory().filter((item) => String(item.animeId) !== String(animeId));
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch (e) {
    console.error("Error removing from history", e);
  }
  return history;
};

/**
 * User Profile Management
 */
export const getUserProfile = () => {
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    return raw
      ? JSON.parse(raw)
      : {
          isLoggedIn: false,
          name: "Guest",
          email: "",
          avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=AnimeFan",
        };
  } catch (e) {
    return {
      isLoggedIn: false,
      name: "Guest",
      email: "",
      avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=AnimeFan",
    };
  }
};

export const saveUserProfile = (profile) => {
  try {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  } catch (e) {
    console.error("Error saving profile", e);
  }
};
