import Carousel from "react-elastic-carousel";

import { v4 as uuidv4 } from "uuid";
import CarouselCard from "./CarouselCard";
import { useState, useEffect } from "react";

export default function CarouselRenderer({
  finalQuery,
  rowTitle,
  isRecent,
  isTrending,
  api,
  stretchedA,
  initialActiveIndex,
  setIsPlaying
  ,setTrailerId
}) {
  const [windowSize, setWindowSize] = useState(null);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowSize(window.innerWidth);
    });
  });
  const breakPoints = [
    { width: 1, itemsToShow: isTrending ? 2 : 3 },

    { width: 590, itemsToShow: isTrending ? 2 : 4 },

    { width: 950, itemsToShow: isTrending ? 3 : 5 },

    { width: 1200, itemsToShow: isTrending ? 4 : 7 },
  ];

  return (
    <div className="carouselinstance">
      <h1
        style={{
          color: "#fdba74",
          fontSize: "3rem",
          marginLeft: "21px",
          marginBottom: "5px",
        }}
      >
        {rowTitle}
      </h1>
      <Carousel
        initialActiveIndex={initialActiveIndex}
        enableTilt={true}
        pagination={windowSize < 800 ? false : true}
        showArrows={false}
        breakPoints={breakPoints}
      >
        {finalQuery.map((query, index) => (
          <CarouselCard
          setTrailerId = {setTrailerId}
          setIsPlaying = {setIsPlaying}
          
            title={query.title}
            image={query.images.jpg.large_image_url}
            key={uuidv4()}
            api={api}
            stretchedA={stretchedA}
            rowTitle={rowTitle}
            episodeNum={isRecent ? query.episode : 0}
            trailerVideoId={
              query.trailer !== null ? query.trailer.youtube_id : 0
            }
          ></CarouselCard>
        ))}
      </Carousel>
    </div>
  );
}
