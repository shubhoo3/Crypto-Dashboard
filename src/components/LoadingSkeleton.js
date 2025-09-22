import React from 'react';
import './LoadingSkeleton.css';

const LoadingSkeleton = ({ rows = 10, type = 'table' }) => {
  if (type === 'card') {
    return (
      <div className="skeleton-card">
        <div className="skeleton skeleton-title"></div>
        <div className="skeleton skeleton-text"></div>
        <div className="skeleton skeleton-text"></div>
      </div>
    );
  }

  if (type === 'highlight') {
    return (
      <div className="skeleton-highlight">
        <div className="skeleton skeleton-highlight-title"></div>
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="skeleton-highlight-item">
            <div className="skeleton skeleton-circle"></div>
            <div className="skeleton skeleton-text-small"></div>
            <div className="skeleton skeleton-text-small"></div>
          </div>
        ))}
      </div>
    );
  }

  // Default table skeleton
  return (
    <div className="skeleton-table">
      <div className="skeleton-header">
        {Array.from({ length: 7 }).map((_, index) => (
          <div key={index} className="skeleton skeleton-header-cell"></div>
        ))}
      </div>
      {Array.from({ length: rows }).map((_, index) => (
        <div key={index} className="skeleton-row">
          <div className="skeleton skeleton-cell-small"></div>
          <div className="skeleton skeleton-cell-medium"></div>
          <div className="skeleton skeleton-cell-small"></div>
          <div className="skeleton skeleton-cell-small"></div>
          <div className="skeleton skeleton-cell-small"></div>
          <div className="skeleton skeleton-cell-medium"></div>
          <div className="skeleton skeleton-cell-small"></div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
