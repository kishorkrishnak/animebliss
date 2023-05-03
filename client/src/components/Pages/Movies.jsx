import InfiniteSection from "../Sections/InfiniteSection";
import Navbar from "../Sections/Navbar";
import React from "react";
const MoviesPage = () => {
  return (
    <>
      <Navbar></Navbar>
      <InfiniteSection
        url={
          "https://api.consumet.org/meta/anilist/advanced-search?format=MOVIE"
        }
        itemlimit={21}
        sectiontitle={"Top Anime Movies"}
        id="movies"
        querytype={"&"}
      ></InfiniteSection>
    </>
  );
};
export default MoviesPage;
