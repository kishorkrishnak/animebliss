import { useEffect, useState } from "react";
import GridRenderer from "./GridRenderer.js";
import { Audio, ProgressBar } from "react-loader-spinner";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CSSProperties } from "react";
import RingLoader from "react-spinners/RingLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faArrowLeftLong,faArrowRightLong} from "@fortawesome/free-solid-svg-icons";

const override = (CSSProperties = {
  position: "fixed",
  zIndex: 1,
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,

  margin: "auto",

  borderColor: "red",
});
export default function PopularSection() {
  const nopreviouspageerror = () => toast.warning("You are on the first page!");
  const nonextpageerror = () => toast.warning("You are on the last page!");

  const [popular, setPopular] = useState([]);
  const [currpage, setCurrpage] = useState(1);

  const [loading, setLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);
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
            height={480}
            width={320}
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

                borderBottom: "1px solid red",
                display: "flex",
                alignItems: "center",
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

                  color: "white",
                  width: 150,
                  backgroundColor: "transparent",
                }}
              >
              <FontAwesomeIcon icon={faArrowLeftLong}></FontAwesomeIcon> &nbsp;  Previous
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

                  backgroundColor: "transparent",
                }}
              >
                Next&nbsp;  <FontAwesomeIcon icon={faArrowRightLong}></FontAwesomeIcon>
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
