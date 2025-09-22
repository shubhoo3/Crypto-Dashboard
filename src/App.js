import React, { useState } from 'react';
import { useCoinsData } from './hooks/useCoinsData';
import ErrorBoundary from './components/ErrorBoundary';
import HighlightsSection from './components/HighlightsSection';
import CoinsTable from './components/CoinsTable';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const { 
    coins, 
    loading, 
    error, 
    params,
    updateParams,
    refetch,
    sortCoins,
    searchCoins 
  } = useCoinsData();

  // Handle search from table component
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  // Handle sorting from table component
  const handleSort = (sortBy, direction) => {
    sortCoins(sortBy);
  };

  // Get filtered coins for display
  const displayCoins = searchTerm ? searchCoins(searchTerm) : coins;

  return (
    <ErrorBoundary>
      <div className="App">
        <header className="app-header">
          <div className="container">
            <div className="header-content">
              <h1 className="app-title">
                <span className="crypto-icon">₿</span>
                Crypto Dashboard
              </h1>
              <p className="app-subtitle">
                Live cryptocurrency market data powered by CoinGecko
              </p>
            </div>
            <div className="market-summary">
              <div className="summary-item">
                <span className="summary-label">Total Market Cap</span>
                <span className="summary-value">$4.10T</span>
                <span className="summary-change text-success">+1.2%</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">24h Trading Volume</span>
                <span className="summary-value">$169.73B</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Active Cryptocurrencies</span>
                <span className="summary-value">2.4M+</span>
              </div>
            </div>
          </div>
        </header>

        <main className="app-main">
          <div className="container">
            {/* Highlights Section */}
            <section className="highlights-wrapper">
              <HighlightsSection />
            </section>

            {/* All Coins Section */}
            <section className="coins-section">
              <div className="section-header">
                <h2>Cryptocurrency Prices by Market Cap</h2>
                <p>
                  The global cryptocurrency market cap today is $4.10 trillion, a 
                  <span className="text-success"> +1.2% </span> 
                  change in the last 24 hours.
                </p>
              </div>
              
              <CoinsTable
                coins={displayCoins}
                loading={loading}
                error={error}
                onRetry={refetch}
                onSort={handleSort}
                onSearch={handleSearch}
              />
            </section>
          </div>
        </main>

        <footer className="app-footer">
          <div className="container">
            <div className="footer-content">
              <div className="footer-section">
                <h4>Crypto Dashboard</h4>
                <p>Built with React and powered by CoinGecko API</p>
              </div>
              <div className="footer-section">
                <h4>Features</h4>
                <ul>
                  <li>Live market data</li>
                  <li>Real-time price updates</li>
                  <li>Trending cryptocurrencies</li>
                  <li>Market highlights</li>
                </ul>
              </div>
              <div className="footer-section">
                <h4>Data Source</h4>
                <p>
                  Market data provided by{' '}
                  <a 
                    href="https://www.coingecko.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="footer-link"
                  >
                    CoinGecko
                  </a>
                </p>
              </div>
            </div>
            <div className="footer-bottom">
              <p>&copy; 2024 Crypto Dashboard. Built for educational purposes.</p>
            </div>
          </div>
        </footer>
      </div>
    </ErrorBoundary>
  );
}

export default App;
