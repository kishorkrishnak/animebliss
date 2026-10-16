import axios from "axios";
import { CONSUMET_API_URL, CONSUMET_FALLBACK_URL } from "./config";

// Standard request timeout
const REQUEST_TIMEOUT = 10000;

// Create axios instance
const apiClient = axios.create({
  timeout: REQUEST_TIMEOUT,
  headers: {
    Accept: "application/json",
  },
});

/**
 * Normalizes API response to standard structure: { results: [...], currentPage: 1, hasNextPage: false }
 */
export const normalizeApiResponse = (data) => {
  if (!data) {
    return { results: [], currentPage: 1, hasNextPage: false };
  }

  // If data itself is an array
  if (Array.isArray(data)) {
    return {
      results: data,
      currentPage: 1,
      hasNextPage: false,
    };
  }

  // If standard results wrapper
  const results = data.results || data.data || [];
  return {
    results: Array.isArray(results) ? results : [],
    currentPage: data.currentPage || data.page || 1,
    hasNextPage: Boolean(data.hasNextPage),
    ...data,
  };
};

/**
 * Resilient API fetcher:
 * 1. Tries primary CONSUMET_API_URL
 * 2. If it fails (redirect, 404, rate limit, network error), tries CONSUMET_FALLBACK_URL
 * 3. Returns normalized data or invokes optional custom fallback
 */
export const fetchWithFallback = async (path, customFallbackFn = null) => {
  const primaryUrl = `${CONSUMET_API_URL}${path}`;

  try {
    const response = await apiClient.get(primaryUrl);
    // Ensure we actually got valid data (not HTML redirect page)
    if (response.data && typeof response.data === "object") {
      return response.data;
    }
    throw new Error("Invalid response format from primary API");
  } catch (primaryError) {
    // Attempt fallback mirror if primary URL differs from fallback
    if (CONSUMET_FALLBACK_URL && CONSUMET_API_URL !== CONSUMET_FALLBACK_URL) {
      try {
        const fallbackUrl = `${CONSUMET_FALLBACK_URL}${path}`;
        const fallbackResponse = await apiClient.get(fallbackUrl);
        if (fallbackResponse.data && typeof fallbackResponse.data === "object") {
          return fallbackResponse.data;
        }
      } catch (fallbackError) {
        // Fallback mirror failed, proceed to custom fallback if provided
      }
    }

    // If custom fallback function was provided, execute it
    if (typeof customFallbackFn === "function") {
      try {
        const customData = await customFallbackFn();
        return customData;
      } catch (customErr) {
        // Both primary and custom fallbacks exhausted
      }
    }

    // Return empty normalized object rather than crashing the caller
    return { results: [], currentPage: 1, hasNextPage: false };
  }
};

export default apiClient;
