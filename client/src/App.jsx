//component imports
import LoginPage from "./components/Pages/LoginPage";
import GenresPage from "./components/Pages/GenresPage";
import Watchlist from "./components/Pages/Watchlist";
import Home from "./components/Pages/Home";
import MoreSection from "./components/Sections/MoreSection";
import ClockLoader from "react-spinners/MoonLoader";
import AnimePlayerPage from "./components/Pages/AnimePlayerPage";
import MoviesPage from "./components/Pages/MoviesPage";
import RecentPage from "./components/Pages/RecentPage";
import SearchResults from "./components/Pages/SearchResults";
import FilteredPage from "./components/Pages/FilteredPage";
import SignupPage from "./components/Pages/SignupPage";
import "./App.css";
import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// state for showing and hiding spinner
export const SharedStateContext = React.createContext();
const App = () => {
  const [videoIsLoading, setVideoIsLoading] = useState(false);
  const [loggedIn, setIsLoggedIn] = useState(false);

  return (
    <SharedStateContext.Provider
      value={{
        videoIsLoading,
        setVideoIsLoading,
        setIsLoggedIn,
        loggedIn,
      }}
    >
      <div className="App">
        {videoIsLoading && (
          <ClockLoader
            className="spinner"
            color={"white"}
            loading={videoIsLoading}
            cssOverride={{
              position: "fixed",
              zIndex: 800000,
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              margin: "auto",
              borderColor: "red",
            }}
            size={35}
          />
        )}
        <BrowserRouter>
          <>
            <Routes>
              <Route exact path="/search" element={<SearchResults />} />
              <Route
                exact
                path="/recentep"
                element={<RecentPage></RecentPage>}
              />
              <Route exact path="/watchlist" element={<Watchlist />} />
              <Route exact path="/filter" element={<GenresPage />} />
              <Route
                exact
                path="/more/:section"
                element={<MoreSection></MoreSection>}
              />
              <Route exact path="/watch/:id" element={<AnimePlayerPage />} />
              <Route exact path="/" element={<Home />} />
              <Route
                exact
                path="/movies"
                element={
                  <MoviesPage
                    setVideoIsLoading={setVideoIsLoading}
                  ></MoviesPage>
                }
              />
              <Route
                exact
                path="/filtered/:type/:value"
                element={<FilteredPage></FilteredPage>}
              />
              <Route
                exact
                path="/login"
                element={<LoginPage setIsLoggedIn={setIsLoggedIn} />}
              />
              <Route exact path="/signup" element={<SignupPage />} />
            </Routes>
          </>
        </BrowserRouter>
      </div>
    </SharedStateContext.Provider>
  );
};
export default App;
