import "./Navbar.css";
import logo from "../assets/images/logo.png";
import React from "react";
import { useState } from "react";

function Navbar() {
  const [active, setActive] = useState("nav__menu");
  const [icon, setIcon] = useState("nav__toggler");
  const [value, setValue] = useState("");
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
    <nav className="nav">
      <div className="nav-side-div">
        <a href="/home" className="nav__brand ">
          <img height="50" src={logo} alt="" />

          <h2>AnimeBliss</h2>
        </a>
        <input
          onInput={(e) => {
            setValue(e.target.value);
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

        <li></li>
      </div>

      <div onClick={navToggle} className={icon}>
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
    </nav>
  );
}

export default Navbar;
