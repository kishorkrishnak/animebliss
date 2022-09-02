import Carousel from "react-elastic-carousel";
import "./Item.css";

import AnimeCard from "./AnimeCard";
const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 1000, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
];

export default function ElasticCarousel({ finalQuery, rowtitle, api }) {
  return (
    <div>
      <Carousel
        style={{ height: "fit-content" }}
        showArrows={false}
        breakPoints={breakPoints}
      >
        {finalQuery.map((query, index) => (
          <AnimeCard
            title={api === "enime" ? query.title : query.title.english}
            image={query.image}
            key={query.title}
          ></AnimeCard>
        ))}
      </Carousel>
    </div>
  );
}
