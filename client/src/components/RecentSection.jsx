import InfiniteSection from "./InfiniteSection";
import Navbar from "./Navbar";
import React from "react";

const RecentSection = () => {
  return (
    <>
      <Navbar></Navbar>
      <InfiniteSection
        url={"https://consumet-api.herokuapp.com/meta/anilist/recent-episodes"}
        itemlimit={18}
        sectiontitle={"Recent Episodes"}
        id="recent-nav"
        querytype={"?"}
      ></InfiniteSection>
    </>
  );
};

export default RecentSection;
