import apiClient, { fetchWithFallback, normalizeApiResponse } from "./client";
import { ENDPOINTS, ANILIST_API_URL } from "./config";

const normalizeTitle = (title) => String(title || "")
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, " ")
  .trim();

const getAniListTitles = (anime) => {
  const title = anime?.title;
  return [...new Set([
    title?.english,
    title?.romaji,
    title?.native,
    title?.userPreferred,
    ...(Array.isArray(anime?.synonyms) ? anime.synonyms : []),
  ].filter(Boolean))];
};

const findAnimeKaiMatch = (results, titles) => {
  const candidates = Array.isArray(results) ? results : results?.results || [];
  const normalizedTitles = titles.map(normalizeTitle).filter(Boolean);
  const scored = candidates.map((candidate) => {
    const candidateTitle = normalizeTitle(
      typeof candidate?.title === "string"
        ? candidate.title
        : candidate?.title?.english || candidate?.title?.romaji || candidate?.title?.userPreferred || candidate?.name,
    );
    const score = normalizedTitles.reduce((best, title) => {
      if (title === candidateTitle) return Math.max(best, 3);
      if (title && candidateTitle && (title.includes(candidateTitle) || candidateTitle.includes(title))) {
        return Math.max(best, 2);
      }
      return best;
    }, 0);
    return { candidate, score };
  });

  return scored.sort((a, b) => b.score - a.score).find(({ candidate, score }) => score > 0 && candidate?.id)?.candidate;
};

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

    // Several catalog sections use AniList IDs, while AnimeKai has its own slugs.
    // Resolve AniList IDs through metadata first so the player receives AnimeKai episode IDs.
    if (/^\d+$/.test(String(id))) {
      const metadataResponse = await apiClient.get(`${ANILIST_API_URL}/data/${encodeURIComponent(id)}`);
      const metadata = metadataResponse.data;
      const titles = getAniListTitles(metadata).slice(0, 2);

      for (const title of titles) {
        const searchData = await fetchWithFallback(ENDPOINTS.animekai.search(title));
        const match = findAnimeKaiMatch(searchData, titles);
        if (!match?.id) continue;

        const providerInfo = await fetchWithFallback(ENDPOINTS.animekai.info(match.id));
        if (Array.isArray(providerInfo?.episodes) && providerInfo.episodes.length > 0) {
          return {
            ...providerInfo,
            ...metadata,
            id: providerInfo.id,
            title: metadata.title || providerInfo.title,
            episodes: providerInfo.episodes,
          };
        }
      }

      // Keep AniList details visible even when the streaming catalog has no match.
      return metadata;
    }

    const path = ENDPOINTS.animekai.info(id);

    const fallbackFn = async () => {
      const res = await apiClient.get(`${ANILIST_API_URL}/data/${encodeURIComponent(id)}`);
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
    const data = await fetchWithFallback(path);
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
