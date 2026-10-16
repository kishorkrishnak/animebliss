import React from "react";
import InfiniteSection from "../Sections/InfiniteSection";
import Navbar from "../Sections/Navbar";
import { animeKaiApi, providerApi } from "../../services/api";

const MoviesPage = () => {
  const formatSortTabs = [
    {
      id: "movies",
      label: "Movies",
      title: "Anime Feature Films & Movies",
      fetchFn: (page) => animeKaiApi.getMovies(page),
    },
    {
      id: "tv",
      label: "TV Series",
      title: "Anime Television Series",
      fetchFn: (page) => animeKaiApi.getTv(page),
    },
    {
      id: "ova",
      label: "OVA",
      title: "Original Video Animations (OVA)",
      fetchFn: (page) => animeKaiApi.getOva(page),
    },
    {
      id: "ona",
      label: "ONA",
      title: "Original Net Animations (ONA)",
      fetchFn: (page) => animeKaiApi.getOna(page),
    },
    {
      id: "specials",
      label: "Specials",
      title: "Anime Specials & Side Stories",
      fetchFn: (page) => animeKaiApi.getSpecials(page),
    },
    {
      id: "dubbed",
      label: "Dubbed",
      title: "English Dubbed Anime",
      fetchFn: (page) => providerApi.getHiAnimeDubbed(page),
    },
  ];

  return (
    <div style={{ minHeight: "100vh", paddingBottom: 60 }}>
      <Navbar />
      <div style={{ marginTop: 10 }}>
        <InfiniteSection
          itemlimit={24}
          sectiontitle={"Anime Movies & Formats"}
          id="movies"
          sortTabs={formatSortTabs}
          defaultTabId="movies"
        />
      </div>
    </div>
  );
};

export default MoviesPage;

