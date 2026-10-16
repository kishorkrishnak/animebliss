import axios from "axios";

const API_URL = "https://api.animeparadise.moe";
const STREAM_URL = "https://stream.animeparadise.moe";

const client = axios.create({
  baseURL: API_URL,
  timeout: 20000,
  headers: { Accept: "application/json" },
});

const normalizeTitle = (title) => String(title || "")
  .toLowerCase()
  .replace(/&/g, " and ")
  .replace(/[^a-z0-9]+/g, " ")
  .trim();

const getAniListTitles = (anime) => {
  const title = anime?.title;
  return [...new Set([
    title?.english,
    title?.romaji,
    title?.userPreferred,
    title?.native,
    ...(Array.isArray(anime?.synonyms) ? anime.synonyms : []),
  ].filter(Boolean))];
};

const titleScore = (candidate, titles) => {
  const candidateTitles = [
    candidate?.title,
    candidate?.alternativeTitle?.english,
    candidate?.alternativeTitle?.romaji,
    candidate?.alternativeTitle?.native,
  ].map(normalizeTitle).filter(Boolean);

  return titles.reduce((best, title) => {
    const normalized = normalizeTitle(title);
    if (!normalized) return best;
    if (candidateTitles.includes(normalized)) return Math.max(best, 3);
    if (candidateTitles.some((candidateTitle) =>
      candidateTitle.includes(normalized) || normalized.includes(candidateTitle)
    )) return Math.max(best, 1);
    return best;
  }, 0);
};

const getYear = (date) => {
  if (date && typeof date === "object") return Number(date.year) || 0;
  return Number(String(date || "").slice(0, 4)) || 0;
};

const searchTitle = async (title, titles, year) => {
  const response = await client.get("/search", { params: { q: title } });
  const results = Array.isArray(response.data?.data) ? response.data.data : [];
  const scored = results
    .map((item) => {
      let score = titleScore(item, titles);
      const candidateYear = Number(item?.animeSeason?.year) || getYear(item?.startDate);
      if (year && candidateYear && year === candidateYear) score += 0.25;
      return { item, score };
    })
    .filter(({ item, score }) => item?._id && score >= 1)
    .sort((a, b) => b.score - a.score);

  return scored[0]?.item || null;
};

/** Map AniList metadata to AnimeParadise's catalog and normalize its episode IDs. */
const getInfo = async (metadata) => {
  const titles = getAniListTitles(metadata);
  if (!titles.length) return null;

  const year = getYear(metadata?.startDate);
  let match = null;
  for (const title of titles) {
    try {
      match = await searchTitle(title, titles, year);
      if (match) break;
    } catch (error) {
      // Try the next AniList title variant before giving up.
    }
  }
  if (!match) return null;

  const response = await client.get(`/anime/${encodeURIComponent(match._id)}/episode`);
  const rawEpisodes = Array.isArray(response.data?.data) ? response.data.data : [];
  const episodes = rawEpisodes
    .filter((episode) => episode?.uid && Number.isFinite(Number(episode.number)))
    .map((episode) => ({
      id: episode.uid,
      number: Number(episode.number),
      title: episode.title || `Episode ${episode.number}`,
      image: episode.image || episode.thumbnail || null,
      sourceId: episode._id,
    }))
    .sort((a, b) => a.number - b.number);

  if (!episodes.length) return null;
  return {
    ...metadata,
    animeParadiseId: match._id,
    episodes,
  };
};

const getWatch = async (anime, episode) => {
  if (!anime?.animeParadiseId || !episode?.id) return null;

  const response = await client.get(`/ep/${encodeURIComponent(episode.id)}`, {
    params: { origin: anime.animeParadiseId },
  });
  const streamLink = response.data?.data?.episode?.streamLink;
  if (!streamLink) return null;

  const playlistUrl = `${STREAM_URL}/m3u8?url=${encodeURIComponent(streamLink)}`;
  const playlist = await axios.get(playlistUrl, {
    timeout: 20000,
    responseType: "text",
    headers: { Accept: "application/vnd.apple.mpegurl, application/x-mpegURL, text/plain" },
  });
  if (typeof playlist.data !== "string" || !playlist.data.trimStart().startsWith("#EXTM3U")) {
    return null;
  }

  return {
    sources: [{ url: playlistUrl, quality: "auto", isM3U8: true }],
    headers: {},
  };
};

export const animeParadiseApi = { getInfo, getWatch };
export default animeParadiseApi;
