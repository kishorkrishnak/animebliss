import CarouselCard from "./CarouselCard";
import { Carousel } from "react-responsive-carousel";
import styles from "react-responsive-carousel/lib/styles/carousel.min.css";
import AnimeCard from "./AnimeCard";
export default function CarouselPage({ finalQuery, isHeader }) {
  return isHeader ? (
    <Carousel
      showStatus={false}
      showArrows={false}
      emulateTouch={true}
      swipeable={true}
      autoPlay
      width={"100vw"}
      infiniteLoop={true}
      showThumbs={false}
      centerMode={true}
      centerSlidePercentage={96}
    >
      {finalQuery.map((query, index) => (
        <CarouselCard
          key={query.title}
          duration={query.duration}
          ep={query.episodes.length}
          cover={query.cover}
          title={query.title}
          year={query.releaseDate}
          descr={query.description}
        ></CarouselCard>
      ))}
    </Carousel>
  ) : (
    <Carousel
      showStatus={false}
      showArrows={false}
      emulateTouch={true}
      swipeable={true}
      autoPlay
      infiniteLoop={true}
      showThumbs={false}
      centerMode={true}
      centerSlidePercentage={29}
    >
      {finalQuery.map((query, index) => (
        <AnimeCard
          key={query.title}
          image={query.image}
          title={query.title}
        ></AnimeCard>
      ))}
    </Carousel>
  );
}
