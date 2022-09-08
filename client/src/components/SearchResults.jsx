import GridRenderer from "./GridRenderer";
import { Container, Row, Col } from "react-grid-system";
import GridCard from "./GridCard";
import { v4 as uuidv4 } from "uuid";
import { setConfiguration } from "react-grid-system";
import { AnimeInfoContext } from "./Home";
import { useLocation } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";

import Navbar from "./Navbar";
setConfiguration({ breakpoints: [768, 1170, 1500, 1700, 1800, 1900] });

export default function SearchResults() {
  const location = useLocation();
  const AnimeContext = useContext(AnimeInfoContext);

  const [windowSize, setWindowSize] = useState(window.innerWidth);
  useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowSize(window.innerWidth);
      console.log(windowSize);
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
  console.log(AnimeContext);
  return (
    <>
      <Navbar></Navbar>
      <h1
        style={{
          fontSize: "3rem",
          color: "white",
          marginTop: 80,
          marginLeft: 20,
        }}
      >
        Search Results for{" "}
        <span style={{ color: "yellow" }}> {location.state.input}</span>
      </h1>
      <Container fluid={true}>
        <Row justify="center" gutterWidth={12}>
          {location.state.finalResults.map((query, index) => {
            return (
              <Col align="center" xxl={2} md={2.4} sm={4} xs={6} key={uuidv4()}>
                <GridCard
                  // setAnimeInfo={AnimeContext.setAnimeInfo}
                  // onOpenModal = {AnimeContext.setAnimeInfo}
                  title={query.title.english}
                  id={query.id}
                  image={query.image}
                  key={uuidv4()}
                  rating={query.rating}
                  year={query.releaseDate}
                  results={query}
                ></GridCard>
              </Col>
            );
          })}
        </Row>
        <ToastContainer></ToastContainer>
      </Container>
    </>
  );
}
