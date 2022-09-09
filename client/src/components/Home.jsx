import "./Home.css";
import React, { useState } from "react";
import "react-responsive-modal/styles.css";
import InfiniteSection from "./InfiniteSection";
import ScrollToTop from "react-scroll-to-top";
import Header from "./Header";
import MoviesSection from "./MoviesSection";
import UpcomingSection from "./UpcomingSection";
import PopularSection from "./PopularSection";
import AnimeSection from "./AnimeSection";
import RecentSection from "./RecentSection";
export const SharedState = React.createContext();
export default function Home({ navstate }) {
  const [active, setActive] = useState("nav__menu");
  const [icon, setIcon] = useState("nav__toggler");

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
       
        <PopularSection></PopularSection>
        <ScrollToTop top={1500} smooth color="#6f00ff" />
      </>
    </SharedState.Provider>
  );
}
