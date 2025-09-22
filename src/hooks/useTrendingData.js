import { useState, useEffect, useCallback } from 'react';
import { coinGeckoAPI } from '../services/api';
import cache from '../utils/cache';

export const useTrendingData = () => {
  const [trendingData, setTrendingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTrendingData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const cacheKey = 'trending_data';
      
      // Check cache first
      const cachedData = cache.get(cacheKey);
      if (cachedData) {
        setTrendingData(cachedData);
        setLoading(false);
        return;
      }

      const data = await coinGeckoAPI.getTrendingCoins();
      
      // Cache for 5 minutes
      cache.set(cacheKey, data, 300000);
      
      setTrendingData(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching trending data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTrendingData();
    
    // Refresh trending data every 5 minutes
    const interval = setInterval(fetchTrendingData, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [fetchTrendingData]);

  const refetch = useCallback(() => {
    fetchTrendingData();
  }, [fetchTrendingData]);

  return {
    trendingData,
    loading,
    error,
    refetch
  };
};
