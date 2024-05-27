import { setConfiguration } from "react-grid-system";
import { useLocation } from "react-router-dom";
import InfiniteSection from "../Sections/InfiniteSection";
import "./Genres.css";
import { useState } from "react";
import Navbar from "../Sections/Navbar";
setConfiguration({ breakpoints: [768, 1170, 1500, 1700, 1800, 1900] });
const GenresPage = () => {
  const location = useLocation();
  const baseURL = process.env.REACT_APP_CONSUMET_API_URL;
  const [queryUrl, setQueryUrl] = useState(
    location.state.type === "genre"
      ? `${baseURL}/meta/anilist/advanced-search?genres=[` +
          '"' +
          location.state.value +
          '"' +
          "]"
      : `${baseURL}/meta/anilist/advanced-search?` +
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
          sectiontitle={`${location.state.value}`}
          itemlimit={24}
          id="filterresults"
          querytype={"&"}
        ></InfiniteSection>
      )}
    </>
  );
};

export default GenresPage;
