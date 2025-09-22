import { useState, useEffect, useCallback } from 'react';
import { coinGeckoAPI } from '../services/api';
import cache from '../utils/cache';

export const useCoinsData = (initialParams = {}) => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [params, setParams] = useState({
    page: 1,
    per_page: 50,
    order: 'market_cap_desc',
    ...initialParams
  });

  const fetchCoins = useCallback(async (searchParams = params) => {
    try {
      setLoading(true);
      setError(null);

      // Create cache key from params
      const cacheKey = `coins_${JSON.stringify(searchParams)}`;
      
      // Check cache first
      const cachedData = cache.get(cacheKey);
      if (cachedData) {
        setCoins(cachedData);
        setLoading(false);
        return;
      }

      const data = await coinGeckoAPI.getCoinsMarkets(searchParams);
      
      // Cache the data for 30 seconds
      cache.set(cacheKey, data, 30000);
      
      setCoins(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching coins:', err);
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchCoins();
  }, [fetchCoins]);

  const updateParams = useCallback((newParams) => {
    setParams(prev => ({ ...prev, ...newParams }));
  }, []);

  const refetch = useCallback(() => {
    fetchCoins(params);
  }, [fetchCoins, params]);

  const sortCoins = useCallback((sortBy) => {
    const sortMapping = {
      'market_cap': 'market_cap_desc',
      'price': 'price_desc',
      'volume': 'volume_desc',
      'change': 'price_change_percentage_24h_desc'
    };
    
    updateParams({ order: sortMapping[sortBy] || sortBy, page: 1 });
  }, [updateParams]);

  const searchCoins = useCallback((query) => {
    if (query.trim()) {
      // For search, we'll filter client-side for better UX
      const filtered = coins.filter(coin => 
        coin.name.toLowerCase().includes(query.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(query.toLowerCase())
      );
      return filtered;
    }
    return coins;
  }, [coins]);

  return {
    coins,
    loading,
    error,
    params,
    updateParams,
    refetch,
    sortCoins,
    searchCoins
  };
};
