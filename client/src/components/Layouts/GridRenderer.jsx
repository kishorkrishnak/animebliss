import { Container, Row, Col } from "react-grid-system";
import { setConfiguration } from "react-grid-system";
import { v4 as uuidv4 } from "uuid";
import CarouselCard from "../Cards/AnimeCard";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
setConfiguration({ breakpoints: [600, 924, 1434, 1785, 2000, 2400] });
const GridRenderer = ({ finalQuery, setAnimeInfo, isAnimate }) => {
  useEffect(() => {
    setIsAnimated(isAnimate);
  }, [isAnimate]);
  const [isAnimated, setIsAnimated] = useState(true);
  return (
    <Container fluid={true}>
      <Row justify="start" gutterWidth={12}>
        {finalQuery.map((query, index) => (
          <Col
            align="center"
            md={2.4}
            lg={2}
            sm={3}
            xs={3.95}
            xl={1.71}
            key={uuidv4()}
          >
            <motion.div
              initial={
                isAnimated
                  ? {
                      opacity: 0,
                      translateX: -50,
                    }
                  : {}
              }
              animate={isAnimated ? { opacity: 1, translateX: 0 } : {}}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              viewport={{ once: true }}
            >
              <CarouselCard
                setAnimeInfo={setAnimeInfo}
                title={query.title}
                id={query.id}
                image={query.image}
                key={uuidv4()}
                rating={query.rating}
                year={query.releaseDate}
                episodeNumber={query.episodeNumber ? query.episodeNumber : 0}
                results={query}
              ></CarouselCard>
            </motion.div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};
export default GridRenderer;
