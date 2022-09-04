import Login from "./components/Login";
import "./App.css";
import { useState } from "react";
import RecentSection from "./components/RecentSection";
import TrendingSection from "./components/TrendingSection";
import Header from "./components/Header";
import TopAiring from "./components/TopAiring";
import PopularSection from "./components/PopularSection";
function App() {
  const [isSearching, setIsSearching] = useState(false);
  return (
    <div className="App">
      <Header setIsSearching={setIsSearching}></Header>

      {!isSearching && (
        <>
          <TrendingSection></TrendingSection>
          <RecentSection></RecentSection>

          <TopAiring></TopAiring>

          <PopularSection></PopularSection>
        </>
      )}
    </div>
  );
}

export default App;
