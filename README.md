# Crypto Dashboard

A modern, responsive cryptocurrency dashboard built with React that displays live market data from the CoinGecko API. This application provides comprehensive cryptocurrency information including market prices, trends, and highlights.


## 🚀 Features

### All Coins View
- **Live Market Data**: Real-time cryptocurrency prices and market information
- **Comprehensive Table**: Displays rank, name, price, 24h change, market cap, and volume
- **Search Functionality**: Search coins by name or symbol with debounced input
- **Sorting**: Sort by price, 24h change, market cap, volume, and rank
- **Pagination**: Client-side pagination for better performance
- **Detailed View**: Click any coin row to view detailed information in a modal

### Highlights Section
- **🔥 Trending Coins**: Most searched cryptocurrencies on CoinGecko
- **📈 Top Gainers**: Biggest 24h price increases
- **📉 Top Losers**: Biggest 24h price decreases  
- **💰 Highest Volume**: Most traded cryptocurrencies in 24h
- **👑 Market Leaders**: Top cryptocurrencies by market cap

### User Experience
- **Loading States**: Skeleton loaders for better perceived performance
- **Error Handling**: Comprehensive error handling with retry functionality
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Accessibility**: Keyboard navigation and screen reader support
- **Performance**: Caching, debouncing, and optimized API calls

## 🛠 Tech Stack

- **Frontend**: React 19.1.1
- **HTTP Client**: Axios for API requests
- **Styling**: Pure CSS with modern features (Grid, Flexbox, CSS Variables)
- **Build Tool**: React Scripts (Create React App)
- **API**: CoinGecko API v3

## 🏗 Architecture Overview

### Design Patterns Used

1. **Custom Hooks Pattern**
   - `useCoinsData`: Manages coins data fetching, caching, and state
   - `useTrendingData`: Handles trending coins data with auto-refresh
   - Encapsulates data fetching logic and provides clean API to components

2. **Service Layer Pattern**
   - `api.js`: Centralized API service with interceptors for error handling
   - Axios instance configuration with timeout and retry logic
   - Consistent error handling across all API calls

3. **Component Composition**
   - Modular components with single responsibility
   - Higher-order components for error boundaries
   - Reusable UI components (LoadingSkeleton, ErrorMessage)

4. **State Management**
   - Local state with React hooks
   - Prop drilling minimized through component composition
   - Caching layer for API responses

5. **Utility Functions**
   - Pure functions for data formatting and calculations
   - Debouncing for search input optimization
   - Centralized formatting logic for consistency

### Folder Structure

```
src/
├── components/          # Reusable UI components
│   ├── CoinsTable.js   # Main coins table with search and sorting
│   ├── HighlightsSection.js # Crypto highlights container
│   ├── HighlightCard.js # Individual highlight cards
│   ├── CoinModal.js    # Detailed coin information modal
│   ├── LoadingSkeleton.js # Loading state components
│   ├── ErrorBoundary.js # Error boundary for crash handling
│   └── ErrorMessage.js # Error display component
├── hooks/              # Custom React hooks
│   ├── useCoinsData.js # Coins data management
│   └── useTrendingData.js # Trending data management
├── services/           # API and external services
│   └── api.js         # CoinGecko API service
├── utils/             # Utility functions
│   ├── formatters.js  # Data formatting functions
│   ├── cache.js       # In-memory caching utility
│   └── debounce.js    # Debouncing utilities
├── App.js             # Main application component
├── App.css            # Global application styles
├── index.js           # Application entry point
└── index.css          # Global CSS reset and utilities
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- CoinGecko API key (free tier available)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd crypto-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your CoinGecko API key:
   ```
   REACT_APP_COINGECKO_API_KEY=your_api_key_here
   REACT_APP_COINGECKO_BASE_URL=https://api.coingecko.com/api/v3
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## 🔑 API Key Setup

1. Visit [CoinGecko API Documentation](https://docs.coingecko.com/docs/setting-up-your-api-key)
2. Sign up for a free account
3. Generate your API key
4. Add it to your `.env` file as shown above

**Note**: The free tier has rate limits. The application includes caching and debouncing to minimize API calls.

## 📊 API Endpoints Used

- `GET /coins/markets` - Market data for cryptocurrencies
- `GET /search/trending` - Trending cryptocurrencies
- `GET /coins/{id}` - Detailed coin information (for modal)
- `GET /global` - Global market statistics

## 🎯 Performance Optimizations

1. **Caching**: In-memory cache with TTL for API responses
2. **Debouncing**: Search input debounced to reduce API calls
3. **Pagination**: Client-side pagination for better UX
4. **Code Splitting**: Lazy loading for better initial load times
5. **Image Optimization**: Fallback handling for coin logos
6. **Memoization**: React.useMemo for expensive calculations

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `REACT_APP_COINGECKO_API_KEY` | CoinGecko API key | Required |
| `REACT_APP_COINGECKO_BASE_URL` | API base URL | `https://api.coingecko.com/api/v3` |

### Customization

- **Pagination**: Modify `coinsPerPage` in `CoinsTable.js`
- **Cache TTL**: Adjust cache duration in `cache.js`
- **Debounce Delay**: Change search debounce in `CoinsTable.js`
- **Refresh Intervals**: Modify auto-refresh in hooks

## 🔮 Future Improvements

### Planned Features
- **Portfolio Tracking**: Add/remove coins to personal portfolio
- **Price Alerts**: Set price alerts for specific cryptocurrencies
- **Historical Charts**: Interactive price charts with different timeframes
- **News Integration**: Latest crypto news and market updates
- **Dark Mode**: Toggle between light and dark themes
- **Advanced Filters**: Filter by market cap, volume, price range
- **Export Data**: Export market data to CSV/Excel


## 🐛 Known Limitations

1. **Rate Limits**: Free CoinGecko API has rate limits (30 calls/minute)
2. **Real-time Data**: Updates every 30 seconds, not truly real-time
3. **Historical Data**: Limited historical data on free tier
4. **Coin Details**: Some coins may have incomplete data



