import Login from "./Components/Login";
import "./App.css";
import RecentSection from "./Components/RecentSection";
import TrendingSection from "./Components/TrendingSection";
import Header from "./Components/Header";
import TopAiring from "./Components/TopAiring";
import PopularSection from "./Components/PopularSection";
function App() {
  return (
    <div className="App">
      <Header></Header> <TrendingSection></TrendingSection>
      <RecentSection></RecentSection>
      <TopAiring></TopAiring>
      <PopularSection></PopularSection>
    </div>
  );
}

export default App;
