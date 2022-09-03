import { Container, Row, Col } from "react-grid-system";
import AnimeCard from "./AnimeCard";
import { v4 as uuidv4 } from "uuid";
import GridCard from "./GridCard";
export default function Grid({ finalQuery }) {
  return (
    <Row justify="center" gutterWidth={1}>
      {finalQuery.map((query, index) => (
        <Col lg={2.4}>
          <GridCard
            title={query.title.english}
            image={query.image}
            key={uuidv4()}
            score={query.score}
          ></GridCard>
        </Col>
      ))}
    </Row>
  );
}
