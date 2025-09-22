import axios from 'axios';

const BASE_URL = process.env.REACT_APP_COINGECKO_BASE_URL || 'https://api.coingecko.com/api/v3';
const API_KEY = process.env.REACT_APP_COINGECKO_API_KEY;

// Create axios instance with default config
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
});

// Add API key to requests if available
if (API_KEY) {
  api.defaults.headers.common['x-cg-demo-api-key'] = API_KEY;
}

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`Making API request to: ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    
    if (error.response?.status === 429) {
      throw new Error('Rate limit exceeded. Please try again later.');
    }
    
    if (error.response?.status >= 500) {
      throw new Error('Server error. Please try again later.');
    }
    
    if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout. Please check your connection.');
    }
    
    throw new Error(error.response?.data?.error || 'An unexpected error occurred.');
  }
);

// API service methods
export const coinGeckoAPI = {
  // Get coins market data with pagination and sorting
  getCoinsMarkets: async (params = {}) => {
    const defaultParams = {
      vs_currency: 'usd',
      order: 'market_cap_desc',
      per_page: 50,
      page: 1,
      sparkline: false,
      price_change_percentage: '24h'
    };
    
    const response = await api.get('/coins/markets', {
      params: { ...defaultParams, ...params }
    });
    
    return response.data;
  },

  // Get trending coins
  getTrendingCoins: async () => {
    const response = await api.get('/search/trending');
    return response.data;
  },

  // Get single coin data
  getCoinById: async (id) => {
    const response = await api.get(`/coins/${id}`, {
      params: {
        localization: false,
        tickers: false,
        market_data: true,
        community_data: false,
        developer_data: false,
        sparkline: false
      }
    });
    
    return response.data;
  },

  // Search coins by name or symbol
  searchCoins: async (query) => {
    const response = await api.get('/search', {
      params: { query }
    });
    
    return response.data;
  },

  // Get global market data
  getGlobalData: async () => {
    const response = await api.get('/global');
    return response.data;
  }
};

export default api;
