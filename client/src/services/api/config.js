/**
 * AnimeBliss API Configuration
 * Centralized endpoint definitions and configuration parameters
 */

export const CONSUMET_API_URL =
  process.env.REACT_APP_CONSUMET_API_URL || "https://consumet-instance-alpha.vercel.app";

export const CONSUMET_FALLBACK_URL =
  process.env.REACT_APP_CONSUMET_FALLBACK_URL || CONSUMET_API_URL;

export const ANILIST_API_URL =
  process.env.REACT_APP_ANILIST_API_URL || `${CONSUMET_FALLBACK_URL}/meta/anilist`;

export const DEFAULT_PROVIDER =
  process.env.REACT_APP_CONSUMET_PROVIDER || "animekai";

/**
 * Endpoint routes definition
 */
export const ENDPOINTS = {
  // AnimeKai endpoints
  animekai: {
    search: (query, page = 1) => `/anime/animekai/${encodeURIComponent(query)}?page=${page}`,
    info: (id) => `/anime/animekai/info?id=${encodeURIComponent(id)}`,
    watch: (episodeId, server) => {
      const path = `/anime/animekai/watch/${encodeURIComponent(episodeId)}`;
      return server ? `${path}?server=${encodeURIComponent(server)}` : path;
    },
    servers: (episodeId) => `/anime/animekai/servers/${encodeURIComponent(episodeId)}`,
    searchSuggestions: (query) => `/anime/animekai/search-suggestions/${encodeURIComponent(query)}`,
    spotlight: () => `/anime/animekai/spotlight`,
    schedule: (date) => (date ? `/anime/animekai/schedule/${encodeURIComponent(date)}` : `/anime/animekai/schedule`),
    recentEpisodes: (page = 1) => `/anime/animekai/recent-episodes?page=${page}`,
    recentAdded: (page = 1) => `/anime/animekai/recent-added?page=${page}`,
    newReleases: (page = 1) => `/anime/animekai/new-releases?page=${page}`,
    latestCompleted: (page = 1) => `/anime/animekai/latest-completed?page=${page}`,
    genreList: () => `/anime/animekai/genre/list`,
    genre: (genre, page = 1) => `/anime/animekai/genre/${encodeURIComponent(genre)}?page=${page}`,
    movies: (page = 1) => `/anime/animekai/movies?page=${page}`,
    tv: (page = 1) => `/anime/animekai/tv?page=${page}`,
    ova: (page = 1) => `/anime/animekai/ova?page=${page}`,
    ona: (page = 1) => `/anime/animekai/ona?page=${page}`,
    specials: (page = 1) => `/anime/animekai/specials?page=${page}`,
  },

  // Multi-provider video source & server endpoints
  providers: {
    animepaheSearch: (query) => `/anime/animepahe/${encodeURIComponent(query)}`,
    animepaheInfo: (id) => `/anime/animepahe/info/${encodeURIComponent(id)}`,
    animepaheWatch: (episodeId) => `/anime/animepahe/watch?episodeId=${encodeURIComponent(episodeId)}`,
    animesaturnSearch: (query) => `/anime/animesaturn/${encodeURIComponent(query)}`,
    animesaturnInfo: (id) => `/anime/animesaturn/info/${encodeURIComponent(id)}`,
    animesaturnWatch: (episodeId) => `/anime/animesaturn/watch/${encodeURIComponent(episodeId)}`,
    animeunitySearch: (query) => `/anime/animeunity/${encodeURIComponent(query)}`,
    animeunityInfo: (id) => `/anime/animeunity/info/${encodeURIComponent(id)}`,
    animeunityWatch: (episodeId) => `/anime/animeunity/watch/${encodeURIComponent(episodeId)}`,
    hianimeDubbed: (page = 1) => `/anime/hianime/dubbed-anime?page=${page}`,
    kickassanimeServers: (episodeId) => `/anime/kickassanime/servers?episodeId=${encodeURIComponent(episodeId)}`,
  },

  // Meta AniList endpoints (high-fidelity fallback & enriched metadata)
  anilist: {
    trending: (page = 1, perPage = 20) => `/meta/anilist/trending?page=${page}&perPage=${perPage}`,
    popular: (page = 1, perPage = 20) => `/meta/anilist/popular?page=${page}&perPage=${perPage}`,
    airingSchedule: (page = 1, perPage = 24) => `/meta/anilist/airing-schedule?page=${page}&perPage=${perPage}`,
    advancedSearch: (params = "") => `/meta/anilist/advanced-search${params ? `?${params}` : ""}`,
    info: (id, provider = "gogoanime") => `/meta/anilist/info/${encodeURIComponent(id)}?provider=${provider}`,
    watch: (episodeId, provider = "gogoanime") => `/meta/anilist/watch/${encodeURIComponent(episodeId)}?provider=${provider}`,
  },
};
