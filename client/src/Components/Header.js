import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { PlayCircleOutlined } from "@ant-design/icons";
import { useEffect, useContext, useState } from "react";
import "./Header.css";
import Card from "./AnimeCard";
import "./Navbar.css";
import logo from "../assets/images/image.png";
import React from "react";
import ElasticHeader from "./ElasticHeader";

export default function Header() {
  const [query, setQuery] = useState("death note");
  const [id, setId] = useState("");
  const [queries, setQueries] = useState([
    "death note",
    "onepunchman",
    "monster",
  ]);
  const [active, setActive] = useState("nav__menu");
  const [icon, setIcon] = useState("nav__toggler");
  const [finalQuery, setFinalQuery] = useState([]);
  const [value, setValue] = useState("");

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

  const navToggle = () => {
    if (active === "nav__menu") {
      setActive("nav__menu nav__active");
    } else {
      setActive("nav__menu");
    }

    if (icon === "nav__toggler") {
      setIcon("nav__toggler toggle");
    } else setIcon("nav__toggler");
  };

  return (
    <section className="section section-carousel">
      <nav className="nav">
        <div className="nav-side-div">
          <a href="/home" className="nav__brand ">
            <img height="40" src={logo} style={{ color: "white" }} alt="" />

            <h3 className="brand-title">Anime Bliss</h3>
          </a>
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            style={{ color: "white", fontSize: 25 }}
          ></FontAwesomeIcon>
          <input
            onInput={(e) => {
              setValue(e.target.value);
            }}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            placeholder="Search"
            className="searchbar"
            type="text"
            value={value}
          />
          <ul className={active}>
            <li></li>
            <li className="nav__item">
              <a href="/home" className="nav__link">
                Top Anime
              </a>
            </li>
            <li className="nav__item">
              <a href="/home" className="nav__link">
                Genres
              </a>
            </li>

            <li className="nav__item">
              <a href="/home" className="nav__link">
                Wallpapers
              </a>
            </li>

            <li className="nav__item">
              <a href="/home" className="nav__link">
                Watchlist
              </a>
            </li>
            <li className="nav__item">
              <a href="/home" className="nav__link">
                Random
              </a>
            </li>

            <li className="nav__item"></li>
          </ul>
          <a href="/home" className="nav__link nav__link-signout">
            Signout
          </a>
        </div>

        <div onClick={navToggle} className={icon}>
          <div className="line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>
        </div>
      </nav>
      {/* descr !== "" */}

      {finalQuery.length === queries.length && (
        <ElasticHeader  isHeader={true} finalQuery={finalQuery}></ElasticHeader>
      )}
    </section>
  );
}
