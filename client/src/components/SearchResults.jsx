import { Container, Row, Col } from "react-grid-system";
import GridCard from "./GridCard";
import { v4 as uuidv4 } from "uuid";
import { setConfiguration } from "react-grid-system";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import Navbar from "./Navbar";
setConfiguration({ breakpoints: [768, 1170, 1500, 1700, 1800, 1900] });

export default function SearchResults({ setAnimeInfo, onOpenModal }) {
  const location = useLocation();

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
                  setAnimeInfo={setAnimeInfo}
                  onOpenModal={onOpenModal}
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
