import { Container, Row, Col } from "react-grid-system";
import { setConfiguration } from "react-grid-system";
import { v4 as uuidv4 } from "uuid";
import GridCard from "./GridCard";
import { useState, useEffect } from "react";
setConfiguration({ breakpoints: [1100, 1428, 1500, 1700, 1800, 1900] });

export default function Grid({ finalQuery }) {
  const [windowSize, setWindowSize] = useState(null);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowSize(window.innerWidth);
      console.log(windowSize);
    });
  });
  return (
    <Container fluid={true}>
      <Row justify="center" gutterWidth={1}>
        {finalQuery.map((query, index) => (
          <Col align="center" xxl={2.4} md={3} sm={4} xs={5} key={uuidv4()}>
            <GridCard
              title={query.title.english}
              image={query.image}
              key={uuidv4()}
              score={query.score}
            ></GridCard>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
