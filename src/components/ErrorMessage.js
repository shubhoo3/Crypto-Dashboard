import React from 'react';
import './ErrorMessage.css';

const ErrorMessage = ({ message, onRetry, showRetry = true }) => {
  return (
    <div className="error-message">
      <div className="error-icon">⚠️</div>
      <h3>Oops! Something went wrong</h3>
      <p>{message || 'An unexpected error occurred. Please try again.'}</p>
      {showRetry && onRetry && (
        <button className="retry-btn" onClick={onRetry}>
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
