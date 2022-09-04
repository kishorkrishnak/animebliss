import { useEffect, useState } from "react";
import "./Header.css";

import "./Navbar.css";
import SearchResults from "./SearchResults";
import React from "react";
import HeaderCarouselRenderer from "./HeaderCarouselRenderer";
import Navbar from "./Navbar";

export default function Header({ setIsSearching }) {
  const [searchResults, setSearchResults] = useState([]);
  const [finalResults, setFinalResults] = useState([]);
  const [input, setInput] = useState("");
  const [showSearchPage, setShowSearchPage] = useState(false);
  const [queries, setQueries] = useState([
    "death note",
    "steins gate",

    "When Will Ayumu Make His Move?",
  ]);

  useEffect(() => {
    if (input !== "") {
      console.log("calling request with " + input);
      fetch("https://api.jikan.moe/v4/anime?q=" + input)
        .then((response) => response.json())
        .then((data) => {
          setShowSearchPage(true);
          setIsSearching(true);
          setSearchResults([...data.data]);
        });
    } else {
      setShowSearchPage(false);
      setIsSearching(false);
    }
  }, [input]);

  useEffect(() => {
    fetch("https://api.enime.moe/popular")
      .then((response) => response.json())
      .then((data) => {
        setFinalResults(data.data);
      }, []);
  }, []);

  return (
    <header className="header">
      <Navbar setInput={setInput}></Navbar>
      <section className="section section-carousel">
        {finalResults.length > 0 && (
          <HeaderCarouselRenderer
            finalResults={finalResults}
          ></HeaderCarouselRenderer>
        )}

        {showSearchPage && (
          <SearchResults
            finalResults={searchResults}
            input={input}
          ></SearchResults>
        )}
      </section>
    </header>
  );
}
