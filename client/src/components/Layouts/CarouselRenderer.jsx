import React from "react";
import { RightOutlined } from "@ant-design/icons";
import Carousel from "react-elastic-carousel";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import AnimeCard from "../Cards/AnimeCard";
import UpcomingCard from "../Cards/UpcomingCard";

const CarouselRenderer = ({
  finalQuery,
  sectionTitle,
  isRecent,
  isAnimeCard,
  setIsPlaying,
  setTrailerId,
  url,
}) => {
  const navigate = useNavigate();
  const breakPoints = [
    { width: 1, itemsToShow: !isAnimeCard ? 2 : 3 },
    { width: 580, itemsToShow: !isAnimeCard ? 2 : 4 },
    { width: 800, itemsToShow: !isAnimeCard ? 3 : 4 },
    { width: 900, itemsToShow: !isAnimeCard ? 3 : 5 },
    { width: 1100, itemsToShow: !isAnimeCard ? 3 : 5 },
    { width: 1270, itemsToShow: !isAnimeCard ? 4 : 6 },
    { width: 1760, itemsToShow: !isAnimeCard ? 4 : 7 },
    { width: 1920, itemsToShow: !isAnimeCard ? 4 : 8 },
  ];

  return (
    <div className="carouselinstance">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {sectionTitle && <h2 className="row-title">{sectionTitle}</h2>}
        {isAnimeCard && sectionTitle !== "Recommendations" && (
          <span
            onClick={(e) => {
              e.preventDefault();
              navigate("/more/" + encodeURIComponent(sectionTitle.toLowerCase()), {
                state: { sectionTitle, url },
              });
            }}
            className="more-button"
            style={{ cursor: "pointer" }}
          >
            More
            <RightOutlined style={{ fontSize: 13 }} />
          </span>
        )}
      </div>

      <Carousel
        enableTilt={true}
        enableAutoPlay={true}
        autoPlaySpeed={7000}
        pagination={true}
        showArrows={false}
        breakPoints={breakPoints}
      >
        {finalQuery.map((query) =>
          isAnimeCard ? (
            <div key={uuidv4()} style={{ padding: "0 6px", width: "100%" }}>
              <AnimeCard
                title={query.title}
                image={query.image}
                id={query.id}
                sectionTitle={sectionTitle}
                rating={query.rating}
                year={query.releaseDate}
                type={query.type}
                episodeNumber={query.episodeNumber || query.episode || 0}
              />
            </div>
          ) : (
            <div key={uuidv4()} style={{ padding: "0 6px", width: "100%" }}>
              <UpcomingCard
                setTrailerId={setTrailerId}
                setIsPlaying={setIsPlaying}
                title={query.title}
                image={query.images?.jpg?.large_image_url || query.image}
                sectionTitle={sectionTitle}
                episodeNum={isRecent ? query.episode : 0}
                trailerVideoId={
                  query.trailer && query.trailer.youtube_id ? query.trailer.youtube_id : 0
                }
              />
            </div>
          )
        )}
      </Carousel>
    </div>
  );
};

export default CarouselRenderer;
