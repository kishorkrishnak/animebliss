import "./Home.css";
import React, { useState } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

import ScrollToTop from "react-scroll-to-top";
import Header from "./Header";
import TopAiringSection from "./TopAiringSection";
import UpcomingSection from "./UpcomingSection";
import PopularSection from "./PopularSection";
import FavoriteSection from "./FavoriteSection";
import HlsPLayer from "./HlsPlayer";
import RecentSection from "./RecentSection";
import TrendingSection from "./TrendingSection";
import AnimePlayerModal from "./AnimePlayerModal";
export default function Home() {
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const [url,setUrl] = useState("")
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
          <HlsPLayer url={url}></HlsPLayer>
        </Modal>
      </div>
      <TrendingSection onOpenModal = {onOpenModal} setUrl={setUrl}></TrendingSection>
      <PopularSection></PopularSection>
      <ScrollToTop top={1500} smooth color="#6f00ff" />
    </>
  );
}
