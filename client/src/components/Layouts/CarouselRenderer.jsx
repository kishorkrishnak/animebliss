import Carousel from "react-elastic-carousel";
import { v4 as uuidv4 } from "uuid";
import AnimeCard from "../Cards/AnimeCard";
import UpcomingCard from "../Cards/UpcomingCard";
import { RightOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
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

  console.log(sectionTitle);
  return (
    <div className="carouselinstance">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {sectionTitle && <h1 className="row-title">{sectionTitle}</h1>}
        {isAnimeCard && sectionTitle !== "Recommendations" && (
          <a
            onClick={(event) => {
              event.preventDefault();
              navigate("/more/" + sectionTitle.toLowerCase(), {
                state: { sectionTitle, url },
              });
            }}
            href="/more"
            className="more-button"
          >
            More
            <RightOutlined style={{ fontSize: 14 }}></RightOutlined>
          </a>
        )}
      </div>
      <Carousel
        enableTilt={true}
        enableAutoPlay={true}
        autoPlaySpeed={6000}
        pagination={true}
        showArrows={false}
        breakPoints={breakPoints}
      >
        {finalQuery.map((query) =>
          isAnimeCard ? (
            <div>
              <AnimeCard
                title={query.title}
                image={query.image}
                key={uuidv4()}
                id={query.id}
                sectionTitle={sectionTitle}
                episodeNumber={query.episodeNumber ? query.episodeNumber : 0}
              ></AnimeCard>
            </div>
          ) : (
            <UpcomingCard
              setTrailerId={setTrailerId}
              setIsPlaying={setIsPlaying}
              title={query.title}
              image={query.images.jpg.large_image_url}
              key={uuidv4()}
              sectionTitle={sectionTitle}
              episodeNum={isRecent ? query.episode : 0}
              trailerVideoId={
                query.trailer !== null ? query.trailer.youtube_id : 0
              }
            ></UpcomingCard>
          )
        )}
      </Carousel>
    </div>
  );
};

export default CarouselRenderer;
