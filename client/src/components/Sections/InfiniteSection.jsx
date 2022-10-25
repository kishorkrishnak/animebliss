import { useEffect, useState } from "react";
import GridRenderer from "../Layouts/GridRenderer.jsx";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { v4 as uuidv4 } from "uuid";
import toast, { Toaster } from "react-hot-toast";
import "./InfiniteSection.css";
import {
  faArrowLeftLong,
  faArrowRightLong,
} from "@fortawesome/free-solid-svg-icons";
const InfiniteSection = ({ url, sectiontitle, itemlimit, id, querytype }) => {
  const [fetchedData, setFetchedData] = useState([]);
  const [currpage, setCurrpage] = useState(1);
  const [isAnimate, setIsAnimate] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [pageNumbers, setPageNumbers] = useState([1, 2, 3, 4, 5]);

  const updatePageNumberButtons = (e) => {
    if (e.target.classList.contains("next-page-button")) {
      if (currpage % 5 === 0) {
        let temp = [];
        for (let i = 1; i <= 5; i++) {
          temp.push(currpage + i);
        }
        setPageNumbers(temp);
      }
    }
    if (e.target.classList.contains("previous-page-button")) {
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
    setCurrpage(1);
  }, [url]);
  useEffect(() => {
    setIsAnimate(false);
    if (currpage > 1) {
      document.querySelector("#" + id).scrollIntoView();
    }
    axios
      .get(url + querytype + "page=" + currpage + "&perPage=" + itemlimit)
      .then(({ data: { hasNextPage, results } }) => {
        if (hasNextPage) {
          setHasNextPage(true);
        } else {
          setHasNextPage(false);
        }
        setFetchedData(results);
        setIsAnimate(true);
      });
  }, [currpage, url]);
  return (
    <>
      <section
        id={id}
        className="section section-infinite"
        style={{
          marginTop: querytype === "&" || id === "recent-section" ? 70 : "",
        }}
      >
        {fetchedData.length > 0 && (
          <>
            <h1
              className="section-title"
              style={{
                color: "white",
              }}
            >
              {sectiontitle}
            </h1>
            <GridRenderer
              isAnimate={isAnimate}
              finalQuery={fetchedData}
            ></GridRenderer>
            <div className="pagination-wrapper">
              <div className="pagination">
                <button
                  className="previous-page-button"
                  onClick={(e) => {
                    if (currpage <= 1) {
                      toast.error("You are on the first page!");
                    } else {
                      updatePageNumberButtons(e);
                      setCurrpage((prev) => prev - 1);
                    }
                  }}
                >
                  <FontAwesomeIcon icon={faArrowLeftLong}></FontAwesomeIcon>{" "}
                  &nbsp;Previous
                </button>
                <div className="pageindex">
                  {pageNumbers.map((pageNumber) => (
                    <button
                      className="btn-pageindex"
                      key={uuidv4()}
                      onClick={() => {
                        setCurrpage(pageNumber);
                      }}
                      style={{
                        backgroundColor:
                          currpage === pageNumber ? "rgb(244, 67, 54)" : "none",
                      }}
                    >
                      {pageNumber}
                    </button>
                  ))}
                </div>
                <button
                  className="next-page-button"
                  onClick={(e) => {
                    if (hasNextPage) {
                      updatePageNumberButtons(e);
                      setCurrpage((curr) => curr + 1);
                    } else {
                      toast.error("This is the last page!");
                    }
                  }}
                >
                  Next&nbsp;
                  <FontAwesomeIcon icon={faArrowRightLong}></FontAwesomeIcon>
                </button>
              </div>
            </div>
          </>
        )}
        <Toaster
          position="top-right"
          toastOptions={{
            success: {
              style: {
                background: "green",
              },
            },
            error: {
              style: {
                background: "rgb(216, 67, 21)",
                color: "white",
              },
            },
          }}
        />
      </section>
    </>
  );
};
export default InfiniteSection;
