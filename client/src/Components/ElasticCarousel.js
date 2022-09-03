import Carousel from "react-elastic-carousel";
import "./Item.css";
import { v4 as uuidv4 } from "uuid";
import AnimeCard from "./AnimeCard";
import { useState, useEffect } from "react";

export default function ElasticCarousel({
  finalQuery,
  rowTitle,
  isRecent,
  isTrending,
  api,
  stretchedA,
  initialActiveIndex,
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

    { width: 950, itemsToShow: isTrending ? 3 : 6 },

    { width: 1200, itemsToShow: isTrending ? 4 : 7 },
  ];

  return (
    <div className="carouselinstance">
      <h1
        style={{
          color: "#fdba74",
          fontSize: "3rem",
          marginLeft: "21px",
      marginBottom:"5px"
          
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
          <AnimeCard
            title={
              api === "enime" || api === "zoro"
                ? query.title
                : query.title.english
            }
            image={query.image}
            key={uuidv4()}
            stretchedA={stretchedA}
            episodeNum={isRecent ? query.episode : 0}
          ></AnimeCard>
        ))}
      </Carousel>
    </div>
  );
}
