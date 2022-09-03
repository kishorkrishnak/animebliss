import Carousel from "react-elastic-carousel";
import "./Item.css";
import HeaderCarouselCard from "./HeaderCarouselCard";

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
          key={item.title}
          epcount={item.episodes.length}
          year={item.releaseDate}
          duration={item.duration}
          title={item.title}
          description={item.description.replaceAll(
            /<\/?[\w\s]*>|<.+[\W]>/g,
            ""
          )}
          cover={item.cover}
        ></HeaderCarouselCard>
      ))}
    </Carousel>
  );
}
