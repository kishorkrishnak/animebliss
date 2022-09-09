import Login from "./components/Login";
import "./App.css";
import Home from "./components/Home";
import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AnimePlayer from "./components/AnimePlayer";
import { Modal } from "react-responsive-modal";
import ClockLoader from "react-spinners/ClockLoader";
import MoviesSection from "./components/MoviesSection";
import InfiniteSection from "./components/InfiniteSection";
import close2 from "./assets/images/close2.png";
import SearchResults from "./components/SearchResults";
export const SharedState = React.createContext();
const App = () => {
  const [open, setOpen] = useState(false);
  const [animeInfo, setAnimeInfo] = useState(null);
  const [videoIsLoading, setVideoIsLoading] = useState(false);

  const closeIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
    >
      <path
        fill="#444"
        d="M10 2.3v3.3c1.2.7 2 2 2 3.4 0 2.2-1.8 4-4 4s-4-1.8-4-4c0-1.5.8-2.8 2-3.4V2.3C3.1 3.2 1 5.8 1 9c0 3.9 3.1 7 7 7s7-3.1 7-7c0-3.2-2.1-5.8-5-6.7z"
      ></path>
      <path fill="#444" d="M7 1h2v7H7V1z"></path>
    </svg>
  );
  const [active, setActive] = useState("nav__menu");
  const [icon, setIcon] = useState("nav__toggler");

  const override = {
    position: "fixed",
    zIndex: 1,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,

    margin: "auto",

    borderColor: "red",
  };
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const navstate = {
    setActive: setActive,
    active: active,
    icon: icon,
    setIcon: setIcon,
  };
  return (
    <SharedState.Provider
      value={{
        setAnimeInfo,
        onOpenModal,
        setActive,
        setIcon,
        setVideoIsLoading,

        active,

        icon,
      }}
    >
      <div className="App">
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
          animationDuration={600}
          closeIcon={"Back"}
        >
          <AnimePlayer
            onOpenModal={onOpenModal}
            animeInfo={animeInfo}
          ></AnimePlayer>
        </Modal>
        {videoIsLoading && (
          <ClockLoader
            color={"white"}
            loading={videoIsLoading}
            cssOverride={override}
            size={80}
          />
        )}
        <BrowserRouter>
          <>
            <Routes>
              <Route path="/login" element={<Login />} />

              <Route path="/" element={<Home  />} />
              <Route
                path="/movies"
                element={
                  <MoviesSection
                    onOpenModal={onOpenModal}
                    setAnimeInfo={setAnimeInfo}
                    setVideoIsLoading={setVideoIsLoading}
                   
                  ></MoviesSection>
                }
              />

              <Route
                path="/search"
                element={
                  <SearchResults
                    onOpenModal={onOpenModal}
                    setAnimeInfo={setAnimeInfo}
                  />
                }
              />
            </Routes>
          </>
        </BrowserRouter>
      </div>
    </SharedState.Provider>
  );
};

export default App;
