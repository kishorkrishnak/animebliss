import React, { useState } from "react";
import ScrollToTop from "react-scroll-to-top";
import AnimeSection from "../Sections/AnimeSection";
import Hero from "../Sections/Hero";
import ContinueWatching from "../Sections/ContinueWatching";
import InfiniteSection from "../Sections/InfiniteSection";
import UpcomingSection from "../Sections/UpcomingSection";
import { ANILIST_API_URL, animeKaiApi } from "../../services/api";
import "./Home.css";

const Home = () => {
  const [heroSectionLoaded, setHeroSectionLoaded] = useState(true);

  return (
    <div className="home-page">
      <Hero setHeroSectionLoaded={setHeroSectionLoaded} />

      {heroSectionLoaded && (
        <main className="home-content">
          {/* Continue Watching (local-first history) */}
          <ContinueWatching />

          {/* Upcoming Section with Trailer Player */}
          <UpcomingSection />

          {/* Trending Anime Carousel */}
          <AnimeSection
            url={`${ANILIST_API_URL}/trending`}
            id={"trending"}
            sectiontitle={"Trending Anime"}
          />

          {/* Latest Episodes (Real-time live airing via AnimeKai) */}
          <AnimeSection
            fetchFn={() => animeKaiApi.getRecentEpisodes(1)}
            id={"latest-episodes"}
            sectiontitle={"Latest Episodes"}
          />

          {/* New & Releasing Anime (Fresh releases via AnimeKai) */}
          <AnimeSection
            fetchFn={() => animeKaiApi.getNewReleases(1)}
            id={"new-releases"}
            sectiontitle={"New & Releasing Anime"}
          />

          {/* Top Airing This Season (Active seasonal hits) */}
          <AnimeSection
            url={`${ANILIST_API_URL}/advanced-search?status=RELEASING&sort=["POPULARITY_DESC"]`}
            id={"top-airing"}
            sectiontitle={"Top Airing This Season"}
          />

          {/* Interactive Dynamic Discover Section - titles change per filter */}
          <InfiniteSection
            itemlimit={18}
            sectiontitle={"Explore Anime"}
            id="explore-anime"
            defaultTabId="trending"
            sortTabs={[
              {
                id: "trending",
                label: "Trending",
                title: "Trending Anime",
                fetchFn: (p) => animeKaiApi.getSpotlight(),
              },
              {
                id: "new-releasing",
                label: "New & Airing",
                title: "New & Airing Releases",
                fetchFn: (p) => animeKaiApi.getNewReleases(p),
              },
              {
                id: "latest-completed",
                label: "Completed",
                title: "Recently Completed Anime",
                fetchFn: (p) => animeKaiApi.getLatestCompleted(p),
              },
              {
                id: "top-rated",
                label: "Top Rated",
                title: "Top Rated Anime",
                url: `${ANILIST_API_URL}/advanced-search?sort=["SCORE_DESC"]`,
              },
              {
                id: "popular",
                label: "Popular",
                title: "Popular Anime",
                url: `${ANILIST_API_URL}/popular`,
              },
            ]}
          />
        </main>
      )}

      <ScrollToTop
        style={{
          border: "1px solid rgba(255, 255, 255, 0.12)",
          background: "rgba(20, 23, 32, 0.9)",
          backdropFilter: "blur(10px)",
          borderRadius: "50%",
          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.4)",
          color: "#fff",
        }}
        className="scrolltop"
        top={800}
        smooth
        color="#ffffff"
      />
    </div>
  );
};

export default Home;
