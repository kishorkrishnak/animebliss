import Carousel from "react-elastic-carousel";
import "./Item.css";
import { v4 as uuidv4 } from "uuid";
import AnimeCard from "./AnimeCard";

export default function ElasticCarousel({
  finalQuery,
  rowtitle,
  isRecent,
  isTrending,
  api,
  stretchedA,
}) {
  const breakPoints = [
    { width: 1, itemsToShow: isTrending ? 2 : 3 },

    { width: 500, itemsToShow: isTrending ? 2 : 4 },

    { width: 950, itemsToShow: isTrending ? 3 : 6 },

    { width: 1200, itemsToShow: isTrending ? 4 : 7 },
  ];

  return (
    <div>
      <Carousel
        style={{ backgroundColor: "red", height: "fit-content" }}
        enableTilt={true}
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
