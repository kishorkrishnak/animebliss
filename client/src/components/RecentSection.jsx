import { useEffect, useState } from "react";

import CarouselRenderer from "./CarouselRenderer";

export default function RecentSection() {
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    fetch("https://consumet-api.herokuapp.com/meta/anilist/recent-episodes")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setRecent(data.results);
      });
  }, []);
  return (
    <section className="section section-recent">
      {recent.length > 0 && (
        <CarouselRenderer
          initialActiveIndex={2}
          finalQuery={recent}
          rowTitle="Recent Releases"
          stretchedA={true}
        ></CarouselRenderer>
      )}
    </section>
  );
}