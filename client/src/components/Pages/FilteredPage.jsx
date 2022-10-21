import { setConfiguration } from "react-grid-system";
import { useLocation } from "react-router-dom";
import InfiniteSection from "../Sections/InfiniteSection";
import "./GenresPage.css";
import { useState } from "react";
import Navbar from "../Sections/Navbar";
setConfiguration({ breakpoints: [768, 1170, 1500, 1700, 1800, 1900] });
const GenresPage = () => {
  const location = useLocation();
  const [queryUrl, setQueryUrl] = useState(
    location.state.type === "genre"
      ? "https://api.consumet.org/meta/anilist/advanced-search?genres=[" +
          '"' +
          location.state.value +
          '"' +
          "]"
      : "https://api.consumet.org/meta/anilist/advanced-search?" +
          location.state.type +
          "=" +
          location.state.value
  );
  return (
    <>
      <Navbar></Navbar>
      {queryUrl && queryUrl !== "" && (
        <InfiniteSection
          isGenresPage={true}
          url={queryUrl}
          sectiontitle={"Filter Results"}
          itemlimit={21}
          id="filterresults"
          querytype={"&"}
        ></InfiniteSection>
      )}
    </>
  );
};

export default GenresPage;
