import { useEffect, useState } from "react";
import GridRenderer from "./GridRenderer.jsx";
import { Audio, ProgressBar } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CSSProperties } from "react";
import RingLoader from "react-spinners/RingLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faArrowLeftLong,
  faArrowRightLong,
} from "@fortawesome/free-solid-svg-icons";

const override = {
  position: "fixed",
  zIndex: 1,
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,

  margin: "auto",

  borderColor: "red",
};
export default function PopularSection() {
  const nopreviouspageerror = () => toast.warning("You are on the first page!");
  const nonextpageerror = () => toast.warning("You are on the last page!");
  const [popular, setPopular] = useState([]);
  const [currpage, setCurrpage] = useState(1);
  const [windowSize, setWindowSize] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);
  useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowSize(window.innerWidth);
    });
  });



  
  useEffect(() => {
    setLoading((prev) => !prev);

    fetch(
      "https://consumet-api.herokuapp.com/meta/anilist/popular?page=" + currpage
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.hasNextPage) {
          setHasNextPage(true);
        } else {
          setHasNextPage(false);
        }

        setPopular(data.results);

        setLoading((prev) => !prev);
      });
  }, [currpage]);

  return (
    <section
      className="section section-popular "
      style={{
        paddingBottom: 40,
        height: "fit-content",
      }}
    >
      <ToastContainer />

      {popular.length > 0 && (
        <>
          <h1
            style={{ color: "#fdba74", fontSize: "3rem", marginLeft: "35px" }}
          >
            Most Popular
          </h1>

          {loading && (
            <RingLoader
              color={"rgb(192, 202, 51)"}
              loading={loading}
              cssOverride={override}
              size={80}
            />
          )}

          <GridRenderer
            height={windowSize > 700 ? 350 : 220}
            width={windowSize > 700 ? 280 : 180}
            finalQuery={popular}
          ></GridRenderer>

          <div
            className="pagination-wrapper"
            style={{
              marginTop: 20,
              display: "flex",
              alignItems: "center",
              width: "100vw",
              justifyContent: "center",
            }}
          >
            <div
              className="pagination"
              style={{
                height: 60,
                width: "96%",

                display: "flex",
                alignItems: "center",
                paddingLeft: "2%",
                paddingRight: "2%",
                borderBottom: "1px solid dodgerblue",
                justifyContent: "space-between",
              }}
            >
              <button
                onClick={() => {
                  if (currpage <= 1) {
                    nopreviouspageerror();
                  } else {
                    setCurrpage((prev) => prev - 1);
                  }
                }}
                style={{
                  fontSize: "1.8rem",
                  outline: "none",
                  border: "none",
                  color: "white",
                  width: 150,
                  backgroundColor: "transparent",
                }}
              >
                <FontAwesomeIcon icon={faArrowLeftLong}></FontAwesomeIcon>{" "}
                &nbsp; Previous
              </button>
              <button
                onClick={() => {
                  if (hasNextPage) {
                    setCurrpage((curr) => curr + 1);
                  } else {
                    nonextpageerror.error();
                  }
                }}
                style={{
                  color: "white",
                  width: 150,
                  fontSize: "1.8rem",
                  outline: "none",
                  border: "none",
                  backgroundColor: "transparent",
                }}
              >
                Next&nbsp;{" "}
                <FontAwesomeIcon icon={faArrowRightLong}></FontAwesomeIcon>
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
