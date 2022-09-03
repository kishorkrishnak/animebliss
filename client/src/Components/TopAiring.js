import { useEffect, useState } from "react";
import Login from './Login'

import ElasticCarousel from "./ElasticCarousel";
import {Routes,Link,Route} from 'react-router-dom'
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
    <section className="section section-topairing">
               

      {airing.length > 0 && (
        <ElasticCarousel
          finalQuery={airing}
          rowTitle="Top Airing"
          api="enime"
          stretchedA={true}
          isAiring={true}
          initialActiveIndex={4}
        ></ElasticCarousel>
      )}
    </section>
  );
}
