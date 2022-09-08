import "./Home.css";
import React, { useState } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import ScrollToTop from "react-scroll-to-top";
import Header from "./Header";
import MoviesSection from "./MoviesSection";
import UpcomingSection from "./UpcomingSection";
import PopularSection from "./PopularSection";
import AnimePlayer from "./AnimePlayer";
import TrendingSection from "./TrendingSection";
export default function Home() {
  const [open, setOpen] = useState(false);
  const [animeInfo, setAnimeInfo] = useState(null);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const closeIcon = (
    <svg fill="currentColor" viewBox="0 0 20 20" width={28} height={28}>
      <path
        fillRule="evenodd"
        d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
  return (
    <>
      <Header onOpenModal={onOpenModal} setAnimeInfo={setAnimeInfo}></Header>
      <UpcomingSection></UpcomingSection>
      <Modal
        classNames={{
          modal: "customModal",

          modalAnimationIn: "customEnterModalAnimation",
          modalAnimationOut: "customLeaveModalAnimation",
        }}
        open={open}
        onClose={onCloseModal}
        center
        showCloseIcon={true}
        closeIcon={closeIcon}
        animationDuration={600}
      >
        <AnimePlayer
          onOpenModal={onOpenModal}
          animeInfo={animeInfo}
        ></AnimePlayer>
      </Modal>
      <TrendingSection
        setAnimeInfo={setAnimeInfo}
        onOpenModal={onOpenModal}
      ></TrendingSection>
      <MoviesSection
        setAnimeInfo={setAnimeInfo}
        onOpenModal={onOpenModal}
      ></MoviesSection>

      <PopularSection
        setAnimeInfo={setAnimeInfo}
        onOpenModal={onOpenModal}
      ></PopularSection>
      <ScrollToTop top={1500} smooth color="#6f00ff" />
    </>
  );
}
