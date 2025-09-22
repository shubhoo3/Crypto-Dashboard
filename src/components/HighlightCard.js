import React from 'react';
import { formatCurrency, formatLargeNumber, formatPercentage, getPriceChangeColor } from '../utils/formatters';
import './HighlightCard.css';

const HighlightCard = ({ title, subtitle, coins, type }) => {
  const renderCoinItem = (coin, index) => {
    // Handle different coin data structures (trending vs regular coins)
    const coinData = coin.item || coin; // Trending coins have nested structure
    const name = coinData.name;
    const symbol = coinData.symbol;
    const image = coinData.large || coinData.image;
    const price = coin.current_price;
    const change24h = coin.price_change_percentage_24h;
    const volume = coin.total_volume;
    const marketCap = coin.market_cap;

    return (
      <div key={coinData.id || index} className="highlight-coin-item">
        <div className="coin-rank">#{index + 1}</div>
        <div className="coin-basic-info">
          <img 
            src={image} 
            alt={name}
            className="highlight-coin-logo"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <div className="coin-name-info">
            <div className="highlight-coin-name">{name}</div>
            <div className="highlight-coin-symbol">{symbol?.toUpperCase()}</div>
          </div>
        </div>
        <div className="coin-stats">
          {type === 'trending' && (
            <div className="trending-score">
              <span className="stat-label">Trending</span>
              <span className="stat-value">🔥 #{coinData.market_cap_rank || 'N/A'}</span>
            </div>
          )}
          
          {(type === 'gainers' || type === 'losers') && change24h !== undefined && (
            <div className="price-change-stat">
              <span className="stat-label">24h Change</span>
              <span className={`stat-value ${getPriceChangeColor(change24h)}`}>
                {formatPercentage(change24h)}
              </span>
            </div>
          )}
          
          {type === 'volume' && volume && (
            <div className="volume-stat">
              <span className="stat-label">24h Volume</span>
              <span className="stat-value">{formatLargeNumber(volume)}</span>
            </div>
          )}
          
          {type === 'market-cap' && marketCap && (
            <div className="market-cap-stat">
              <span className="stat-label">Market Cap</span>
              <span className="stat-value">{formatLargeNumber(marketCap)}</span>
            </div>
          )}
          
          {price && (
            <div className="price-stat">
              <span className="stat-label">Price</span>
              <span className="stat-value">{formatCurrency(price)}</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  const getCardClassName = () => {
    const baseClass = 'highlight-card';
    switch (type) {
      case 'trending':
        return `${baseClass} trending-card`;
      case 'gainers':
        return `${baseClass} gainers-card`;
      case 'losers':
        return `${baseClass} losers-card`;
      case 'volume':
        return `${baseClass} volume-card`;
      case 'market-cap':
        return `${baseClass} market-cap-card`;
      default:
        return baseClass;
    }
  };

  return (
    <div className={getCardClassName()}>
      <div className="highlight-card-header">
        <h3 className="highlight-title">{title}</h3>
        <p className="highlight-subtitle">{subtitle}</p>
      </div>
      
      <div className="highlight-card-body">
        {coins.length === 0 ? (
          <div className="no-data">
            <span>No data available</span>
          </div>
        ) : (
          <div className="coins-list">
            {coins.map((coin, index) => renderCoinItem(coin, index))}
          </div>
        )}
      </div>
      
      {coins.length > 0 && (
        <div className="highlight-card-footer">
          <span className="view-more">View more →</span>
        </div>
      )}
    </div>
  );
};

export default HighlightCard;
