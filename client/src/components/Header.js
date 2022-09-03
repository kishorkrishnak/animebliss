import { useState } from "react";
import "./Header.css";

import "./Navbar.css";

import React from "react";
import HeaderCarouselRenderer from "./HeaderCarouselRenderer";
import Navbar from "./Navbar";

export default function Header() {
  const [finalResults, setFinalResults] = useState([]);

  const [queries, setQueries] = useState([
    "death note",
    "steins gate",

    "When Will Ayumu Make His Move?",
  ]);

  queries.forEach((query, index) => {
    fetch("https://consumet-api.herokuapp.com/anime/enime/" + query)
      .then((response) => response.json())
      .then((data) => {
        fetch(
          "https://consumet-api.herokuapp.com/anime/enime/info?id=" +
            data.results[0].id
        )
          .then((response) => response.json())
          .then((data) => {
            let isDup = false;

            for (let i = 0; i < finalResults.length; i++) {
              if (finalResults[i].title === data.title) isDup = true;
            }

            if (!isDup) setFinalResults([...finalResults, data]);
          }, []);
      }, []);
  });

  return (
    <header className="header">
      <Navbar></Navbar>
      <section className="section section-carousel">
        {finalResults.length === queries.length && (
          <HeaderCarouselRenderer
            finalResults={finalResults}
          ></HeaderCarouselRenderer>
        )}
      </section>
    </header>
  );
}
