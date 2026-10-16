import React from "react";
import Navbar from "../Sections/Navbar";
import { useNavigate } from "react-router-dom";
import { AppstoreOutlined } from "@ant-design/icons";
import "./Genres.css";

const genresinfo = [
  {
    title: "Action",
    image: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/16498-8jpFCOcDmneX.jpg",
  },
  {
    title: "Adventure",
    image: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/101922-YfZhKBUDDS6L.jpg",
  },
  {
    title: "Comedy",
    image: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/21087-sHb9zUZFsHe1.jpg",
  },
  {
    title: "Drama",
    image: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/113415-jQBSkxWAAk83.jpg",
  },
  {
    title: "Fantasy",
    image: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/11757-TlEEV9weG4Ag.jpg",
  },
  {
    title: "Horror",
    image: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/20605-RCJ7M71zLmrh.jpg",
  },
  {
    title: "Mahou Shoujo",
    image: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/9756-d5M8NffgJJHB.jpg",
  },
  {
    title: "Mecha",
    image: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/99423-xu78CeWOO5FW.jpg",
  },
  {
    title: "Music",
    image: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/20665-j4kSsfhfkM24.jpg",
  },
  {
    title: "Mystery",
    image: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/21234-7lfSSPoMmwr2.jpg",
  },
  {
    title: "Psychological",
    image: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/1535.jpg",
  },
  {
    title: "Romance",
    image: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/124080-ARyLAHHgikRq.jpg",
  },
  {
    title: "Sci-fi",
    image: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/n9253-JIhmKgBKsWUN.jpg",
  },
  {
    title: "Slice of Life",
    image: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/20954-f30bHMXa5Qoe.jpg",
  },
  {
    title: "Sports",
    image: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/20464-PpYjO9cPN1gs.jpg",
  },
  {
    title: "Supernatural",
    image: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/20447-nlgQQzcgWbgw.jpg",
  },
  {
    title: "Thriller",
    image: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/108632-yeLbrgPN4Oni.jpg",
  },
];

const formatsInfo = [
  {
    title: "TV",
    image: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/16498-8jpFCOcDmneX.jpg",
  },
  {
    title: "OVA",
    image: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/21087-sHb9zUZFsHe1.jpg",
  },
  {
    title: "TV SHORT",
    image: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/101922-YfZhKBUDDS6L.jpg",
  },
  {
    title: "ONA",
    image: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/11757-TlEEV9weG4Ag.jpg",
  },
  {
    title: "MOVIE",
    image: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/113415-jQBSkxWAAk83.jpg",
  },
  {
    title: "SPECIAL",
    image: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/11757-TlEEV9weG4Ag.jpg",
  },
];

const seasonsInfo = [
  {
    title: "WINTER",
    image: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/101759-MhlCoeqnODso.jpg",
  },
  {
    title: "SPRING",
    image: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/5114-q0V5URebphSG.jpg",
  },
  {
    title: "SUMMER",
    image: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/20997-nE9VyUa08vS0.jpg",
  },
  {
    title: "FALL",
    image: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/97940-1URQdQ4U1a0b.jpg",
  },
];

const statusesInfo = [
  {
    title: "RELEASING",
    image: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/21-wf37VakJmZqs.jpg",
  },
  {
    title: "FINISHED",
    image: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/20-HHxhPj5JD13a.jpg",
  },
  {
    title: "CANCELLED",
    image: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/11757-TlEEV9weG4Ag.jpg",
  },
];

// Pure original thumbnail presentation with zero filters
const getCardStyle = (imageUrl) => ({
  backgroundImage: `url(${imageUrl})`,
});

const Genres = () => {
  const navigate = useNavigate();

  const handleFilterClick = (type, val) => {
    navigate(`/filtered/${type}/${encodeURIComponent(val.toLowerCase())}`, {
      state: { type, value: val },
    });
  };

  return (
    <div className="filter-page-root">
      <Navbar />

      <main className="filter-container">
        <div className="filter-header">
          <h1 className="filter-main-title">
            <AppstoreOutlined style={{ color: "var(--accent-light)", marginRight: 12 }} />
            Browse & Filter
          </h1>
          <p className="filter-subtitle">
            Explore anime by genre, season, release format, and airing status.
          </p>
        </div>

        {/* Genres */}
        <section className="filter-category-section">
          <h2 className="filter-section-title">Genres</h2>
          <div className="filter-cards-grid">
            {genresinfo.map((genre) => (
              <div
                key={genre.title}
                onClick={() => handleFilterClick("genre", genre.title)}
                className="filter-card"
                style={getCardStyle(genre.image)}
              >
                <span className="filter-card-title">{genre.title}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Formats */}
        <section className="filter-category-section">
          <h2 className="filter-section-title">Formats</h2>
          <div className="filter-cards-grid">
            {formatsInfo.map((format) => (
              <div
                key={format.title}
                onClick={() => handleFilterClick("format", format.title.replace(" ", "_"))}
                className="filter-card"
                style={getCardStyle(format.image)}
              >
                <span className="filter-card-title">{format.title}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Seasons */}
        <section className="filter-category-section">
          <h2 className="filter-section-title">Seasons</h2>
          <div className="filter-cards-grid">
            {seasonsInfo.map((season) => (
              <div
                key={season.title}
                onClick={() => handleFilterClick("season", season.title)}
                className="filter-card"
                style={getCardStyle(season.image)}
              >
                <span className="filter-card-title">{season.title}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Status */}
        <section className="filter-category-section">
          <h2 className="filter-section-title">Status</h2>
          <div className="filter-cards-grid">
            {statusesInfo.map((status) => (
              <div
                key={status.title}
                onClick={() => handleFilterClick("status", status.title)}
                className="filter-card"
                style={getCardStyle(status.image)}
              >
                <span className="filter-card-title">{status.title}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Genres;
