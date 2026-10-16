import React from "react";
import { useLocation, useParams } from "react-router-dom";
import InfiniteSection from "./InfiniteSection";
import Navbar from "./Navbar";

import { ANILIST_API_URL } from "../../services/api";

const MoreSection = () => {
  const location = useLocation();
  const params = useParams();

  const sectionParam = params.section ? decodeURIComponent(params.section) : "Anime";
  const sectionTitle = location.state?.sectionTitle || sectionParam.charAt(0).toUpperCase() + sectionParam.slice(1);

  const sLower = sectionParam.toLowerCase();

  let fallbackUrl = `${ANILIST_API_URL}/advanced-search?sort=["TRENDING_DESC"]`;
  let defaultTab = "trending";

  if (sLower.includes("recent") || sLower.includes("latest") || sLower.includes("airing-schedule")) {
    fallbackUrl = `${ANILIST_API_URL}/airing-schedule`;
    defaultTab = "trending";
  } else if (sLower.includes("new") || sLower.includes("release")) {
    fallbackUrl = `${ANILIST_API_URL}/advanced-search?status=RELEASING&sort=["START_DATE_DESC"]`;
    defaultTab = "new-releasing";
  } else if (sLower.includes("top") || sLower.includes("popular-airing")) {
    fallbackUrl = `${ANILIST_API_URL}/advanced-search?status=RELEASING&sort=["POPULARITY_DESC"]`;
    defaultTab = "top-airing";
  } else if (sLower.includes("trending")) {
    fallbackUrl = `${ANILIST_API_URL}/trending`;
    defaultTab = "trending";
  }

  const finalUrl = location.state?.url || fallbackUrl;

  const moreSortTabs = [
    {
      id: "trending",
      label: "Trending",
      title: "Trending Anime",
      queryParam: 'sort=["TRENDING_DESC"]',
    },
    {
      id: "new-releasing",
      label: "New & Airing",
      title: "New & Airing Releases",
      queryParam: 'status=RELEASING&sort=["START_DATE_DESC"]',
    },
    {
      id: "top-airing",
      label: "Top Airing",
      title: "Top Airing Shows",
      queryParam: 'status=RELEASING&sort=["POPULARITY_DESC"]',
    },
    {
      id: "top-rated",
      label: "Top Rated",
      title: "Top Rated Anime",
      queryParam: 'sort=["SCORE_DESC"]',
    },
    {
      id: "popular",
      label: "Popular",
      title: "Popular Anime",
      queryParam: 'sort=["POPULARITY_DESC"]',
    },
  ];

  return (
    <div style={{ minHeight: "100vh", paddingBottom: 60 }}>
      <Navbar />
      <div style={{ maxWidth: 1680, margin: "90px auto 20px", padding: "0 28px" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "var(--text-primary)" }}>
          {sectionTitle}
        </h1>
      </div>
      <InfiniteSection
        itemlimit={24}
        id="more-section"
        querytype={finalUrl.includes("?") ? "&" : "?"}
        url={finalUrl}
        sortTabs={moreSortTabs}
        defaultTabId={defaultTab}
      />
    </div>
  );
};

export default MoreSection;
