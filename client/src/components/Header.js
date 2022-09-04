import { useEffect, useState } from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";

import "./Navbar.css";
import SearchResults from "./SearchResults";
import React from "react";
import HeaderCarouselRenderer from "./HeaderCarouselRenderer";
import Navbar from "./Navbar";
export default function Header() {
  const [finalResults, setFinalResults] = useState([]);
  const [input, setInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();
  const searchAnime = async () => {
    return fetch("https://api.jikan.moe/v4/anime?q=" + input)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        navigate("/search", {
          state: { finalResults: [...data.data], input: input },
        });
      });
  };
  useEffect(() => {
    setIsSearching(true);
    if (input !== "") {
      searchAnime();

      // fetch("https://api.jikan.moe/v4/anime?q=" + input)
      //   .then((response) => response.json())
      //   .then((data) => {
      //     setIsSearching(true);
      //     setSearchResults([...data.data]);

      //     navigate("/search", {
      //       state: { finalResults: searchResults, input: input },
      //     });
      //   });
    } else {
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

        {/* {isSearching && (
          <SearchResults
            finalResults={searchResults}
            input={input}
          ></SearchResults>
        )} */}
      </section>
    </header>
  );
}
