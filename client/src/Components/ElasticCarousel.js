import Carousel from "react-elastic-carousel";
import "./Item.css";
import { v4 as uuidv4 } from "uuid";
import AnimeCard from "./AnimeCard";

export default function ElasticCarousel({
  finalQuery,
  rowtitle,
  isRecent,
  api,
  stretchedA,
  stretchedB,
}) {
  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2 },
    { width: 1100, itemsToShow: 3 },
    { width: 1200, itemsToShow: stretchedA ? 7 : stretchedB ? 5 : 4 },
  ];

  return (
    <div>
      <Carousel
        enableTilt={true}
        style={{ height: "fit-content" }}
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
            stretchedB={stretchedB}
            episodeNum={isRecent ? query.episode : 0}
          ></AnimeCard>
        ))}
      </Carousel>
    </div>
  );
}
