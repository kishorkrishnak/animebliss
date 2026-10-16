import apiClient, { fetchWithFallback, normalizeApiResponse } from "./client";
import { ENDPOINTS, ANILIST_API_URL } from "./config";

/**
 * AnimeKai API Module
 * Implements all Consumet AnimeKai endpoints with graceful fallback support
 */
export const animeKaiApi = {
  /**
   * Search Anime
   * Endpoint: /anime/animekai/{query}
   */
  async search(query, page = 1) {
    if (!query || !query.trim()) return { results: [], currentPage: 1, hasNextPage: false };
    const path = ENDPOINTS.animekai.search(query.trim(), page);

    const fallbackFn = async () => {
      const res = await apiClient.get(`${ANILIST_API_URL}/${encodeURIComponent(query.trim())}?page=${page}`);
      return res.data;
    };

    const data = await fetchWithFallback(path, fallbackFn);
    return normalizeApiResponse(data);
  },

  /**
   * Search Suggestions / Quick Typeahead
   * Endpoint: /anime/animekai/search-suggestions/{query}
   */
  async getSearchSuggestions(query) {
    if (!query || query.trim().length < 2) return [];
    const path = ENDPOINTS.animekai.searchSuggestions(query.trim());

    const fallbackFn = async () => {
      const res = await apiClient.get(`${ANILIST_API_URL}/${encodeURIComponent(query.trim())}`);
      return res.data?.results ? res.data.results.slice(0, 6) : [];
    };

    const data = await fetchWithFallback(path, fallbackFn);
    if (Array.isArray(data)) return data;
    if (data?.results && Array.isArray(data.results)) return data.results.slice(0, 6);
    return [];
  },

  /**
   * Anime Info & Episode Metadata
   * Endpoint: /anime/animekai/info?id={id}
   */
  async getInfo(id) {
    if (!id) throw new Error("Anime ID is required");
    const path = ENDPOINTS.animekai.info(id);

    const fallbackFn = async () => {
      const res = await apiClient.get(`${ANILIST_API_URL}/info/${encodeURIComponent(id)}`);
      return res.data;
    };

    const data = await fetchWithFallback(path, fallbackFn);
    return data;
  },

  /**
   * Video Stream Source
   * Endpoint: /anime/animekai/watch/{episodeId}
   */
  async getWatch(episodeId) {
    if (!episodeId) throw new Error("Episode ID is required");
    const path = ENDPOINTS.animekai.watch(episodeId);

    const fallbackFn = async () => {
      const res = await apiClient.get(`${ANILIST_API_URL}/watch/${encodeURIComponent(episodeId)}`);
      return res.data;
    };

    const data = await fetchWithFallback(path, fallbackFn);
    return data;
  },

  /**
   * Episode Streaming Servers
   * Endpoint: /anime/animekai/servers/{episodeId}
   */
  async getServers(episodeId) {
    if (!episodeId) return [];
    const path = ENDPOINTS.animekai.servers(episodeId);

    const fallbackFn = async () => {
      const res = await apiClient.get(ENDPOINTS.providers.kickassanimeServers(episodeId));
      return res.data;
    };

    const data = await fetchWithFallback(path, fallbackFn);
    return Array.isArray(data) ? data : (data?.servers || []);
  },

  /**
   * Spotlight Carousel Anime
   * Endpoint: /anime/animekai/spotlight
   */
  async getSpotlight() {
    const path = ENDPOINTS.animekai.spotlight();

    const fallbackFn = async () => {
      const res = await apiClient.get(`${ANILIST_API_URL}/trending`);
      return res.data;
    };

    const data = await fetchWithFallback(path, fallbackFn);
    return normalizeApiResponse(data);
  },

  /**
   * Airing Schedule
   * Endpoint: /anime/animekai/schedule/{date}
   */
  async getSchedule(date = "") {
    const path = ENDPOINTS.animekai.schedule(date);

    const fallbackFn = async () => {
      const res = await apiClient.get(`${ANILIST_API_URL}/airing-schedule`);
      return res.data;
    };

    const data = await fetchWithFallback(path, fallbackFn);
    return normalizeApiResponse(data);
  },

  /**
   * Recent Episodes
   * Endpoint: /anime/animekai/recent-episodes
   */
  async getRecentEpisodes(page = 1) {
    const path = ENDPOINTS.animekai.recentEpisodes(page);

    const fallbackFn = async () => {
      const res = await apiClient.get(`${ANILIST_API_URL}/airing-schedule?page=${page}&perPage=24`);
      return res.data;
    };

    const data = await fetchWithFallback(path, fallbackFn);
    return normalizeApiResponse(data);
  },

  /**
   * Recently Added Anime
   * Endpoint: /anime/animekai/recent-added
   */
  async getRecentAdded(page = 1) {
    const path = ENDPOINTS.animekai.recentAdded(page);

    const fallbackFn = async () => {
      const res = await apiClient.get(`${ANILIST_API_URL}/advanced-search?sort=["UPDATED_AT_DESC"]&page=${page}&perPage=24`);
      return res.data;
    };

    const data = await fetchWithFallback(path, fallbackFn);
    return normalizeApiResponse(data);
  },

  /**
   * New Releases
   * Endpoint: /anime/animekai/new-releases
   */
  async getNewReleases(page = 1) {
    const path = ENDPOINTS.animekai.newReleases(page);

    const fallbackFn = async () => {
      const res = await apiClient.get(`${ANILIST_API_URL}/advanced-search?status=RELEASING&sort=["START_DATE_DESC"]&page=${page}&perPage=24`);
      return res.data;
    };

    const data = await fetchWithFallback(path, fallbackFn);
    return normalizeApiResponse(data);
  },

  /**
   * Latest Completed Anime
   * Endpoint: /anime/animekai/latest-completed
   */
  async getLatestCompleted(page = 1) {
    const path = ENDPOINTS.animekai.latestCompleted(page);

    const fallbackFn = async () => {
      const res = await apiClient.get(`${ANILIST_API_URL}/advanced-search?status=FINISHED&sort=["END_DATE_DESC"]&page=${page}&perPage=24`);
      return res.data;
    };

    const data = await fetchWithFallback(path, fallbackFn);
    return normalizeApiResponse(data);
  },

  /**
   * Genre List
   * Endpoint: /anime/animekai/genre/list
   */
  async getGenreList() {
    const path = ENDPOINTS.animekai.genreList();
    const data = await fetchWithFallback(path, async () => [
      "Action", "Adventure", "Comedy", "Drama", "Fantasy",
      "Horror", "Mahou Shoujo", "Mecha", "Music", "Mystery",
      "Psychological", "Romance", "Sci-Fi", "Slice of Life",
      "Sports", "Supernatural", "Thriller"
    ]);
    return Array.isArray(data) ? data : (data?.genres || []);
  },

  /**
   * Anime by Genre
   * Endpoint: /anime/animekai/genre/{genre}
   */
  async getByGenre(genre, page = 1) {
    if (!genre) return { results: [], currentPage: 1, hasNextPage: false };
    const path = ENDPOINTS.animekai.genre(genre, page);

    const fallbackFn = async () => {
      const res = await apiClient.get(`${ANILIST_API_URL}/advanced-search?genres=["${genre}"]&page=${page}&perPage=24`);
      return res.data;
    };

    const data = await fetchWithFallback(path, fallbackFn);
    return normalizeApiResponse(data);
  },

  /**
   * Anime Movies
   * Endpoint: /anime/animekai/movies
   */
  async getMovies(page = 1) {
    const path = ENDPOINTS.animekai.movies(page);

    const fallbackFn = async () => {
      const res = await apiClient.get(`${ANILIST_API_URL}/advanced-search?format=MOVIE&sort=["TRENDING_DESC"]&page=${page}&perPage=24`);
      return res.data;
    };

    const data = await fetchWithFallback(path, fallbackFn);
    return normalizeApiResponse(data);
  },

  /**
   * TV Series
   * Endpoint: /anime/animekai/tv
   */
  async getTv(page = 1) {
    const path = ENDPOINTS.animekai.tv(page);

    const fallbackFn = async () => {
      const res = await apiClient.get(`${ANILIST_API_URL}/advanced-search?format=TV&sort=["TRENDING_DESC"]&page=${page}&perPage=24`);
      return res.data;
    };

    const data = await fetchWithFallback(path, fallbackFn);
    return normalizeApiResponse(data);
  },

  /**
   * OVA Anime
   * Endpoint: /anime/animekai/ova
   */
  async getOva(page = 1) {
    const path = ENDPOINTS.animekai.ova(page);

    const fallbackFn = async () => {
      const res = await apiClient.get(`${ANILIST_API_URL}/advanced-search?format=OVA&sort=["POPULARITY_DESC"]&page=${page}&perPage=24`);
      return res.data;
    };

    const data = await fetchWithFallback(path, fallbackFn);
    return normalizeApiResponse(data);
  },

  /**
   * ONA Anime
   * Endpoint: /anime/animekai/ona
   */
  async getOna(page = 1) {
    const path = ENDPOINTS.animekai.ona(page);

    const fallbackFn = async () => {
      const res = await apiClient.get(`${ANILIST_API_URL}/advanced-search?format=ONA&sort=["POPULARITY_DESC"]&page=${page}&perPage=24`);
      return res.data;
    };

    const data = await fetchWithFallback(path, fallbackFn);
    return normalizeApiResponse(data);
  },

  /**
   * Specials
   * Endpoint: /anime/animekai/specials
   */
  async getSpecials(page = 1) {
    const path = ENDPOINTS.animekai.specials(page);

    const fallbackFn = async () => {
      const res = await apiClient.get(`${ANILIST_API_URL}/advanced-search?format=SPECIAL&sort=["POPULARITY_DESC"]&page=${page}&perPage=24`);
      return res.data;
    };

    const data = await fetchWithFallback(path, fallbackFn);
    return normalizeApiResponse(data);
  },
};

export default animeKaiApi;
