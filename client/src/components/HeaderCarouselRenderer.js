import Carousel from "react-elastic-carousel";

import HeaderCarouselCard from "./HeaderCarouselCard";
import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "react";
const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 1 },
  { width: 768, itemsToShow: 1 },
  { width: 1200, itemsToShow: 1 },
];

export default function CarouselRenderer({ finalResults }) {
  const [windowSize, setWindowSize] = useState(null);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowSize(window.innerWidth);
    });
  });
  return (
    <Carousel
      enableAutoPlay={true}
      showArrows={false}
      breakPoints={breakPoints}
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
