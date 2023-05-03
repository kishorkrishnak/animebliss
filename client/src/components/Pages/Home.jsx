import React from "react";
import ScrollToTop from "react-scroll-to-top";
import AnimeSection from "../Sections/AnimeSection";
import Header from "../Sections/Header";
import InfiniteSection from "../Sections/InfiniteSection";
import UpcomingSection from "../Sections/UpcomingSection";
import "./Home.css";
const Home = () => {
  const baseURl = process.env.REACT_APP_ANIME_BASE_URL;

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
        itemlimit={18}
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
