import TextTruncate from "react-text-truncate";
import "./UpcomingCard.css";
const UpcomingCard = ({
  title,
  image,
  episodeNum,
  trailerVideoId,
  setIsPlaying,
  setTrailerId,
}) => {
  return (
    <>
      <div
        onClick={(e) => {
          e.preventDefault();
          setTrailerId(trailerVideoId);
          setIsPlaying(true);
        }}
        className="upcomingcard-wrapper"
      >
        <div
          className="upcomingcard-card"
          style={{
            backgroundImage: `url(${image})`,
          }}
        ></div>
        {episodeNum > 0 && (
          <h5 style={{ color: "white", fontWeight: "lighter" }}>
            Episode {episodeNum}
          </h5>
        )}
        <a
          onClick={(e) => {
            e.preventDefault();
          }}
          href="/"
          className="upcomingcard-title"
        >
          <TextTruncate text={title} line={2}></TextTruncate>
        </a>
      </div>
    </>
  );
};
export default UpcomingCard;
