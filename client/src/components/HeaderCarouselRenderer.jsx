import Carousel from "react-elastic-carousel";

import HeaderCarouselCard from "./HeaderCarouselCard";
import { v4 as uuidv4 } from "uuid";
import { useState, useEffect, useRef } from "react";
const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 1 },
  { width: 768, itemsToShow: 1 },
  { width: 1200, itemsToShow: 1 },
];

export default function CarouselRenderer({ finalResults }) {
  const [windowSize, setWindowSize] = useState(null);
  const carouselRef = useRef(null);
  let resetTimeout;
  useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowSize(window.innerWidth);
    });
  });
  return (
    <Carousel
      ref={carouselRef}
      enableAutoPlay={true}
      showArrows={false}
      autoPlaySpeed={2000}
      breakPoints={breakPoints}
      onNextEnd={({ index }) => {
        clearTimeout(resetTimeout);
        resetTimeout = setTimeout(() => {
          carouselRef?.current?.goTo(0);
        }, 4000); // same time
      }}
      pagination={windowSize > 800 ? true : false}
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
