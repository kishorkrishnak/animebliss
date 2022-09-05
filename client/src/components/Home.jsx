import "./Home.css";

import Header from "./Header";
import TopAiringSection from "./TopAiringSection";
import UpcomingSection from "./UpcomingSection";
import PopularSection from "./PopularSection";
import FavoriteSection from "./FavoriteSection";
// import TrendingSection from "./TrendingSection";
// import ModalVideo from "react-modal-video";
// const playTrailer = () => {
//   setIsPlaying(true);
// };
// const [trailerId, setTrailerId] = useState(trailerVideoId);
// const [isPlaying, setIsPlaying] = useState(false);


export default function Home() {
  return (
    <>
      <Header></Header>
      <UpcomingSection></UpcomingSection>
      <FavoriteSection></FavoriteSection>
      <TopAiringSection></TopAiringSection>
      <PopularSection></PopularSection>
{/* 
      <ModalVideo

      
        style={{ background: "red" }}
        channel="youtube"
        autoplay
        isOpen={isPlaying}
        videoId={trailerId}
        onClose={() => setIsPlaying(false)}
      /> */}
    </>
  );
}
