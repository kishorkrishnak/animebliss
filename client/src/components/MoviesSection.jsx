import InfiniteSection from "./InfiniteSection";
import Navbar from "./Navbar";
import React from "react";

const MoviesSection = () => {
  return (
    <>
      <InfiniteSection
        url={
          "https://consumet-api.herokuapp.com/meta/anilist/advanced-search?format=MOVIE"
        }
        itemlimit={18}
        sectiontitle={"Top Anime Movies"}
      ></InfiniteSection>
    </>
  );
};

export default MoviesSection;
