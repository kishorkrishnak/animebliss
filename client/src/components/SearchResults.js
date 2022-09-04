import GridRenderer from "./GridRenderer";
import { Container, Row, Col } from "react-grid-system";
import GridCard from "./GridCard";
import { v4 as uuidv4 } from "uuid";

export default function SearchResults({ finalResults, input }) {
  return (
    <>
      <h1 style={{ fontSize: "3rem", color: "white" }}>
        Search Results for {input}
      </h1>
      <Container fluid={true}>
        <Row justify="center" gutterWidth={1}>
          {finalResults.map((query, index) => (
            <Col align="center" xxl={2.4} md={3} sm={4} xs={5} key={uuidv4()}>
              <GridCard
                title={query.title}
                image={query.images.jpg.image_url}
                key={uuidv4()}
                score={query.score}
              ></GridCard>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}
