import Login from "./components/Login";
import "./App.css";
import Home from "./components/Home";
import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AnimePlayer from "./components/AnimePlayer";
import { Modal } from "react-responsive-modal";
import ClockLoader from "react-spinners/ClockLoader";
import MoviesSection from "./components/MoviesSection";
import SearchResults from "./components/SearchResults";
export const SharedState = React.createContext();
const App = () => {
  const [open, setOpen] = useState(false);
  const [animeInfo, setAnimeInfo] = useState(null);
  const [videoIsLoading, setVideoIsLoading] = useState(false);

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

              <Route path="/" element={<Home navstate={navstate} />} />
              <Route path="/movies" element={<MoviesSection></MoviesSection>} />

              <Route
                path="/search"
                element={
                  <SearchResults
                    onOpenModal={onOpenModal}
                    setAnimeInfo={setAnimeInfo}
                    setVideoIsLoading={setVideoIsLoading}
                    navstate={navstate}
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
