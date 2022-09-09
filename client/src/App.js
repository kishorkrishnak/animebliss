import Login from "./components/Login";
import "./App.css";
import Home from "./components/Home";
import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AnimePlayer from "./components/AnimePlayer";
import { Modal } from "react-responsive-modal";

import SearchResults from "./components/SearchResults";
export const SharedState = React.createContext();
const App = () => {
  const [open, setOpen] = useState(false);
  const [animeInfo, setAnimeInfo] = useState(null);
  const [active, setActive] = useState("nav__menu");
  const [icon, setIcon] = useState("nav__toggler");

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
        <BrowserRouter>
          <>
            <Routes>
              <Route path="/login" element={<Login />} />

              <Route path="/" element={<Home navstate={navstate} />} />
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
