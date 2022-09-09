import { useEffect, useState } from "react";

import CarouselRenderer from "./CarouselRenderer";

export default function AnimeSection({
  onOpenModal,
  setAnimeInfo,
  sectiontitle,
  url,
  id,
}) {
  const [fetchedData, setFetchedData] = useState([]);
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setFetchedData(data.results);
      });
  }, []);
  return (
    <section className="section section-anime" id={id}>
      {fetchedData.length > 0 && (
        <CarouselRenderer
          finalQuery={fetchedData}
          stretchedA={true}
          rowTitle={sectiontitle}
        ></CarouselRenderer>
      )}
    </section>
  );
}
