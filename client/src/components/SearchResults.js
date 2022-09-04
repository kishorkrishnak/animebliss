import GridRenderer from "./GridRenderer";
import { Container, Row, Col } from "react-grid-system";
import GridCard from "./GridCard";
import { v4 as uuidv4 } from "uuid";
import { useLocation } from "react-router-dom";
export default function SearchResults() {
  const location = useLocation();
  console.log(location.state.finalResults);

  return (
    <>
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
                  align="center"
                  xxl={2.4}
                  md={3}
                  sm={4}
                  xs={5}
                  key={uuidv4()}
                >
                  <GridCard
                    height={400}
                    width={320}
                    title={query.title}
                    image={query.images.jpg.large_image_url}
                    key={uuidv4()}
                    score={query.score}
                  ></GridCard>
                </Col>
              );
          })}
        </Row>
      </Container>
    </>
  );
}
