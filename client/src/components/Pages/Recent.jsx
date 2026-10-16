import React from "react";
import InfiniteSection from "../Sections/InfiniteSection";
import Navbar from "../Sections/Navbar";
import { animeKaiApi } from "../../services/api";

const RecentPage = () => {
  const recentSortTabs = [
    {
      id: "recent-episodes",
      label: "Recent Episodes",
      title: "Recent Anime Episodes",
      fetchFn: (page) => animeKaiApi.getRecentEpisodes(page),
    },
    {
      id: "recent-added",
      label: "Recently Added",
      title: "Recently Added Anime",
      fetchFn: (page) => animeKaiApi.getRecentAdded(page),
    },
    {
      id: "new-releases",
      label: "New Releases",
      title: "Newly Released Anime",
      fetchFn: (page) => animeKaiApi.getNewReleases(page),
    },
    {
      id: "latest-completed",
      label: "Latest Completed",
      title: "Recently Completed Anime",
      fetchFn: (page) => animeKaiApi.getLatestCompleted(page),
    },
    {
      id: "schedule",
      label: "Live Schedule",
      title: "Today's Airing Schedule",
      fetchFn: () => animeKaiApi.getSchedule(),
    },
  ];

  return (
    <div style={{ minHeight: "100vh", paddingBottom: 60 }}>
      <Navbar />
      <div style={{ marginTop: 10 }}>
        <InfiniteSection
          itemlimit={24}
          sectiontitle={"Recent Anime Episodes"}
          id="recent-section"
          sortTabs={recentSortTabs}
          defaultTabId="recent-episodes"
        />
      </div>
    </div>
  );
};

export default RecentPage;

