import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { PlayCircleOutlined } from "@ant-design/icons";
import { useEffect, useContext, useState } from "react";
import "./Header.css";
import Card from "./AnimeCard";
import "./Navbar.css";

import React from "react";
import ElasticHeader from "./ElasticHeader";
import Navbar from "./Navbar";
import Login from "./Login";
export default function Header() {
const [finalQuery, setFinalQuery] = useState([]);

  const [query, setQuery] = useState("death note");
  const [id, setId] = useState("");
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

            for (let i = 0; i < finalQuery.length; i++) {
              if (finalQuery[i].title === data.title) isDup = true;
            }

            if (!isDup) setFinalQuery([...finalQuery, data]);
          }, []);
      }, []);
  });


  return (
    <section className="section section-carousel">
     <Navbar></Navbar>
      {finalQuery.length === queries.length && (
        <ElasticHeader isHeader={true} finalQuery={finalQuery}></ElasticHeader>
      )}
    </section>
  );
}
