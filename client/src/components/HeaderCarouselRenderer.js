import Carousel from "react-elastic-carousel";
import "./Item.css";
import HeaderCarouselCard from "./HeaderCarouselCard";
import { v4 as uuidv4 } from "uuid";

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 1 },
  { width: 768, itemsToShow: 1 },
  { width: 1200, itemsToShow: 1 },
];

export default function CarouselRenderer({ finalResults }) {
  return (
    <Carousel
      enableAutoPlay={true}
      showArrows={false}
      breakPoints={breakPoints}
    >
      {finalResults.map((item) => (
        <HeaderCarouselCard
          key={uuidv4()}
          epcount={item.currentEpisode}
          year={item.year}
          duration={item.duration}
          title={item.title.english}
          description={item.description}
          cover={item.bannerImage}
        ></HeaderCarouselCard>
      ))}
    </Carousel>
  );
}
