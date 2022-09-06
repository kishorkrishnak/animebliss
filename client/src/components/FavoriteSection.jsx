import { useEffect, useState } from "react";

import CarouselRenderer from "./CarouselRenderer";

export default function FavoriteSection() {
  const [favorite, setFavorite] = useState([]);
  useEffect(() => {
    fetch("https://api.jikan.moe/v4/top/anime?filter=favorite")
      .then((response) => response.json())
      .then((data) => {
        setFavorite(data.data);
      });
  }, []);
  return (
    <section className="section section-favorite" id="favorite">
      {favorite.length > 0 && (
        <CarouselRenderer
          finalQuery={favorite}
          rowTitle="Favorite"
          stretchedA={true}
        ></CarouselRenderer>
      )}
    </section>
  );
}
