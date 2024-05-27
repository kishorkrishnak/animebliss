import InfiniteSection from "../Sections/InfiniteSection";
import Navbar from "../Sections/Navbar";
import React from "react";
const MoviesPage = () => {
  const baseURL = process.env.REACT_APP_CONSUMET_API_URL

  return (
    <>
      <Navbar></Navbar>
      <InfiniteSection
        url={
          `${baseURL}/meta/anilist/advanced-search?format=MOVIE`
        }
        itemlimit={18}
        sectiontitle={"Top Anime Movies"}
        id="movies"
        querytype={"&"}
      ></InfiniteSection>
    </>
  );
};
export default MoviesPage;
