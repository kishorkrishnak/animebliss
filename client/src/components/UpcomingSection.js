import { useEffect, useState } from "react";

import CarouselRenderer from "./CarouselRenderer";

export default function UpcomingSection() {
  const [upcoming, setUpComing] = useState([]);
  useEffect(() => {
    fetch("https://api.jikan.moe/v4/top/anime?filter=upcoming")
      .then((response) => response.json())
      .then((data) => {
        setUpComing(data.data);
      });
  }, []);
  return (
    <section
      style={{ marginTop: 35 ,display:"flex",flexDirection:"column",justifyContent:"flex-start"}}
      className="section section-upcoming"
      id="upcoming"

    >
      {upcoming.length > 0 && (
        <CarouselRenderer
          finalQuery={upcoming}
          rowTitle="Upcoming"
          isTrending={true}
        ></CarouselRenderer>
      )}
    </section>
  );
}
