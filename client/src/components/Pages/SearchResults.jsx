import React, { useEffect, useState } from "react";
import { useLocation, useSearchParams, useNavigate } from "react-router-dom";
import GridRenderer from "../Layouts/GridRenderer";
import SkeletonCard from "../Cards/SkeletonCard";
import Navbar from "../Sections/Navbar";
import { animeKaiApi } from "../../services/api";
import { Container, Row, Col } from "react-grid-system";
import { FrownOutlined } from "@ant-design/icons";

const SearchResults = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const queryFromUrl = searchParams.get("q") || "";
  const queryFromState = location.state?.input || "";
  const finalSearchQuery = queryFromUrl || queryFromState;

  const [results, setResults] = useState(location.state?.finalResults || []);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // If state already had results and query matches, use it
    if (location.state?.finalResults && location.state?.input === finalSearchQuery) {
      setResults(location.state.finalResults);
      return;
    }

    if (!finalSearchQuery) return;

    let isMounted = true;
    setLoading(true);

    animeKaiApi
      .search(finalSearchQuery)
      .then((data) => {
        if (!isMounted) return;
        setResults(data?.results || []);
      })
      .catch((err) => {
        if (!isMounted) return;
        console.error("Search fetch failed", err);
        setResults([]);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [finalSearchQuery, location.state]);

  return (
    <div style={{ minHeight: "100vh", paddingBottom: 60 }}>
      <Navbar />

      <main style={{ maxWidth: 1680, margin: "100px auto 30px", padding: "0 28px" }}>
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "var(--text-primary)" }}>
            Search Results for{" "}
            <span style={{ color: "var(--accent-light)" }}>"{finalSearchQuery || "All"}"</span>
          </h1>
          {!loading && (
            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", marginTop: 4 }}>
              Found {results.length} results
            </p>
          )}
        </div>

        {loading ? (
          <Container fluid={true} style={{ padding: 0 }}>
            <Row gutterWidth={16}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((n) => (
                <Col xl={2} lg={2.4} md={3} sm={4} xs={6} key={n}>
                  <SkeletonCard />
                </Col>
              ))}
            </Row>
          </Container>
        ) : results.length > 0 ? (
          <GridRenderer finalQuery={results} />
        ) : (
          <div
            className="glass-panel"
            style={{
              padding: "70px 20px",
              borderRadius: 16,
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 12,
            }}
          >
            <FrownOutlined style={{ fontSize: "3rem", color: "var(--text-muted)" }} />
            <h2 style={{ fontSize: "1.4rem", color: "var(--text-primary)" }}>No Anime Found</h2>
            <p style={{ color: "var(--text-secondary)", maxWidth: 450 }}>
              We couldn't find any results matching "{finalSearchQuery}". Try checking for spelling
              errors or searching with different keywords.
            </p>
            <button
              onClick={() => navigate("/")}
              style={{
                marginTop: 10,
                background: "#ffffff",
                color: "#0b0c10",
                fontWeight: 700,
                padding: "10px 24px",
                borderRadius: 9999,
              }}
            >
              Back to Home
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default SearchResults;
