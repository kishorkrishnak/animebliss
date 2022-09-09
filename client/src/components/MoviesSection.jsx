import InfiniteSection from "./InfiniteSection";
import Navbar from "./Navbar";
import React from "react";

const MoviesSection = () => {
  return (
    <>
      <Navbar></Navbar>
      <InfiniteSection
        url={
          "https://consumet-api.herokuapp.com/meta/anilist/advanced-search?format=MOVIE"
        }
        itemlimit={18}
        sectiontitle={"Top Anime Movies"}
        id="movies"
        querytype={"&"}
      
      ></InfiniteSection>
    </>
  );
};

export default MoviesSection;
