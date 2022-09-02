import { useEffect, useState } from "react";

import CarouselPage from "./Carousel";
import ElasticCarousel from "./ElasticCarousel";

export default function TopAiring() {
  const [airing, setAiring] = useState([]);

  useEffect(() => {
    fetch("https://consumet-api.herokuapp.com/anime/gogoanime/top-airing")
      .then((response) => response.json())
      .then((data) => {
        setAiring(data.results);
      });
  }, []);
  return (
    <section style={{    paddingTop: "30px"}} className="section section-topairing">
      <h1 style={{color: "#fdba74", fontSize: "3rem",  marginLeft:"35px"}}>Top Airing</h1>

      {airing.length > 0 && (
        <ElasticCarousel
          finalQuery={airing}
          rowtitle="Top Airing"
          api="enime"
        ></ElasticCarousel>
      )}
    </section>
  );
}
