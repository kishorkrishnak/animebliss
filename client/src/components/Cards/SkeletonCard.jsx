import React from "react";
import "./SkeletonCard.css";

const SkeletonCard = () => {
  return (
    <div className="skeleton-card-wrapper">
      <div className="skeleton-card-poster skeleton"></div>
      <div className="skeleton-card-line skeleton" style={{ width: "85%", height: 16 }}></div>
      <div className="skeleton-card-line skeleton" style={{ width: "45%", height: 12 }}></div>
    </div>
  );
};

export default SkeletonCard;
