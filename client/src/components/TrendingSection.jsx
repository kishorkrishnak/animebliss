import { useEffect, useState } from "react";

import CarouselRenderer from "./CarouselRenderer";

export default function TrendingSection({setUrl,onOpenModal}) {
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
        setUrl = {setUrl}
        onOpenModal = {onOpenModal}
          finalQuery={trending}
          stretchedA={true}
          rowTitle="Trending"
        ></CarouselRenderer>
      )}
    </section>
  );
}
