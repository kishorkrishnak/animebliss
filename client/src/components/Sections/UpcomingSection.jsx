import { useEffect, useState } from "react";
import CarouselRenderer from "../Layouts/CarouselRenderer";
import TrailerPlayer from "../Players/TrailerPlayer";
import axios from "axios";
const UpcomingSection = () => {
  const [trailerId, setTrailerId] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [upcoming, setUpComing] = useState([]);
  const [url, setUrl] = useState(
    "https://api.jikan.moe/v4/top/anime?filter=upcoming"
  );
  useEffect(() => {
    axios.get(url).then(({ data: { data } }) => {
      setUpComing(data);
    });
  }, []);
  return (
    <section
      style={{
        marginTop: 30,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
      }}
      className="section section-upcoming"
      id="upcoming"
    >
      {upcoming.length > 0 && (
        <CarouselRenderer
          finalQuery={upcoming}
          rowTitle="Upcoming"
          isUpcoming={true}
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
