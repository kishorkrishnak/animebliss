import axios from "axios";
import { useEffect, useState } from "react";
import CarouselRenderer from "../Layouts/CarouselRenderer";
import TrailerPlayer from "../Players/TrailerPlayer";

const UpcomingSection = () => {
  const [trailerId, setTrailerId] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [upcoming, setUpComing] = useState([]);

  const url = "https://api.jikan.moe/v4/top/anime?filter=upcoming";
  useEffect(() => {
    axios.get(url).then(({ data: { data } }) => {
      setUpComing(data);
    });
  }, []);
  return (
    <section className="section section-upcoming" id="upcoming">
      {upcoming.length > 0 && (
        <CarouselRenderer
          finalQuery={upcoming}
          sectionTitle="Upcoming"
          isAnimeCard={false}
          setIsPlaying={setIsPlaying}
          setTrailerId={setTrailerId}
          url={url}
        ></CarouselRenderer>
      )}
      <TrailerPlayer
        setIsPlaying={setIsPlaying}
        isPlaying={isPlaying}
        trailerId={trailerId}
      ></TrailerPlayer>
    </section>
  );
};

export default UpcomingSection;
