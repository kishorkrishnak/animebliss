import Login from "./components/Login";
import "./App.css";

import Wallpapers from "./components/Wallpapers";
import Home from "./components/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SearchResults from "./components/SearchResults";
import AnimePlayerModal from "./components/AnimePlayerModal";
function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/wallpapers" element={<Wallpapers></Wallpapers>} />
            {/* <Route path="/login" element={<Login />} /> */}
            <Route path="/search" element={<SearchResults />} />
            <Route path="/login" element={<AnimePlayerModal></AnimePlayerModal>} />

          </Routes>
        </>
      </BrowserRouter>
    </div>
  );
}

export default App;
