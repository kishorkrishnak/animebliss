import { v4 as uuidv4 } from "uuid";
import AnimeCard from "../Cards/AnimeCard";
const VerticalCarousel = ({ finalQuery, rowTitle }) => {
  return (
    <div className="vertical-grid-container">
      <h1 className="row-title" style={{ marginLeft: "1%", color: "#D8D8D8" }}>
        {rowTitle}
      </h1>
      <div className="vertical-grid">
        {finalQuery.map((query, index) => (
          <AnimeCard
            key={uuidv4()}
            title={query.title}
            image={query.image}
            id={query.id}
            rowTitle={rowTitle}
          ></AnimeCard>
        ))}
      </div>
    </div>
  );
};
export default VerticalCarousel;
