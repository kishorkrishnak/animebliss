import "./Home.css";
import React, { useState } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import ScrollToTop from "react-scroll-to-top";
import Header from "./Header";
import MoviesSection from "./MoviesSection";
import UpcomingSection from "./UpcomingSection";
import PopularSection from "./PopularSection";
import TrendingSection from "./TrendingSection";
export const SharedState = React.createContext();
export default function Home({navstate}) {
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

        <TrendingSection></TrendingSection>
        <MoviesSection></MoviesSection>

        <PopularSection></PopularSection>
        <ScrollToTop top={1500} smooth color="#6f00ff" />
      </>
    </SharedState.Provider>
  );
}
