import { useEffect, useState } from "react";
import Login from "./Login";

import CarouselRenderer from "./CarouselRenderer";

export default function TopAiring() {
  const [airing, setAiring] = useState([]);
  useEffect(() => {
    fetch("https://api.jikan.moe/v4/top/anime?filter=airing")
      .then((response) => response.json())
      .then((data) => {
        setAiring(data.data);
      });
  }, []);
  return (
    <section className="section section-topairing">
      {airing.length > 0 && (
        <CarouselRenderer
          finalQuery={airing}
          rowTitle="Top Airing"
          stretchedA={true}
          initialActiveIndex={2}
        ></CarouselRenderer>
      )}
    </section>
  );
}
