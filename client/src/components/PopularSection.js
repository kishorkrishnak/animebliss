import { useEffect, useState } from "react";
import GridRenderer from "./GridRenderer.js";
import { Audio, ProgressBar } from "react-loader-spinner";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function PopularSection() {
  const nopreviouspageerror = () => toast("You are on the first page!");
  const nonextpageerror = () => toast("You are on the last page!");

  const [popular, setPopular] = useState([]);
  const [currpage, setCurrpage] = useState(1);
  const [btnText, setBtnText] = useState("");
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
          setBtnText("Next Page");
          setHasNextPage(true);
        } else {
          setBtnText("Previous Page");
          setHasNextPage(false);
        }

        setPopular(data.results);

        setLoading((prev) => !prev);
      });
  }, [currpage]);

  return (
    <section
      className="section section-popular"
      style={{
        paddingBottom: 40,
        flexDirection: "column",

        textAlign: "center",
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
            <ProgressBar
              style={{ position: "absolute", top: 0, bottom: 0 }}
              height="80"
              width="400"
              ariaLabel="progress-bar-loading"
              wrapperStyle={{}}
              wrapperClass="progress-bar-wrapper"
              borderColor="#F4442E"
              barColor="#51E5FF"
            />
          )}
          <GridRenderer
            height={480}
            width={320}
            finalQuery={popular}
          ></GridRenderer>

          <div
            className="pagination"
            style={{
              height: 60,
              width: "100vw",
              borderBottom: "1px solid red",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <button
              onClick={() => {
                if (currpage <= 1) {
                  nonextpageerror();
                } else {
                  setCurrpage((prev) => prev - 1);
                }
              }}
              style={{
                color: "white",
                width: 150,
                backgroundColor: "transparent",
              }}
            >
              Previous
            </button>
            <button
              onClick={() => {
                if (hasNextPage) {
                  setCurrpage((curr) => curr + 1);
                } else {
                  nonextpageerror();
                }
              }}
              style={{
                color: "white",
                width: 150,

                backgroundColor: "transparent",
              }}
            >
              Next
            </button>
          </div>
        </>
      )}
    </section>
  );
}
