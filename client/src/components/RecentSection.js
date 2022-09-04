import { useEffect, useState } from "react";

import CarouselRenderer from "./CarouselRenderer";

export default function RecentSection() {
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    fetch("https://api.enime.moe/recent")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setRecent(data.data);
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
