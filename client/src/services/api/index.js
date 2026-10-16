/**
 * AnimeBliss Unified API Service Layer
 * Central export of all API endpoints, clients, and providers
 */

export * from "./config";
export { default as apiClient, fetchWithFallback, normalizeApiResponse } from "./client";
export { default as animeKaiApi } from "./animeKaiApi";
export { default as providerApi } from "./providerApi";
