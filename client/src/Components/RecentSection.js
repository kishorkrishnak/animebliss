

import { useEffect, useState } from "react";

import CarouselPage from "./Carousel";
import ElasticCarousel from "./ElasticCarousel";

export default function RecentSection() {
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    fetch("https://consumet-api.herokuapp.com/anime/zoro/recent-episodes")
      .then((response) => response.json())
      .then((data) => {
        setRecent(data.results);
       
      });
  }, []);
  return (
    <section className="section section-topairing">
      <h1 style={{ color: "#fdba74", fontSize: "3rem", marginLeft: "35px" }}>
        Recent Releases
      </h1>

      {recent.length > 0 && (
        <ElasticCarousel
          finalQuery={recent}
          api="anilist"
          rowtitle="Trending"
        ></ElasticCarousel>
      )}
    </section>
  );
}
