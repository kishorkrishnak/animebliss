import { useEffect, useState, useContext } from "react";
import "./Header.css";
import React from "react";
import HeaderCarouselRenderer from "./HeaderCarouselRenderer";
import Navbar from "./Navbar";
const Header = () => {
  const [finalResults, setFinalResults] = useState([]);

  useEffect(() => {
    fetch("https://consumet-api.herokuapp.com/meta/anilist/popular")
      .then((response) => response.json())
      .then((data) => {
        setFinalResults(data.results);
      }, []);
  }, []);

  return (
    <>
      <Navbar></Navbar>
      <header className="header">
        <section className="section section-carousel">
          {finalResults.length > 0 && (
            <HeaderCarouselRenderer
              finalResults={finalResults}
            ></HeaderCarouselRenderer>
          )}
        </section>

        {/* <div
        className="sectiontabs"
        style={{
          border: "1px solid cyan",
          width: "fit-content",
          marginTop: 20,
          justifyContent: "center",
          display: "flex",
          gap: 10,
          color: "dodgerblue",
          backgroundColor: "#282828",
          height: 32,
          marginLeft: "3%",
          borderRadius: 2,
        }}
      >
        <button className="btn-section">All</button>
        <button className="btn-section">Popular</button>

        <button className="btn-section">Favorite</button>

        <button
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          className="btn-section"
        >
          Movies
        </button>

        <button className="btn-section">Wallpapers</button>
      </div> */}
      </header>
    </>
  );
};

export default Header;
