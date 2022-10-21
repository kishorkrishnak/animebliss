import GridRenderer from "../Layouts/GridRenderer";
import { setConfiguration } from "react-grid-system";
import { useLocation } from "react-router-dom";
import Navbar from "../Sections/Navbar";
setConfiguration({ breakpoints: [580, 924, 1434, 1767, 2000, 2400] });
const SearchResults = () => {
  const location = useLocation();
  return (
    <>
      <Navbar></Navbar>
      <h1
        style={{
          fontSize: "3rem",
          color: "white",
          marginTop: 80,
          marginLeft: 20,
        }}
      >
        Search Results for{" "}
        <span style={{ color: "yellow" }}> {location.state.input}</span>
      </h1>
      <GridRenderer finalQuery={location.state.finalResults}></GridRenderer>
    </>
  );
};
export default SearchResults;
