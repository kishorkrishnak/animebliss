import "./Navbar.css";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../../assets/images/image.png";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import React, { useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import { GoogleLogout } from "react-google-login";
import { SharedStateContext } from "../../App";
import { useContext } from "react";
const Navbar = () => {
  const SharedState = useContext(SharedStateContext);
  const [active, setActive] = useState("nav__menu");
  const [icon, setIcon] = useState("nav__toggler");
  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          if (active === "nav__menu") {
            setIcon("nav__toggler");
            setActive("nav__menu");
          }
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);
  const location = useLocation();
  const navigate = useNavigate();
  const searchAnime = (input) => {
    return fetch("https://api.consumet.org/meta/anilist/" + input)
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
    <nav className="nav" ref={wrapperRef}>
      <Toaster
        toastOptions={{
          duration: 1000,
        }}
        position="top-right"
      ></Toaster>
      <div className="nav-side-div">
        <div
          onClick={(e) => {
            e.preventDefault();
            navigate("/");
            window.location.reload();
          }}
          style={{
            cursor: "pointer",
            gap: 10,
            display: "flex",
            alignItems: "center",
            color: "white",
            justifyContent: "center",
          }}
        >
          <img
            height="34"
            src={logo}
            style={{ color: "white", padding: 0 }}
            alt=""
          />
          <h3 className="brand-title">Animebliss</h3>
        </div>
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
              if (e.target.value === "") toast.error("Input cannot be empty!");
              else searchAnime(e.target.value);
            }
          }}
          placeholder="Search for anime"
          className="searchbar"
          type="text"
          value={value}
        ></input>
        <ul className={active}>
          <li className="nav__item">
            <span
              onClick={(e) => {
                e.preventDefault();
                if (location.pathname !== "/") {
                  navigate("/");
                } else document.querySelector("#popular").scrollIntoView();
              }}
              className="nav__link"
            >
              Popular
            </span>
          </li>
          <li
            onClick={(e) => {
              e.preventDefault();
              navigate("/movies");
            }}
            className="nav__item"
          >
            <span className="nav__link">Top Movies</span>
          </li>
          <li
            onClick={(e) => {
              e.preventDefault();
              navigate("/recentep");
            }}
            className="nav__item"
          >
            <span className="nav__link">Recent Ep</span>
          </li>
          <li
            onClick={(e) => {
              e.preventDefault();
              navigate("/filter");
            }}
            className="nav__item"
          >
            <span className="nav__link">Filter</span>
          </li>
          <li
            onClick={(e) => {
              e.preventDefault();
              navigate("/watchlist");
            }}
            className="nav__item"
          >
            <span className="nav__link">Watchlist</span>
          </li>
          <div className="auth">
            {SharedState.loggedIn ? (
              <li>
                <GoogleLogout
                  render={(renderProps) => (
                    <li
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                      className="nav__item nav__item-logout"
                    >
                      <span className="nav__link">Logout</span>
                    </li>
                  )}
                  clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                  buttonText="Logout"
                  onLogoutSuccess={() => {
                    toast.success("Successfully logged out");
                    SharedState.setIsLoggedIn(false);
                  }}
                ></GoogleLogout>
              </li>
            ) : (
              <li
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/login");
                }}
                className="nav__item nav__item-login"
              >
                <span className="nav__link">Login</span>
              </li>
            )}
            {!SharedState.loggedIn && (
              <li
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/signup");
                }}
                className="nav__item nav__item-signup"
              >
                <span className="nav__link">Signup</span>
              </li>
            )}
          </div>
        </ul>
      </div>
      <div onClick={navToggle} className={icon}>
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
    </nav>
  );
};
export default Navbar;
