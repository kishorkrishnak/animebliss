import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";

import Carousel from "react-elastic-carousel";
import HeaderCarouselCard from "../Cards/HeaderCard";
import { v4 as uuidv4 } from "uuid";
import { useRef } from "react";
const Header = () => {
  const carouselRef = useRef(null);
  let resetTimeout;
  const [finalResults, setFinalResults] = useState([]);
  useEffect(() => {
    axios
      .get("https://api.consumet.org/meta/anilist/trending")
      .then(({ data: { results } }) => {
        setFinalResults(results);
      }, []);
  }, []);

  return (
    <>
      {finalResults.length > 0 && (
        <header className="header">
          <Navbar></Navbar>

          <section style={{ marginTop: 30 }} className="section-header">
            return (
            <Carousel
              enableAutoPlay={true}
              ref={carouselRef}
              showArrows={false}
              autoPlaySpeed={2000}
              onNextEnd={() => {
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
          </section>
        </header>
      )}
    </>
  );
};
export default Header;
