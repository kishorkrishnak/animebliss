import { useEffect, useState } from "react";

import CarouselRenderer from "./CarouselRenderer";

export default function TrendingSection() {
  const [trending, setTrending] = useState([]);
  useEffect(() => {
    fetch("https://consumet-api.herokuapp.com/meta/anilist/trending")
      .then((response) => response.json())
      .then((data) => {
        setTrending(data.results);
      });
  }, []);
  return (
    <section className="section section-trending" id="trending">
      {trending.length > 0 && (
        <CarouselRenderer
          finalQuery={trending}
          api="anilist"
          rowTitle="Trending"
          isTrending={true}
        ></CarouselRenderer>
      )}
    </section>
  );
}
