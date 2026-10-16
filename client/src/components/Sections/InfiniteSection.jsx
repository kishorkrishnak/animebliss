import React, { useEffect, useState } from "react";
import GridRenderer from "../Layouts/GridRenderer.jsx";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeftLong,
  faArrowRightLong,
} from "@fortawesome/free-solid-svg-icons";
import { Container, Row, Col } from "react-grid-system";
import SkeletonCard from "../Cards/SkeletonCard";
import toast, { Toaster } from "react-hot-toast";
import { normalizeApiResponse } from "../../services/api";
import "./InfiniteSection.css";

const InfiniteSection = ({
  url,
  fetchFn,
  sectiontitle,
  itemlimit,
  id,
  querytype,
  sortTabs,
  defaultTabId,
}) => {
  const [activeTabId, setActiveTabId] = useState(() => defaultTabId || (sortTabs && sortTabs[0]?.id) || null);
  const [fetchedData, setFetchedData] = useState([]);
  const [currpage, setCurrpage] = useState(1);
  const [isAnimate, setIsAnimate] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  // Sync tab if defaultTabId or sortTabs changes
  useEffect(() => {
    if (defaultTabId) {
      setActiveTabId(defaultTabId);
    } else if (sortTabs && sortTabs.length > 0 && !sortTabs.some((t) => t.id === activeTabId)) {
      setActiveTabId(sortTabs[0]?.id);
    }
    setCurrpage(1);
  }, [url, defaultTabId, sortTabs, activeTabId]);

  const activeTabObj = sortTabs ? sortTabs.find((t) => t.id === activeTabId) : null;

  let effectiveUrl = url;
  if (activeTabObj?.url) {
    effectiveUrl = activeTabObj.url;
  } else if (activeTabObj?.queryParam && url) {
    let cleanUrl = url;
    if (activeTabObj.queryParam.includes("sort=")) {
      cleanUrl = cleanUrl.replace(/&sort=[^&]*/g, "").replace(/\?sort=[^&]*&?/g, "?");
    }
    if (activeTabObj.queryParam.includes("status=")) {
      cleanUrl = cleanUrl.replace(/&status=[^&]*/g, "").replace(/\?status=[^&]*&?/g, "?");
    }
    const sep = cleanUrl.includes("?") ? (cleanUrl.endsWith("?") ? "" : "&") : "?";
    effectiveUrl = `${cleanUrl}${sep}${activeTabObj.queryParam}`;
  }

  useEffect(() => {
    let isMounted = true;
    setIsAnimate(false);
    setIsLoading(true);

    if (currpage > 1) {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }

    const loadData = async () => {
      try {
        // Priority 1: Direct fetch function on the active tab
        if (typeof activeTabObj?.fetchFn === "function") {
          const res = await activeTabObj.fetchFn(currpage);
          if (!isMounted) return;
          const normalized = normalizeApiResponse(res);
          setFetchedData(normalized.results || []);
          setHasNextPage(Boolean(normalized.hasNextPage));
          setIsAnimate(true);
          return;
        }

        // Priority 2: Direct fetch function passed as prop
        if (typeof fetchFn === "function") {
          const res = await fetchFn(currpage);
          if (!isMounted) return;
          const normalized = normalizeApiResponse(res);
          setFetchedData(normalized.results || []);
          setHasNextPage(Boolean(normalized.hasNextPage));
          setIsAnimate(true);
          return;
        }

        // Priority 3: URL-based fetching with resilient fallback
        if (effectiveUrl) {
          const separator = querytype || (effectiveUrl.includes("?") ? "&" : "?");
          const fullUrl = `${effectiveUrl}${separator}page=${currpage}&perPage=${itemlimit || 20}`;

          const res = await axios.get(fullUrl);
          if (!isMounted) return;
          const normalized = normalizeApiResponse(res.data);
          setFetchedData(normalized.results || []);
          setHasNextPage(Boolean(normalized.hasNextPage));
          setIsAnimate(true);
          return;
        }
      } catch (err) {
        if (!isMounted) return;
        console.error("Failed to fetch section data:", err);
        toast.error("Could not load anime list");
        setFetchedData([]);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, [currpage, effectiveUrl, id, itemlimit, querytype, activeTabObj, fetchFn]);

  const getPageNumbers = () => {
    const pages = [];
    const start = Math.max(1, currpage - 2);
    const end = hasNextPage ? currpage + 2 : currpage;
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <section
      id={id}
      className="section section-infinite"
      style={{
        marginTop: id === "recent-section" || id === "movies" || id === "filterresults" ? 95 : 20,
      }}
    >
      <Toaster position="top-right" />

      <div className="section-header-row">
        <h2 className="section-title">
          {activeTabObj?.title || sectiontitle}
        </h2>
        {sortTabs && sortTabs.length > 0 && (
          <div className="sort-tabs-container">
            {sortTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                className={`sort-tab-btn ${activeTabId === tab.id ? "active" : ""}`}
                onClick={() => {
                  if (activeTabId !== tab.id) {
                    setActiveTabId(tab.id);
                    setCurrpage(1);
                  }
                }}
              >
                {tab.icon && <span style={{ marginRight: 4 }}>{tab.icon}</span>}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {isLoading ? (
        <Container fluid={true} style={{ padding: "0 24px" }}>
          <Row gutterWidth={16}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].slice(0, itemlimit || 12).map((n) => (
              <Col xl={2} lg={2.4} md={3} sm={4} xs={6} key={n}>
                <SkeletonCard />
              </Col>
            ))}
          </Row>
        </Container>
      ) : (
        <>
          <GridRenderer isAnimate={isAnimate} finalQuery={fetchedData} />

          <div className="pagination-wrapper">
            <div className="pagination glass-panel">
              <button
                className="pagination-btn nav-btn"
                disabled={currpage <= 1}
                onClick={() => {
                  if (currpage > 1) setCurrpage((prev) => prev - 1);
                }}
              >
                <FontAwesomeIcon icon={faArrowLeftLong} />
                <span>Prev</span>
              </button>

              <div className="pagination-numbers">
                {getPageNumbers().map((num) => (
                  <button
                    key={num}
                    className={`pagination-num-btn ${currpage === num ? "active" : ""}`}
                    onClick={() => setCurrpage(num)}
                  >
                    {num}
                  </button>
                ))}
              </div>

              <button
                className="pagination-btn nav-btn"
                disabled={!hasNextPage}
                onClick={() => {
                  if (hasNextPage) setCurrpage((prev) => prev + 1);
                }}
              >
                <span>Next</span>
                <FontAwesomeIcon icon={faArrowRightLong} />
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default InfiniteSection;
