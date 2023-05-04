//component imports
import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ClockLoader from "./components/Others/ClockLoader";
import AnimePlayerPage from "./components/Pages/AnimePlayerPage";
import FilteredPage from "./components/Pages/Filtered";
import GenresPage from "./components/Pages/Genres";
import Home from "./components/Pages/Home";
import LoginPage from "./components/Pages/Login";
import MoviesPage from "./components/Pages/Movies";
import RecentPage from "./components/Pages/Recent";
import SearchResults from "./components/Pages/SearchResults";
import SignupPage from "./components/Pages/Signup";
import Watchlist from "./components/Pages/Watchlist";
import MoreSection from "./components/Sections/MoreSection";

// state for showing and hiding spinner
export const GlobalContext = React.createContext();
const App = () => {
  const [videoIsLoading, setVideoIsLoading] = useState(false);
  const [loggedIn, setIsLoggedIn] = useState(false);

  return (
    <GlobalContext.Provider
      value={{
        videoIsLoading,
        setVideoIsLoading,
        setIsLoggedIn,
        loggedIn,
      }}
    >
      {videoIsLoading && <ClockLoader color={"white"} size={35} />}
      <BrowserRouter>
        <>
          <Routes>
            <Route exact path="/search" element={<SearchResults />} />
            <Route exact path="/recentep" element={<RecentPage></RecentPage>} />
            <Route exact path="/watchlist" element={<Watchlist />} />
            <Route exact path="/filter" element={<GenresPage />} />
            <Route exact path="/more/:section" element={<MoreSection />} />
            <Route exact path="/watch/:id" element={<AnimePlayerPage />} />
            <Route exact path="/" element={<Home />} />
            <Route
              exact
              path="/movies"
              element={<MoviesPage setVideoIsLoading={setVideoIsLoading} />}
            />
            <Route
              exact
              path="/filtered/:type/:value"
              element={<FilteredPage />}
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
    </GlobalContext.Provider>
  );
};
export default App;
