import GridRenderer from "./GridRenderer";
import { Container, Row, Col } from "react-grid-system";
import GridCard from "./GridCard";
import { v4 as uuidv4 } from "uuid";
import { setConfiguration } from "react-grid-system";

import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import Navbar from "./Navbar";
setConfiguration({ breakpoints: [768, 1200, 1500, 1700, 1800, 1900] });

export default function SearchResults() {
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowSize(window.innerWidth);
    });
  });
  const calculateSize = (windowSize) => {
    if (windowSize > 1500) return [380, 280];
    else if (windowSize > 1168 && windowSize < 1500) return [250, 210];
    else if (windowSize > 450 && windowSize < 1168) return [250, 225];
    else if (windowSize > 380 && windowSize < 450) return [230, 175];
    else if (windowSize > 360 && windowSize < 380) return [230, 165];
    else if (windowSize >= 475 && windowSize < 1168) return [230, 225];
    else if (windowSize >= 440 && windowSize < 475) return [230, 210];
    else if (windowSize >= 420 && windowSize < 440) return [225, 185];
    else if (windowSize >= 390 && windowSize < 420) return [225, 175];
    else if (windowSize >= 360 && windowSize < 390) return [220, 165];
    else return [230, 150];
  };
  const location = useLocation();

  return (
    <>
      <Navbar></Navbar>
      <h1 style={{ fontSize: "3rem", color: "white" }}>
        Search Results for {location.state.input}
      </h1>
      <Container fluid={true}>
        <Row justify="center" gutterWidth={12}>
          {location.state.finalResults.map((query, index) => {
            if (
              query.images.jpg.large_image_url !==
              "https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png"
            )
              return (
                <Col
                  align="center"
                  xxl={2.3}
                  md={2.4}
                  sm={3}
                  xs={6}
                  key={uuidv4()}
                >
                  <GridCard
                    title={query.title}
                    image={query.images.jpg.large_image_url}
                    key={uuidv4()}
                    score={query.score}
                  ></GridCard>
                </Col>
              );
            else return null;
          })}
        </Row>
        <ToastContainer></ToastContainer>
      </Container>
    </>
  );
}
