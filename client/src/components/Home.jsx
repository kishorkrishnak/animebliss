import "./Home.css";
import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "react-responsive-modal/styles.css";
import InfiniteSection from "./InfiniteSection";
import ScrollToTop from "react-scroll-to-top";
import Header from "./Header";
import MoviesSection from "./MoviesSection";
import UpcomingSection from "./UpcomingSection";
import { useRef } from "react";

import AnimeSection from "./AnimeSection";
export const SharedState = React.createContext();
export default function Home({ navstate }) {
  const [active, setActive] = useState("nav__menu");
  const [icon, setIcon] = useState("nav__toggler");
  const location = useLocation();

  // useEffect(() => {
  //   const onPageLoad = () => {
  //     document.querySelector("#popular").scrollIntoView();
  //   };

  //   if (document.readyState === "complete") {
  //     onPageLoad();
  //   } else {
  //     window.addEventListener("load", onPageLoad);
  //     return () => window.removeEventListener("load", onPageLoad);
  //   }
  // }, []);

  return (
    <SharedState.Provider
      value={{
        setActive,
        setIcon,
        active,

        icon,
      }}
    >
      <>
        <Header navstate={navstate}></Header>
        <UpcomingSection></UpcomingSection>
        <AnimeSection
          url={
            "https://consumet-api.herokuapp.com/meta/anilist/recent-episodes"
          }
          id={"recent"}
          sectiontitle={"Recent Episodes"}
        ></AnimeSection>
        <AnimeSection
          url={"https://consumet-api.herokuapp.com/meta/anilist/trending"}
          id={"trending"}
          sectiontitle={"Trending"}
        ></AnimeSection>

        <InfiniteSection
          url={"https://consumet-api.herokuapp.com/meta/anilist/popular"}
          itemlimit={18}
          sectiontitle={"Most Popular"}
          id="popular"
          querytype={"?"}
        ></InfiniteSection>

        {/* <PopularSection></PopularSection> */}
        <ScrollToTop top={1500} smooth color="#6f00ff" />
      </>
    </SharedState.Provider>
  );
}
