import { useEffect, useState } from "react";

import CarouselRenderer from "./CarouselRenderer";


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
    <section className="section section-recent">
      {recent.length > 0 && (
        <CarouselRenderer
          initialActiveIndex={2}
          finalQuery={recent}
          api="zoro"
          size="stretch"
          rowTitle="Recent Releases"
          isRecent={true}
          stretchedA={true}
        ></CarouselRenderer>
      )}
    </section>
  );
}
