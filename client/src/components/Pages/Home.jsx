import "./Home.css";
import React from "react";
import InfiniteSection from "../Sections/InfiniteSection";
import ScrollToTop from "react-scroll-to-top";
import Header from "../Sections/Header";
import UpcomingSection from "../Sections/UpcomingSection";
import AnimeSection from "../Sections/AnimeSection";
import { Toaster } from "react-hot-toast";

const Home = () => {
  return (
    <>
      <Header></Header>
      <UpcomingSection></UpcomingSection>
      <AnimeSection
        url={"https://api.consumet.org/meta/anilist/recent-episodes"}
        id={"recent"}
        sectiontitle={"Recent"}
      ></AnimeSection>
      <AnimeSection
        url={"https://api.consumet.org/meta/anilist/trending"}
        id={"trending"}
        sectiontitle={"Trending"}
      ></AnimeSection>
      <AnimeSection
        url={
          "https://api.consumet.org/meta/anilist/advanced-search?format=SPECIAL"
        }
        id={"special"}
        sectiontitle={"Special"}
      ></AnimeSection>
      <InfiniteSection
        url={"https://api.consumet.org/meta/anilist/popular"}
        itemlimit={21}
        sectiontitle={"Most Popular"}
        id="popular"
        querytype={"?"}
      ></InfiniteSection>

      <ScrollToTop
        style={{
          border: "1px solid dodgerblue",
          background: "rgb(33, 33, 33)",
          opacity: 0.5,
          color: "white",
          boxShadow: "none",
          borderTopLeftRadius: 10,
          borderBottomLeftRadius: 10,
        }}
        className="scrolltop"
        top={1500}
        smooth
        color="#fff"
      />
    </>
  );
};
export default Home;
