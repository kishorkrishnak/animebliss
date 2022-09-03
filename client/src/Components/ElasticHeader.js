import Carousel from "react-elastic-carousel";
import "./Item.css";
import CarouselCard from "./CarouselCard";
import AnimeCard from "./AnimeCard";
const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 1 },
  { width: 768, itemsToShow: 1 },
  { width: 1200, itemsToShow: 1 },
];

export default function ElasticHeader({ finalQuery }) {
  return (
    <Carousel
      enableAutoPlay={true}
      showArrows={false}
      breakPoints={breakPoints}
    >
      {finalQuery.map((query, index) => (
        <CarouselCard
          key={query.title}
          ep={query.episodes.length}
          year={query.releaseDate}
          duration={query.duration}
          title={query.title}
          descr={query.description.replaceAll(/<\/?[\w\s]*>|<.+[\W]>/g, "")}
          cover={query.cover}
        ></CarouselCard>
      ))}
    </Carousel>
  );
}
