import apiClient, { fetchWithFallback, normalizeApiResponse } from "./client";
import { ENDPOINTS, ANILIST_API_URL } from "./config";

/**
 * Multi-Provider Streaming & Server API Module
 * Implements additional video streaming and server discovery endpoints
 */
export const providerApi = {
  /**
   * AnimePahe Video Stream
   * Endpoint: /anime/animepahe/watch?episodeId={episodeId}
   */
  async getAnimePaheWatch(episodeId) {
    if (!episodeId) return null;
    const path = ENDPOINTS.providers.animepaheWatch(episodeId);
    return fetchWithFallback(path);
  },

  /**
   * AnimeSaturn Video Stream
   * Endpoint: /anime/animesaturn/watch/{episodeId}
   */
  async getAnimeSaturnWatch(episodeId) {
    if (!episodeId) return null;
    const path = ENDPOINTS.providers.animesaturnWatch(episodeId);
    return fetchWithFallback(path);
  },

  /**
   * AnimeUnity Video Stream
   * Endpoint: /anime/animeunity/watch/{episodeId}
   */
  async getAnimeUnityWatch(episodeId) {
    if (!episodeId) return null;
    const path = ENDPOINTS.providers.animeunityWatch(episodeId);
    return fetchWithFallback(path);
  },

  /**
   * HiAnime Dubbed Anime Releases
   * Endpoint: /anime/hianime/dubbed-anime
   */
  async getHiAnimeDubbed(page = 1) {
    const path = ENDPOINTS.providers.hianimeDubbed(page);

    const fallbackFn = async () => {
      const res = await apiClient.get(`${ANILIST_API_URL}/advanced-search?format=TV&sort=["POPULARITY_DESC"]&page=${page}&perPage=24`);
      return res.data;
    };

    const data = await fetchWithFallback(path, fallbackFn);
    return normalizeApiResponse(data);
  },

  /**
   * KickAssAnime Episode Servers
   * Endpoint: /anime/kickassanime/servers?episodeId={episodeId}
   */
  async getKickAssAnimeServers(episodeId) {
    if (!episodeId) return [];
    const path = ENDPOINTS.providers.kickassanimeServers(episodeId);
    const data = await fetchWithFallback(path);
    return Array.isArray(data) ? data : (data?.servers || []);
  },

  /**
   * Resilient Multi-Provider Stream Resolver:
   * Tries AnimeKai first, then AnimePahe, AnimeSaturn, AnimeUnity, and finally AniList/Gogoanime
   */
  async resolveEpisodeStream(episodeId, preferredProvider = "animekai") {
    if (!episodeId) return null;

    // 1. Try AnimeKai if preferred
    if (preferredProvider === "animekai" || !preferredProvider) {
      try {
        const kaiData = await fetchWithFallback(ENDPOINTS.animekai.watch(episodeId));
        if (kaiData && kaiData.sources && kaiData.sources.length > 0) {
          return { provider: "animekai", data: kaiData };
        }
      } catch (err) {
        // Fall through to next provider
      }
    }

    // 2. Try AnimePahe
    if (preferredProvider === "animepahe" || preferredProvider === "animekai") {
      try {
        const paheData = await fetchWithFallback(ENDPOINTS.providers.animepaheWatch(episodeId));
        if (paheData && paheData.sources && paheData.sources.length > 0) {
          return { provider: "animepahe", data: paheData };
        }
      } catch (err) {
        // Fall through
      }
    }

    // 3. Try AnimeSaturn
    try {
      const saturnData = await fetchWithFallback(ENDPOINTS.providers.animesaturnWatch(episodeId));
      if (saturnData && saturnData.sources && saturnData.sources.length > 0) {
        return { provider: "animesaturn", data: saturnData };
      }
    } catch (err) {
      // Fall through
    }

    // 4. Try AnimeUnity
    try {
      const unityData = await fetchWithFallback(ENDPOINTS.providers.animeunityWatch(episodeId));
      if (unityData && unityData.sources && unityData.sources.length > 0) {
        return { provider: "animeunity", data: unityData };
      }
    } catch (err) {
      // Fall through
    }

    // 5. High-reliability AniList / Gogoanime Meta fallback
    try {
      const anilistData = await apiClient.get(`${ANILIST_API_URL}/watch/${encodeURIComponent(episodeId)}?provider=gogoanime`);
      if (anilistData?.data?.sources && anilistData.data.sources.length > 0) {
        return { provider: "anilist-gogoanime", data: anilistData.data };
      }
    } catch (err) {
      // Fallback failed
    }

    return null;
  },
};

export default providerApi;
