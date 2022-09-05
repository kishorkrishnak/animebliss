import { useEffect, useState } from "react";
import CarouselRenderer from "./CarouselRenderer";
import ModalVideo from "react-modal-video";

export default function UpcomingSection() {
  const [trailerId,setTrailerId] = useState("")
  const [isPlaying,setIsPlaying] = useState(false)
  const [upcoming, setUpComing] = useState([]);
  useEffect(() => {
    fetch("https://api.jikan.moe/v4/top/anime?filter=upcoming")
      .then((response) => response.json())
      .then((data) => {
        setUpComing(data.data);
      });
  }, []);
  return (
    <section
      style={{
        marginTop: 25,
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
          isTrending={true}
          setIsPlaying={setIsPlaying}
          setTrailerId = {setTrailerId}
        ></CarouselRenderer>
      )}

<ModalVideo
        channel="youtube"
        autoplay
        isOpen={isPlaying}
        videoId={trailerId}
        onClose={() => setIsPlaying(false)}
      />
    </section>
  );
}
