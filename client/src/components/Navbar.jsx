import "./Navbar.css";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../assets/images/image.png";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
export default function Navbar({ navstate }) {
  const [input, setInput] = useState("");
  const calculateSize = (windowSize) => {
    if (windowSize > 450) return 330;
    else if (windowSize > 380 && windowSize < 450) return 230;
    else return 200;
  };
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowSize(window.innerWidth);
    });
  });
  const navigate = useNavigate();
  const searchAnime = async () => {
    return fetch("https://consumet-api.herokuapp.com/meta/anilist/" + input)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        navigate("/search", {
          state: {
            finalResults: data.results,
            input: input,
          },
        });
      });
  };
  useEffect(() => {
    if (input !== "") {
      searchAnime();
    } else {
      console.log("input cannot be empty");
    }
  }, [input]);

  const [value, setValue] = useState("");

  const navToggle = () => {
    if (navstate.active === "nav__menu") {
      navstate.setActive("nav__menu nav__active");
    } else {
      navstate.setActive("nav__menu");
    }

    if (navstate.icon === "nav__toggler") {
      navstate.setIcon("nav__toggler toggle");
    } else navstate.setIcon("nav__toggler");
  };

  return (
    <nav className="nav">
      <div className="nav-side-div">
        <a href="/" className="nav__brand ">
          <img height="40" src={logo} style={{ color: "white" }} alt="" />

          <h5 className="brand-title">Animebliss</h5>
        </a>
        <FontAwesomeIcon
          className="magnify-icon"
          icon={faMagnifyingGlass}
          style={{ color: "white", fontSize: 25 }}
        ></FontAwesomeIcon>

        <input
          onInput={(e) => {
            setValue(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setInput(e.target.value);
            }
          }}
          style={{ width: calculateSize(windowSize) }}
          placeholder="Search for anime"
          className="searchbar"
          type="text"
          value={value}
        />
        <ul className={navstate.active}>
          <li></li>
          <li className="nav__item">
            <a
              onClick={(e) => {
                e.preventDefault();
                document.querySelector(".section-popular").scrollIntoView();
              }}
              href="/"
              className="nav__link"
            >
              Top Anime
            </a>
          </li>
          <li className="nav__item">
            <Link
              onClick={(e) => {
                e.preventDefault();
                navigate("/movies");
              }}
              to="/wallpapers"
              style={{ color: "white", font: "inherit" }}
            >
              Top Movies
            </Link>
          </li>

          <li className="nav__item">
            <a href="/" className="nav__link">
              Watchlist
            </a>
          </li>
          <li className="nav__item">
            <Link to="/login" style={{ color: "white", font: "inherit" }}>
              Login
            </Link>
          </li>
      
          <li className="nav__item signoutli">
            <a href="/" className="nav__link nav__link-signout">
              Signout
            </a>
          </li>
        </ul>
      </div>

      <div onClick={navToggle} className={navstate.icon}>
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
    </nav>
  );
}
