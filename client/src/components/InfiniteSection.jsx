import { useEffect, useState, useContext } from "react";
import GridRenderer from "./GridRenderer.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClockLoader from "react-spinners/ClockLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { v4 as uuidv4 } from "uuid";

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
export default function InfiniteSection({
  url,
  sectiontitle,
  itemlimit,
  id,
  querytype,
}) {
  const nopreviouspageerror = () => toast.warning("You are on the first page!");
  const nonextpageerror = () => toast.warning("You are on the last page!");
  const [fetchedData, setFetchedData] = useState([]);
  const [currpage, setCurrpage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [pageNumbers, setPageNumbers] = useState([1, 2, 3, 4, 5]);
  const updatePageNumberButtons = (e) => {
    if (e.target.classList.contains("nextPageButton")) {
      if (currpage % 5 === 0) {
        let temp = [];
        for (let i = 1; i <= 5; i++) {
          temp.push(currpage + i);
        }

        setPageNumbers(temp);
      }
    }

    if (e.target.classList.contains("previousPageButton")) {
      if (currpage % 5 === 1) {
        let temp = [];
        for (let i = 5; i >= 1; i--) {
          temp.push(currpage - i);
        }
        setPageNumbers(temp);
      }
    }
  };
  useEffect(() => {
    setLoading(true);
    
    fetch(url + querytype + "page=" + currpage + "&perPage=" + itemlimit)
      .then((response) => response.json())
      .then((data) => {
        if (data.hasNextPage) {
          setHasNextPage(true);
        } else {
          setHasNextPage(false);
        }

        setFetchedData(data.results);
        setLoading(false);
        document.querySelector("#" + id).scrollIntoView();
      });
  }, [currpage]);

  return (
    <>
      <ClockLoader
        color={"white"}
        loading={loading}
        cssOverride={override}
        size={80}
      />

      <section
        id={id}
        className="section section-infinite"
        style={{
          paddingBottom: 40,
          marginTop: querytype === "&" ? 80 : "",
        }}
      >
        <ToastContainer />

        {fetchedData.length > 0 && (
          <>
            <h1
              style={{ color: "#fdba74", fontSize: "3rem", marginLeft: "20px" }}
            >
              {sectiontitle}
            </h1>

            <GridRenderer finalQuery={fetchedData}></GridRenderer>

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

                  marginTop: 20,
                  borderTop: "1px solid dodgerblue",
                  justifyContent: "space-between",
                }}
              >
                <button
                  className="previousPageButton"
                  onClick={(e) => {
                    if (currpage <= 1) {
                      nopreviouspageerror();
                    } else {
                      updatePageNumberButtons(e);
                      setCurrpage((prev) => prev - 1);
                    }
                  }}
                  style={{
                    fontSize: "15px",
                    outline: "none",
                    border: "none",
                    color: "white",
                    width: 150,
                    backgroundColor: "transparent",
                  }}
                >
                  <FontAwesomeIcon icon={faArrowLeftLong}></FontAwesomeIcon>{" "}
                  &nbsp;Previous
                </button>

                <div
                  style={{
                    display: "flex",
                    gap: 40,
                    flexWrap: "wrap",
                    justifyContent: "center",
                  }}
                  className="pageindex"
                >
                  {pageNumbers.map((pageNumber) => (
                    <button
                      className="btn-pageindex"
                      key={uuidv4()}
                      onClick={() => {
                        setCurrpage(pageNumber);
                      }}
                      style={{
                        border: "none",
                        padding: "4px 8px",
                        borderRadius: 5,
                        color: "white",
                        background: "none",
                        fontSize: 14,
                        backgroundColor:
                          currpage === pageNumber ? "rgb(244, 67, 54)" : "none",
                      }}
                    >
                      {pageNumber}
                    </button>
                  ))}
                </div>

                <button
                  className="nextPageButton"
                  onClick={(e) => {
                    if (hasNextPage) {
                      updatePageNumberButtons(e);
                      setCurrpage((curr) => curr + 1);
                    } else {
                      nonextpageerror.error();
                    }
                  }}
                  style={{
                    color: "white",
                    width: 150,
                    background: "red",
                    fontSize: "15px",
                    outline: "none",
                    border: "none",
                    backgroundColor: "transparent",
                  }}
                >
                  Next&nbsp;
                  <FontAwesomeIcon icon={faArrowRightLong}></FontAwesomeIcon>
                </button>
              </div>
            </div>
          </>
        )}
      </section>
    </>
  );
}
