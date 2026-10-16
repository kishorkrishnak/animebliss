import React, { useEffect, useState } from "react";
import CarouselRenderer from "../Layouts/CarouselRenderer";
import axios from "axios";
import { normalizeApiResponse } from "../../services/api";

const AnimeSection = ({ sectiontitle, url, fetchFn, id }) => {
  const [fetchedData, setFetchedData] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const loadSectionData = async () => {
      try {
        if (typeof fetchFn === "function") {
          const res = await fetchFn();
          if (!isMounted) return;
          const normalized = normalizeApiResponse(res);
          setFetchedData(normalized.results || []);
          return;
        }

        if (url) {
          const res = await axios.get(url);
          if (!isMounted) return;
          const normalized = normalizeApiResponse(res.data);
          setFetchedData(normalized.results || []);
        }
      } catch (err) {
        if (!isMounted) return;
        console.error(`Failed to fetch section ${sectiontitle}:`, err);
      }
    };

    loadSectionData();

    return () => {
      isMounted = false;
    };
  }, [url, fetchFn, sectiontitle]);

  if (!fetchedData || fetchedData.length === 0) return null;

  return (
    <section className="section section-anime" id={id}>
      <CarouselRenderer
        url={url}
        finalQuery={fetchedData}
        isAnimeCard={true}
        sectionTitle={sectiontitle}
      />
    </section>
  );
};

export default AnimeSection;
