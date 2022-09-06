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
  const location = useLocation();
  console.log(location.state.finalResults);

  return (
    <>
      <Navbar></Navbar>
      <h1 style={{ fontSize: "3rem", color: "white" }}>
        Search Results for {location.state.input}
      </h1>
      <Container fluid={true}>
        <Row justify="center" gutterWidth={1}>
          {location.state.finalResults.map((query, index) => {
            if (
              query.images.jpg.large_image_url !==
              "https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png"
            )
              return (
                <Col
                align="center" xxl={2.3} md={2.4} sm={3} xs={6} key={uuidv4()}
                >
                  <GridCard
                    height={300}
                    width={210}
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
