import Login from "./components/Login";
import "./App.css";
import RecentSection from "./components/RecentSection";
import TrendingSection from "./components/TrendingSection";
import Header from "./components/Header";
import TopAiring from "./components/TopAiring";
import PopularSection from "./components/PopularSection";
function App() {

  return (
    <div className="App">
      <Header></Header>

      <TrendingSection></TrendingSection>
      <RecentSection></RecentSection>

      <TopAiring></TopAiring>

      <PopularSection></PopularSection>
    </div>
  );
}

export default App;
