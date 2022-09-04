import { useEffect, useState } from "react";
import "./Header.css";
import "./Navbar.css";

import React from "react";
import HeaderCarouselRenderer from "./HeaderCarouselRenderer";
import Navbar from "./Navbar";
export default function Header() {
  const [finalResults, setFinalResults] = useState([]);
  useEffect(() => {
    fetch("https://api.enime.moe/popular")
      .then((response) => response.json())
      .then((data) => {
        setFinalResults(data.data);
      }, []);
  }, []);

  return (
    <header className="header">
      <Navbar></Navbar>
      <section className="section section-carousel">
        {finalResults.length > 0 && (
          <HeaderCarouselRenderer
            finalResults={finalResults}
          ></HeaderCarouselRenderer>
        )}
      </section>
    </header>
  );
}
