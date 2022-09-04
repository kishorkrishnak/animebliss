import Login from "./Login";
import "./Home.css";
import { useState } from "react";
import RecentSection from "./RecentSection";
import TrendingSection from "./TrendingSection";
import SearchResults from "./SearchResults";
import Wallpapers from "./Wallpapers";
import Header from "./Header";
import TopAiringSection from "./TopAiringSection";
import UpcomingSection from "./UpcomingSection";
import PopularSection from "./PopularSection";
import FavoriteSection from "./FavoriteSection";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

export default function Home() {
  return (
    <>
      <Header></Header>
      <UpcomingSection></UpcomingSection>
      <FavoriteSection></FavoriteSection>
      <TopAiringSection></TopAiringSection>
    </>
  );
}
