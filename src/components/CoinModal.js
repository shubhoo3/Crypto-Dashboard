import React, { useEffect } from 'react';
import { formatCurrency, formatLargeNumber, formatPercentage, formatRank, getPriceChangeColor } from '../utils/formatters';
import './CoinModal.css';

const CoinModal = ({ coin, onClose }) => {
  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden'; // Prevent background scroll

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  // Handle backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!coin) return null;

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content">
        <div className="modal-header">
          <div className="coin-header-info">
            <img 
              src={coin.image} 
              alt={coin.name}
              className="modal-coin-logo"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            <div>
              <h2 className="modal-coin-name">{coin.name}</h2>
              <div className="modal-coin-symbol">{coin.symbol.toUpperCase()}</div>
            </div>
          </div>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="modal-body">
          <div className="price-section">
            <div className="current-price">
              <span className="price-label">Current Price</span>
              <span className="price-value">{formatCurrency(coin.current_price)}</span>
            </div>
            <div className={`price-change ${getPriceChangeColor(coin.price_change_percentage_24h)}`}>
              {formatPercentage(coin.price_change_percentage_24h)} (24h)
            </div>
          </div>

          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-label">Market Cap Rank</span>
              <span className="stat-value">{formatRank(coin.market_cap_rank)}</span>
            </div>
            
            <div className="stat-item">
              <span className="stat-label">Market Cap</span>
              <span className="stat-value">{formatLargeNumber(coin.market_cap)}</span>
            </div>
            
            <div className="stat-item">
              <span className="stat-label">24h Volume</span>
              <span className="stat-value">{formatLargeNumber(coin.total_volume)}</span>
            </div>
            
            <div className="stat-item">
              <span className="stat-label">24h Change</span>
              <span className={`stat-value ${getPriceChangeColor(coin.price_change_24h)}`}>
                {formatCurrency(coin.price_change_24h)}
              </span>
            </div>
            
            {coin.high_24h && (
              <div className="stat-item">
                <span className="stat-label">24h High</span>
                <span className="stat-value">{formatCurrency(coin.high_24h)}</span>
              </div>
            )}
            
            {coin.low_24h && (
              <div className="stat-item">
                <span className="stat-label">24h Low</span>
                <span className="stat-value">{formatCurrency(coin.low_24h)}</span>
              </div>
            )}
            
            {coin.circulating_supply && (
              <div className="stat-item">
                <span className="stat-label">Circulating Supply</span>
                <span className="stat-value">
                  {formatLargeNumber(coin.circulating_supply)} {coin.symbol.toUpperCase()}
                </span>
              </div>
            )}
            
            {coin.total_supply && (
              <div className="stat-item">
                <span className="stat-label">Total Supply</span>
                <span className="stat-value">
                  {formatLargeNumber(coin.total_supply)} {coin.symbol.toUpperCase()}
                </span>
              </div>
            )}
            
            {coin.max_supply && (
              <div className="stat-item">
                <span className="stat-label">Max Supply</span>
                <span className="stat-value">
                  {formatLargeNumber(coin.max_supply)} {coin.symbol.toUpperCase()}
                </span>
              </div>
            )}
            
            {coin.ath && (
              <div className="stat-item">
                <span className="stat-label">All-Time High</span>
                <span className="stat-value">{formatCurrency(coin.ath)}</span>
              </div>
            )}
            
            {coin.atl && (
              <div className="stat-item">
                <span className="stat-label">All-Time Low</span>
                <span className="stat-value">{formatCurrency(coin.atl)}</span>
              </div>
            )}
          </div>

          {coin.last_updated && (
            <div className="last-updated">
              Last updated: {new Date(coin.last_updated).toLocaleString()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoinModal;
