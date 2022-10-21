import Carousel from "react-elastic-carousel";
import HeaderCarouselCard from "../Cards/HeaderCarouselCard";
import { v4 as uuidv4 } from "uuid";
import { useRef } from "react";

const HeaderCarouselRenderer = ({ finalResults }) => {
  const carouselRef = useRef(null);
  let resetTimeout;
  return (
    <Carousel
      enableAutoPlay={true}
      ref={carouselRef}
      showArrows={false}
      autoPlaySpeed={2000}
      onNextEnd={({ index }) => {
        clearTimeout(resetTimeout);
        resetTimeout = setTimeout(() => {
          carouselRef?.current?.goTo(0);
        }, 4000);
      }}
      pagination={true}
    >
      {finalResults.map((item) =>
        item.totalEpisodes &&
        item.id &&
        item.totalEpisodes &&
        item.releaseDate &&
        item.duration &&
        item.title &&
        item.description &&
        item.cover ? (
          <HeaderCarouselCard
            key={uuidv4()}
            id={item.id}
            epcount={item.totalEpisodes}
            year={item.releaseDate}
            duration={item.duration}
            title={item.title.english || "poop"}
            description={item.description}
            cover={item.cover}
          ></HeaderCarouselCard>
        ) : null
      )}
    </Carousel>
  );
};
export default HeaderCarouselRenderer;
