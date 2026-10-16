<div align="center">

# 🌌 AnimeBliss

**The Next-Generation, Ad-Free Anime Streaming & Discovery Experience**

[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black)](https://reactjs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen?style=flat-square)](#)
[![Code Style: Modern](https://img.shields.io/badge/Design-Production_Streaming-indigo?style=flat-square)](#)

*Stream your favorite subbed and dubbed anime in crystal-clear HD with zero ad interruptions, instant multi-provider video resolution, and local-first progress tracking.*

---

</div>

## ✨ Highlights & Key Features

- **🎬 Multi-Provider Streaming & Server Switching**
  - Seamlessly streams episodes from **AnimeKai** as the default HD provider.
  - Interactive on-the-fly server switcher supporting **AnimePahe**, **AnimeSaturn**, **AnimeUnity**, and **AniList/Gogoanime** backups so playback never buffers or fails.
  - Server discovery with automated quality selection.

- **🔥 100% Dynamic Content (Zero Static Hardcoding)**
  - Real-time **Hero Spotlight Carousel** displaying active seasonal trending anime.
  - Dynamic **Live Airing Schedule** and **Latest Episodes** updated minute-by-minute.
  - Dynamic segmented control tabs across **Home**, **Recent**, and **Movies** pages (*Trending*, *New Releases*, *Latest Completed*, *Top Airing*, *TV*, *OVA*, *ONA*, *Specials*, and *Dubbed*).

- **🛡️ Resilient Failover & Mirror Architecture**
  - Robust API service layer with automated failover: if primary endpoints experience network limits or redirects, requests gracefully transition to high-availability mirrors.
  - Data normalization across disparate provider schemas.

- **✨ Sleek Production Streaming Aesthetic**
  - Netflix/Crunchyroll-tier visual design: pure high-contrast charcoal canvas, crisp hairline borders, clean typography, and frosted glass panels.
  - Unfiltered, crystal-clear poster thumbnails free of artificial edge vignetting or dark smudges.
  - Solid high-contrast CTA controls and responsive touch-friendly navigation.

- **⚡ Local-First Watchlist & Progress Resume**
  - Continue Watching carousels with precise timestamps and completion percentage bars.
  - Client-side Watchlist with quick-filter chips and live sync across sessions.
  - Clean avatar customization powered by DiceBear Adventurer avatars.

- **🔍 Live Typeahead Search Suggestions**
  - Debounced auto-complete dropdown showing instant poster previews, episode counts, and rating chips.

---

## 🛠️ Architecture & Tech Stack

```
animebliss/
├── client/
│   ├── public/                 # Static assets, HTML shell, and manifest
│   ├── src/
│   │   ├── assets/             # Brand logos and iconography
│   │   ├── components/
│   │   │   ├── Cards/          # AnimeCard, HeroCard, UpcomingCard, SkeletonCard
│   │   │   ├── Layouts/        # CarouselRenderer, GridRenderer, Layout wrappers
│   │   │   ├── Others/         # ClockLoader and animation feedback
│   │   │   ├── Pages/          # Home, AnimePlayerPage, Recent, Movies, Filtered, Watchlist, Auth
│   │   │   ├── Players/        # AnimePlayer (HLS/Vime), TrailerPlayer
│   │   │   └── Sections/       # Hero, Navbar, ContinueWatching, InfiniteSection, Upcoming
│   │   └── services/
│   │       ├── api/            # Centralized API service layer
│   │       │   ├── config.js   # Route builders & environment variable configuration
│   │       │   ├── client.js   # Resilient Axios client with automated failover
│   │       │   ├── animeKaiApi.js # Complete AnimeKai endpoint implementations
│   │       │   ├── providerApi.js # Multi-provider stream resolution & server discovery
│   │       │   └── index.js    # Unified barrel exports
│   │       └── storage.js      # Local-first watchlist & progress tracking
│   ├── .env.example            # Environment configuration template
│   └── package.json            # React scripts, dependencies & build pipelines
├── .gitignore                  # Production git rules protecting secrets
└── README.md                   # Project documentation
```

### Core Technologies
- **Frontend Framework:** React 18, React Router v6
- **Video & Playback:** `@vime/react`, HLS streaming, HTML5 Custom Video Engine
- **HTTP & Data Fetching:** Axios with automated fallback resolution
- **Animations & Grid:** Framer Motion, React Elastic Carousel, React Grid System
- **Icons & Notifications:** Ant Design Icons, FontAwesome, React Hot Toast
- **Avatars:** DiceBear Adventurer API

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16.x, v18.x, or later recommended)
- `npm` or `yarn`

### Installation

1. **Clone your repository:**
   ```bash
   git clone https://github.com/anoopjogibettu/animebliss.git
   cd animebliss/client
   ```

2. **Install project dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Copy the provided `.env.example` file to `.env`:
   ```bash
   cp .env.example .env
   ```

   The default configuration is ready out of the box:
   ```env
   # Primary Consumet API Base URL
   REACT_APP_CONSUMET_API_URL=https://api.consumet.org

   # Resilient Fallback Mirror (ensures uninterrupted streaming)
   REACT_APP_CONSUMET_FALLBACK_URL=https://consumet-instance-alpha.vercel.app

   # AniList Meta API (Rich artwork, seasonal metadata)
   REACT_APP_ANILIST_API_URL=https://consumet-instance-alpha.vercel.app/meta/anilist

   # Primary Anime Provider
   REACT_APP_CONSUMET_PROVIDER=animekai
   ```

4. **Start the Development Server:**
   ```bash
   npm start
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

5. **Build for Production:**
   ```bash
   npm run build
   ```
   The production-ready artifacts will be compiled into the `client/build/` directory.

---

## 📡 API Reference

All anime endpoints are centralized under `client/src/services/api/`:

| Endpoint | Method | Description |
|---|---|---|
| `/anime/animekai/{query}` | `animeKaiApi.search(query, page)` | Search anime by keyword |
| `/anime/animekai/info?id={id}` | `animeKaiApi.getInfo(id)` | Detailed metadata, relations, and episode list |
| `/anime/animekai/watch/{episodeId}` | `animeKaiApi.getWatch(episodeId)` | Video stream source extraction |
| `/anime/animekai/servers/{episodeId}` | `animeKaiApi.getServers(episodeId)` | Available video streaming mirrors/servers |
| `/anime/animekai/search-suggestions/{query}` | `animeKaiApi.getSearchSuggestions(query)` | Live typeahead search suggestions |
| `/anime/animekai/spotlight` | `animeKaiApi.getSpotlight()` | Curated seasonal spotlight anime |
| `/anime/animekai/schedule/{date}` | `animeKaiApi.getSchedule(date)` | Airing schedule for a given date |
| `/anime/animekai/recent-episodes` | `animeKaiApi.getRecentEpisodes(page)` | Newly aired episodes |
| `/anime/animekai/recent-added` | `animeKaiApi.getRecentAdded(page)` | Recently added anime series |
| `/anime/animekai/new-releases` | `animeKaiApi.getNewReleases(page)` | Newly releasing anime titles |
| `/anime/animekai/latest-completed` | `animeKaiApi.getLatestCompleted(page)` | Recently finished/completed anime |
| `/anime/animekai/genre/list` | `animeKaiApi.getGenreList()` | List of anime genres |
| `/anime/animekai/genre/{genre}` | `animeKaiApi.getByGenre(genre, page)` | Anime filtered by genre |
| `/anime/animekai/movies` | `animeKaiApi.getMovies(page)` | Feature-length anime movies |
| `/anime/animekai/tv` | `animeKaiApi.getTv(page)` | Television anime series |
| `/anime/animekai/ova` | `animeKaiApi.getOva(page)` | Original Video Animations (OVA) |
| `/anime/animekai/ona` | `animeKaiApi.getOna(page)` | Original Net Animations (ONA) |
| `/anime/animekai/specials` | `animeKaiApi.getSpecials(page)` | Anime specials and side stories |
| `/anime/animepahe/watch?episodeId={id}` | `providerApi.getAnimePaheWatch(id)` | Alternative AnimePahe video stream |
| `/anime/animesaturn/watch/{id}` | `providerApi.getAnimeSaturnWatch(id)` | Alternative AnimeSaturn video stream |
| `/anime/animeunity/watch/{id}` | `providerApi.getAnimeUnityWatch(id)` | Alternative AnimeUnity video stream |
| `/anime/hianime/dubbed-anime` | `providerApi.getHiAnimeDubbed(page)` | English-dubbed anime catalog |
| `/anime/kickassanime/servers?episodeId={id}` | `providerApi.getKickAssAnimeServers(id)` | KickAssAnime server mirrors |

---

## 🤝 Contributing & Upstream Synchronization

AnimeBliss welcomes community contributions! If you would like to contribute:

1. **Fork the repository** on GitHub.
2. **Create a descriptive feature branch:**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your improvements:**
   ```bash
   git commit -m "feat: enhance streaming resilience and card aesthetics"
   ```
4. **Push to your fork:**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request** against the upstream repository:
   - Upstream repository: [`ExoticFormula/animebliss`](https://github.com/ExoticFormula/animebliss)

---

## 📄 License & Disclaimer

This project is licensed under the MIT License - see the LICENSE file for details.

*Disclaimer: AnimeBliss does not host or store any media files on its servers. All media is provided by third-party services and APIs. AnimeBliss is built solely for educational and portfolio demonstration purposes.*
