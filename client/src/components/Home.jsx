import "./Home.css";
import React, { useState } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import ScrollToTop from "react-scroll-to-top";
import Header from "./Header";
import TopAiringSection from "./TopAiringSection";
import UpcomingSection from "./UpcomingSection";
import PopularSection from "./PopularSection";
import AnimePlayer from "./AnimePlayer";
import FavoriteSection from "./FavoriteSection";
import RecentSection from "./RecentSection";
import TrendingSection from "./TrendingSection";
import AnimePlayerModal from "./AnimePlayerModal";
export default function Home() {
  const [open, setOpen] = useState(false);
  const [animeInfo, setAnimeInfo] = useState(null);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  return (
    <>
      <Header></Header>
      <UpcomingSection></UpcomingSection>
      <div>
        <Modal
          classNames={{
            modal: "customModal",
          }}
          open={open}
          onClose={onCloseModal}
          center
        >
          <AnimePlayer
            onOpenModal={onOpenModal}
            animeInfo={animeInfo}
          ></AnimePlayer>
        </Modal>
      </div>
      <TrendingSection
        setAnimeInfo={setAnimeInfo}
        onOpenModal={onOpenModal}
      ></TrendingSection>
      <PopularSection
        setAnimeInfo={setAnimeInfo}
        onOpenModal={onOpenModal}
      ></PopularSection>
      <ScrollToTop top={1500} smooth color="#6f00ff" />
    </>
  );
}
