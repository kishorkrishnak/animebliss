import { useEffect, useState } from "react";
import "./Header.css";
import axios from "axios";
import HeaderCarouselRenderer from "../Layouts/HeaderCarouselRenderer";
import Navbar from "./Navbar";
const Header = () => {
  const [finalResults, setFinalResults] = useState([]);
  useEffect(() => {
    axios
      .get("https://api.consumet.org/meta/anilist/trending")
      .then(({ data: { results } }) => {
        setFinalResults(results);
      }, []);
  }, []);
  return (
    <>
      {finalResults.length > 0 && (
        <>
          <Navbar></Navbar>
          <header className="header">
            <section className="section section-carousel">
              <HeaderCarouselRenderer
                finalResults={finalResults}
              ></HeaderCarouselRenderer>
            </section>
          </header>
        </>
      )}
    </>
  );
};
export default Header;
