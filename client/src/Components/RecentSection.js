

import { useEffect, useState } from "react";


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
    <section className="section section-recent">
     

      {recent.length > 0 && (
        <>
        <h1 style={{ color: "#fdba74", fontSize: "3rem", marginLeft: "35px" }}>
        Recent Releases
      </h1>
        <ElasticCarousel
          finalQuery={recent}
          api="zoro"
            size='stretch'
          rowtitle="Trending"
          isRecent={true}

          stretchedA = {true}
          
        ></ElasticCarousel>
        </>
      )}
    </section>
  );
}
