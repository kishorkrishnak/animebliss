import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import CarouselCard from "./CarouselCard";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
export default function ReccomendCarousel({ finalQuery }) {
  useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowSize(window.innerWidth);
    });
  });
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  const calculateCenterSlidePercent = () => {
    if (windowSize >= 1700) return 34;
    else if (windowSize >= 1600) return 50;
    else if (windowSize >= 1100) return 44;
    else if (windowSize >= 790) return 48;
    else if (windowSize >= 600) return 34;
    else if (windowSize >= 450) return 44;
    else if (windowSize > 350) return 75;
    else return 80;
  };
  return (
    <Carousel
      showThumbs={false}
      style={{ backgroundColor: "red" }}
      centerMode={true}
      infiniteLoop={true}
      showIndicators={false}
      centerSlidePercentage={calculateCenterSlidePercent()}
      autoPlay={true}
      showArrows={false}
      showStatus={false}
      emulateTouch={true}
      stopOnHover={true}
    >
      {finalQuery.map((query, index) => (
        <CarouselCard
          title={query.title.english}
          image={query.image}
          key={uuidv4()}
          rating={query.rating}
          id={query.id}
        ></CarouselCard>
      ))}
    </Carousel>
  );
}
