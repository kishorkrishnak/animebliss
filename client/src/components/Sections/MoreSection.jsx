import { useLocation } from "react-router-dom";
import InfiniteSection from "./InfiniteSection";
import Navbar from "./Navbar";
const MoreSection = () => {
  const location = useLocation();
  return (
    <>
      <Navbar></Navbar>
      <h1
        className="more-title"
        style={{
          color: "white",
          fontSize: "2.9rem",
          marginLeft: 25,
          marginBottom: 3,
          marginTop: 90,
        }}
      >
        {location.state.sectionTitle}
      </h1>
      <InfiniteSection
        itemlimit={28}
        id={location.state.sectionTitle}
        querytype={"?"}
        url={location.state.url}
      ></InfiniteSection>
    </>
  );
};
export default MoreSection;
