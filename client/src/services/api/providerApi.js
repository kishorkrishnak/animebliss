import apiClient, { fetchWithFallback, normalizeApiResponse } from "./client";
import { ENDPOINTS, ANILIST_API_URL } from "./config";
import animeParadiseApi from "./animeParadiseApi";

const getTitles = (anime) => {
  const title = anime?.title;
  const titles = typeof title === "string"
    ? [title]
    : [title?.english, title?.romaji, title?.native];
  return [...new Set([...titles, anime?.name].filter(Boolean))];
};

const normalizeTitle = (title) => String(title || "")
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, " ")
  .trim();

const titleScore = (candidate, titles) => {
  const candidateTitle = normalizeTitle(
    typeof candidate?.title === "string"
      ? candidate.title
      : candidate?.title?.english || candidate?.title?.romaji || candidate?.name
  );
  if (!candidateTitle) return 0;

  return titles.reduce((best, title) => {
    const normalized = normalizeTitle(title);
    if (!normalized) return best;
    if (normalized === candidateTitle) return Math.max(best, 3);
    if (normalized.includes(candidateTitle) || candidateTitle.includes(normalized)) {
      return Math.max(best, 2);
    }
    return best;
  }, 0);
};

const getProviderEpisode = async (provider, anime, episode) => {
  const titles = getTitles(anime);
  const episodeNumber = Number(episode?.number || episode?.episodeNumber);
  if (!titles.length || !Number.isFinite(episodeNumber) || episodeNumber < 1) return null;

  const routes = {
    animepahe: {
      search: ENDPOINTS.providers.animepaheSearch,
      info: ENDPOINTS.providers.animepaheInfo,
    },
    animesaturn: {
      search: ENDPOINTS.providers.animesaturnSearch,
      info: ENDPOINTS.providers.animesaturnInfo,
    },
    animeunity: {
      search: ENDPOINTS.providers.animeunitySearch,
      info: ENDPOINTS.providers.animeunityInfo,
    },
  }[provider];
  if (!routes) return null;

  for (const title of titles) {
    const searchData = await fetchWithFallback(routes.search(title));
    const results = Array.isArray(searchData)
      ? searchData
      : searchData?.results || searchData?.data || [];
    const candidates = Array.isArray(results)
      ? results
          .map((item) => ({ item, score: titleScore(item, titles) }))
          .filter(({ score }) => score > 0)
          .sort((a, b) => b.score - a.score)
          .slice(0, 3)
      : [];

    for (const { item } of candidates) {
      if (!item?.id) continue;
      const info = await fetchWithFallback(routes.info(item.id));
      const episodes = Array.isArray(info?.episodes) ? info.episodes : [];
      const mappedEpisode = episodes.find((candidate) =>
        Number(candidate.number || candidate.episodeNumber) === episodeNumber
      ) || (episodes.every((candidate) => candidate.number == null && candidate.episodeNumber == null)
        ? episodes[episodeNumber - 1]
        : null);

      if (mappedEpisode?.id) return mappedEpisode;
    }
  }

  return null;
};

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

  /** Resolve each provider's own anime and episode IDs before requesting its stream. */
  async resolveEpisodeStream(anime, episode, preferredProvider = "animekai", preferredServer = null) {
    if (!anime || !episode?.id) return null;

    const providers = ["animeparadise", "animekai", "animepahe", "animesaturn", "animeunity"];
    const orderedProviders = [
      preferredProvider,
      ...providers.filter((provider) => provider !== preferredProvider),
    ].filter((provider) => providers.includes(provider));

    for (const provider of orderedProviders) {
      try {
        if (provider === "animeparadise") {
          const data = await animeParadiseApi.getWatch(anime, episode);
          if (Array.isArray(data?.sources) && data.sources.length > 0) {
            return { provider, data };
          }
          continue;
        }

        let providerEpisodeId = episode.id;
        if (provider !== "animekai") {
          const mappedEpisode = await getProviderEpisode(provider, anime, episode);
          if (!mappedEpisode?.id) continue;
          providerEpisodeId = mappedEpisode.id;
        }

        const path = provider === "animekai"
          ? ENDPOINTS.animekai.watch(
              providerEpisodeId,
              provider === preferredProvider ? preferredServer : null
            )
          : provider === "animepahe"
            ? ENDPOINTS.providers.animepaheWatch(providerEpisodeId)
            : provider === "animesaturn"
              ? ENDPOINTS.providers.animesaturnWatch(providerEpisodeId)
              : ENDPOINTS.providers.animeunityWatch(providerEpisodeId);
        const data = await fetchWithFallback(path);
        if (Array.isArray(data?.sources) && data.sources.length > 0) {
          return { provider, data };
        }
      } catch (err) {
        // Continue with the next provider when lookup or playback fails.
      }
    }

    return null;
  },
};

export default providerApi;
