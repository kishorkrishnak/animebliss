import { useEffect, useState } from "react";

import ElasticCarousel from "./ElasticCarousel";

export default function PopularSection() {
  const [popular, setPopular] = useState([]);

  useEffect(() => {
    fetch("https://consumet-api.herokuapp.com/meta/anilist/popular")
      .then((response) => response.json())
      .then((data) => {
        setPopular(data.results);
      });
  }, []);
  return (
    <section className="section section-topairing">
      <h1 style={{ color: "#fdba74", fontSize: "3rem", marginLeft: "35px" }}>
        Most Popular
      </h1>

      {popular.length > 0 && (
        <ElasticCarousel
          finalQuery={popular}
          api="anilist"
          rowtitle="Most Popular"
          stretchedA={true}
          stretchedB={false}
        ></ElasticCarousel>
      )}
    </section>
  );
}
