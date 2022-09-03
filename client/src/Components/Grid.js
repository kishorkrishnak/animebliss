import { Container, Row, Col } from "react-grid-system";

import { v4 as uuidv4 } from "uuid";
import GridCard from "./GridCard";
export default function Grid({ finalQuery }) {
  return (
<Container fluid={true} >
    <Row justify="center" gutterWidth={1}>
      {finalQuery.map((query, index) => (
        <Col
          
          align="center"
          lg={2.4}
          md={5}
          sm={6}
          xs={6}
        >
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
