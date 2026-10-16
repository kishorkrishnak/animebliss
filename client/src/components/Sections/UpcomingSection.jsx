import axios from "axios";
import { useEffect, useState } from "react";
import CarouselRenderer from "../Layouts/CarouselRenderer";
import TrailerPlayer from "../Players/TrailerPlayer";
import { ANILIST_API_URL } from "../../services/api";

const UpcomingSection = () => {
  const [trailerId, setTrailerId] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [upcoming, setUpComing] = useState([]);

  const url = "https://api.jikan.moe/v4/top/anime?filter=upcoming";

  useEffect(() => {
    let isMounted = true;
    axios
      .get(url)
      .then(({ data }) => {
        if (!isMounted) return;
        if (data?.data && data.data.length > 0) {
          setUpComing(data.data);
        } else {
          throw new Error("Empty Jikan data");
        }
      })
      .catch((err) => {
        console.warn("Jikan upcoming failed or rate-limited, falling back to live AniList upcoming", err);
        return axios
          .get(`${ANILIST_API_URL}/advanced-search?status=NOT_YET_RELEASED&sort=["POPULARITY_DESC"]`)
          .then(({ data }) => {
            if (!isMounted) return;
            const formatted = (data?.results || []).map((item) => ({
              title: typeof item.title === "object" ? item.title?.english || item.title?.romaji : item.title,
              image: item.image,
              trailer: item.trailer ? { youtube_id: item.trailer.id || item.trailer.youtube_id } : null,
              id: item.id,
            }));
            setUpComing(formatted);
          })
          .catch(() => {});
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="section section-upcoming" id="upcoming">
      {upcoming.length > 0 && (
        <CarouselRenderer
          finalQuery={upcoming}
          sectionTitle="Upcoming & Anticipated"
          isAnimeCard={false}
          setIsPlaying={setIsPlaying}
          setTrailerId={setTrailerId}
          url={url}
        ></CarouselRenderer>
      )}
      <TrailerPlayer
        setIsPlaying={setIsPlaying}
        isPlaying={isPlaying}
        trailerId={trailerId}
      ></TrailerPlayer>
    </section>
  );
};

export default UpcomingSection;
