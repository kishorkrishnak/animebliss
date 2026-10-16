import React, { useMemo } from "react";
import { useLocation, useParams } from "react-router-dom";
import InfiniteSection from "../Sections/InfiniteSection";
import Navbar from "../Sections/Navbar";
import "./Genres.css";

import { CONSUMET_API_URL } from "../../services/api";

const FilteredPage = () => {
  const location = useLocation();
  const params = useParams();

  const filterType = params.type || location.state?.type || "genre";
  const filterValue = params.value || location.state?.value || "Action";

  const baseQueryUrl = useMemo(() => {
    const formattedVal = filterValue.toUpperCase();
    const currentYear = new Date().getFullYear();

    if (filterType.toLowerCase() === "genre") {
      return `${CONSUMET_API_URL}/meta/anilist/advanced-search?genres=["${filterValue}"]`;
    }
    if (filterType.toLowerCase() === "season") {
      return `${CONSUMET_API_URL}/meta/anilist/advanced-search?season=${formattedVal}&year=${currentYear}`;
    }
    return `${CONSUMET_API_URL}/meta/anilist/advanced-search?${filterType}=${formattedVal}`;
  }, [filterType, filterValue]);

  const sortTabs = useMemo(() => {
    return [
      {
        id: "trending",
        label: "Trending",
        queryParam: 'sort=["TRENDING_DESC"]',
      },
      {
        id: "new-releasing",
        label: "New & Airing",
        queryParam: 'status=RELEASING&sort=["START_DATE_DESC"]',
      },
      {
        id: "top-rated",
        label: "Top Rated",
        queryParam: 'sort=["SCORE_DESC"]',
      },
      {
        id: "popular",
        label: "Popular",
        queryParam: 'sort=["POPULARITY_DESC"]',
      },
    ];
  }, []);

  const displayTitle = `${filterValue.charAt(0).toUpperCase() + filterValue.slice(1).replace("_", " ")} Anime`;

  return (
    <div style={{ minHeight: "100vh", paddingBottom: 60 }}>
      <Navbar />
      <div style={{ marginTop: 20 }}>
        <InfiniteSection
          isGenresPage={true}
          url={baseQueryUrl}
          sectiontitle={displayTitle}
          itemlimit={24}
          id="filterresults"
          querytype={"&"}
          sortTabs={sortTabs}
          defaultTabId="trending"
        />
      </div>
    </div>
  );
};

export default FilteredPage;
