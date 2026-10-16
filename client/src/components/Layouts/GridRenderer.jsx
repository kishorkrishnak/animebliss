import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Col, Container, Row, setConfiguration } from "react-grid-system";
import { v4 as uuidv4 } from "uuid";
import AnimeCard from "../Cards/AnimeCard";

setConfiguration({ breakpoints: [576, 768, 992, 1200, 1500, 1800] });

const GridRenderer = ({ finalQuery, setAnimeInfo, isAnimate }) => {
  const [isAnimated, setIsAnimated] = useState(true);

  useEffect(() => {
    if (isAnimate !== undefined) {
      setIsAnimated(isAnimate);
    }
  }, [isAnimate]);

  if (!finalQuery || !Array.isArray(finalQuery) || finalQuery.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "40px 20px", color: "var(--text-muted)" }}>
        No anime found.
      </div>
    );
  }

  return (
    <Container fluid={true} style={{ padding: "0 24px" }}>
      <Row justify="start" gutterWidth={16}>
        {finalQuery.map((query, index) => (
          <Col
            align="stretch"
            xl={2}
            lg={2.4}
            md={3}
            sm={4}
            xs={6}
            key={uuidv4()}
            style={{ marginBottom: 12 }}
          >
            <motion.div
              initial={isAnimated ? { opacity: 0, y: 20 } : {}}
              animate={isAnimated ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.4) }}
              viewport={{ once: true }}
              style={{ height: "100%" }}
            >
              <AnimeCard
                setAnimeInfo={setAnimeInfo}
                title={query.title}
                id={query.id}
                image={query.image}
                rating={query.rating}
                year={query.releaseDate}
                type={query.type}
                episodeNumber={query.episodeNumber ? query.episodeNumber : 0}
                totalEpisodes={query.totalEpisodes}
              />
            </motion.div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default GridRenderer;
