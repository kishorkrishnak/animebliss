import "./Home.css";

import Header from "./Header";
import TopAiringSection from "./TopAiringSection";
import UpcomingSection from "./UpcomingSection";
import PopularSection from "./PopularSection";
import FavoriteSection from "./FavoriteSection";

export default function Home() {
  return (
    <>
      <Header></Header>
      <UpcomingSection></UpcomingSection>
      <FavoriteSection></FavoriteSection>
      <TopAiringSection></TopAiringSection>
      <PopularSection></PopularSection>

    </>
  );
}
