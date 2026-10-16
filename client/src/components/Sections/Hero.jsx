import React, { useEffect, useRef, useState } from "react";
import Carousel from "react-elastic-carousel";
import { v4 as uuidv4 } from "uuid";
import HeroCard from "../Cards/HeroCard";
import Navbar from "./Navbar";
import { animeKaiApi } from "../../services/api";

const Hero = ({ setHeroSectionLoaded }) => {
  const carouselRef = useRef(null);
  const [fetchedAnime, setFetchedAnime] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    animeKaiApi
      .getSpotlight()
      .then((data) => {
        if (!isMounted) return;
        const results = data?.results || [];
        setFetchedAnime(results);
        if (setHeroSectionLoaded) setHeroSectionLoaded(true);
      })
      .catch((err) => {
        console.error("Failed to fetch spotlight carousel:", err);
        if (setHeroSectionLoaded) setHeroSectionLoaded(true);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [setHeroSectionLoaded]);

  return (
    <header className="header">
      <Navbar />
      <section style={{ marginTop: 85, padding: "0 20px" }} className="section-header">
        {loading ? (
          <div
            style={{
              display: "flex",
              gap: 16,
              overflow: "hidden",
              minHeight: 480,
              borderRadius: 16,
            }}
            className="skeleton"
          />
        ) : (
          fetchedAnime.length > 0 && (
            <Carousel
              enableAutoPlay={true}
              ref={carouselRef}
              showArrows={false}
              autoPlaySpeed={6500}
              pagination={true}
            >
              {fetchedAnime.slice(0, 8).map((item, index) => (
                <HeroCard
                  key={uuidv4()}
                  id={item.id}
                  epcount={item.totalEpisodes || item.episodes?.length || 0}
                  year={item.releaseDate}
                  duration={item.duration}
                  title={item.title?.english || item.title?.romaji || "Untitled"}
                  description={item.description}
                  cover={item.cover || item.image}
                  image={item.image}
                  rating={item.rating}
                  spotlightIndex={index + 1}
                  seasonLabel="TRENDING NOW"
                />
              ))}
            </Carousel>
          )
        )}
      </section>
    </header>
  );
};

export default Hero;
