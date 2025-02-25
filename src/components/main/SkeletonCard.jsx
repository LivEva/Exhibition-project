import React from "react";
import '../styling/skeletonCard.css'

const SkeletonCard = () => {
  return (
    <div className="collection-card-container skeleton">
      <div className="skeleton-image"></div>
      <div className="skeleton-text skeleton-title"></div>
      <div className="skeleton-text skeleton-location"></div>
      <div className="skeleton-text skeleton-date"></div>
      <div className="skeleton-text skeleton-type"></div>
      <div className="skeleton-text skeleton-department"></div>
    </div>
  );
};

export default SkeletonCard;
