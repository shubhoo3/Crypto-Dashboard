import React from 'react';
import { useCoinsData } from '../hooks/useCoinsData';
import { useTrendingData } from '../hooks/useTrendingData';
import HighlightCard from './HighlightCard';
import LoadingSkeleton from './LoadingSkeleton';
import ErrorMessage from './ErrorMessage';
import './HighlightsSection.css';

const HighlightsSection = () => {
  const { coins, loading: coinsLoading, error: coinsError, refetch: refetchCoins } = useCoinsData({
    per_page: 100, // Get more coins for better highlights
    order: 'market_cap_desc'
  });

  const { trendingData, loading: trendingLoading, error: trendingError, refetch: refetchTrending } = useTrendingData();

  // Calculate highlights from coins data
  const getTopGainers = () => {
    return coins
      .filter(coin => coin.price_change_percentage_24h > 0)
      .sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h)
      .slice(0, 5);
  };

  const getTopLosers = () => {
    return coins
      .filter(coin => coin.price_change_percentage_24h < 0)
      .sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h)
      .slice(0, 5);
  };

  const getHighestVolume = () => {
    return coins
      .sort((a, b) => b.total_volume - a.total_volume)
      .slice(0, 5);
  };

  const getTopPerformers7d = () => {
    // Since we don't have 7d data in the basic endpoint, we'll use market cap as a proxy
    return coins
      .sort((a, b) => b.market_cap - a.market_cap)
      .slice(0, 5);
  };

  const getTrendingCoins = () => {
    return trendingData?.coins?.slice(0, 5) || [];
  };

  const loading = coinsLoading || trendingLoading;
  const error = coinsError || trendingError;

  if (loading) {
    return (
      <div className="highlights-section">
        <h2>Crypto Highlights</h2>
        <div className="highlights-grid">
          {Array.from({ length: 5 }).map((_, index) => (
            <LoadingSkeleton key={index} type="highlight" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="highlights-section">
        <h2>Crypto Highlights</h2>
        <ErrorMessage 
          message={error} 
          onRetry={() => {
            refetchCoins();
            refetchTrending();
          }} 
        />
      </div>
    );
  }

  return (
    <div className="highlights-section">
      <div className="highlights-header">
        <h2>Crypto Highlights</h2>
        <p>Discover the most interesting cryptocurrencies based on market activity and trends</p>
      </div>
      
      <div className="highlights-grid">
        <HighlightCard
          title="🔥 Trending Coins"
          subtitle="Most searched on CoinGecko"
          coins={getTrendingCoins()}
          type="trending"
        />
        
        <HighlightCard
          title="📈 Top Gainers"
          subtitle="Biggest 24h price increases"
          coins={getTopGainers()}
          type="gainers"
        />
        
        <HighlightCard
          title="📉 Top Losers"
          subtitle="Biggest 24h price decreases"
          coins={getTopLosers()}
          type="losers"
        />
        
        <HighlightCard
          title="💰 Highest Volume"
          subtitle="Most traded in 24h"
          coins={getHighestVolume()}
          type="volume"
        />
        
        <HighlightCard
          title="👑 Market Leaders"
          subtitle="Top cryptocurrencies by market cap"
          coins={getTopPerformers7d()}
          type="market-cap"
        />
      </div>
    </div>
  );
};

export default HighlightsSection;
