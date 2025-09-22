import React, { useState, useMemo } from 'react';
import { formatCurrency, formatLargeNumber, formatPercentage, formatRank, getPriceChangeColor } from '../utils/formatters';
import { debounce } from '../utils/debounce';
import LoadingSkeleton from './LoadingSkeleton';
import ErrorMessage from './ErrorMessage';
import CoinModal from './CoinModal';
import './CoinsTable.css';

const CoinsTable = ({ coins, loading, error, onRetry, onSort, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'desc' });
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const coinsPerPage = 50;

  // Debounced search function
  const debouncedSearch = useMemo(
    () => debounce((term) => {
      if (onSearch) {
        onSearch(term);
      }
    }, 300),
    [onSearch]
  );

  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
    setCurrentPage(1); // Reset to first page when searching
  };

  // Filter coins based on search term
  const filteredCoins = useMemo(() => {
    if (!searchTerm.trim()) return coins;
    
    return coins.filter(coin =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [coins, searchTerm]);

  // Sort coins
  const sortedCoins = useMemo(() => {
    if (!sortConfig.key) return filteredCoins;

    return [...filteredCoins].sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];

      // Handle null/undefined values
      if (aValue === null || aValue === undefined) aValue = 0;
      if (bValue === null || bValue === undefined) bValue = 0;

      if (sortConfig.direction === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  }, [filteredCoins, sortConfig]);

  // Paginate coins
  const paginatedCoins = useMemo(() => {
    const startIndex = (currentPage - 1) * coinsPerPage;
    return sortedCoins.slice(startIndex, startIndex + coinsPerPage);
  }, [sortedCoins, currentPage]);

  const totalPages = Math.ceil(sortedCoins.length / coinsPerPage);

  // Handle sorting
  const handleSort = (key) => {
    let direction = 'desc';
    if (sortConfig.key === key && sortConfig.direction === 'desc') {
      direction = 'asc';
    }
    setSortConfig({ key, direction });
    
    if (onSort) {
      onSort(key, direction);
    }
  };

  // Handle coin row click
  const handleCoinClick = (coin) => {
    setSelectedCoin(coin);
  };

  // Handle pagination
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Get sort indicator
  const getSortIndicator = (key) => {
    if (sortConfig.key !== key) return '↕️';
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  };

  if (loading) {
    return <LoadingSkeleton rows={10} type="table" />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={onRetry} />;
  }

  return (
    <div className="coins-table-container">
      {/* Search Bar */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search coins by name or symbol..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
        <span className="search-icon">🔍</span>
      </div>

      {/* Results Info */}
      <div className="results-info">
        <span>Showing {paginatedCoins.length} of {sortedCoins.length} coins</span>
      </div>

      {/* Table */}
      {sortedCoins.length === 0 ? (
        <div className="no-results">
          <h3>No coins found</h3>
          <p>Try adjusting your search terms or clearing the search.</p>
          {searchTerm && (
            <button 
              className="clear-search-btn"
              onClick={() => {
                setSearchTerm('');
                debouncedSearch('');
              }}
            >
              Clear Search
            </button>
          )}
        </div>
      ) : (
        <>
          <div className="table-container">
            <table className="coins-table">
              <thead>
                <tr>
                  <th 
                    onClick={() => handleSort('market_cap_rank')}
                    className="sortable"
                  >
                    # {getSortIndicator('market_cap_rank')}
                  </th>
                  <th>Coin</th>
                  <th 
                    onClick={() => handleSort('current_price')}
                    className="sortable"
                  >
                    Price {getSortIndicator('current_price')}
                  </th>
                  <th 
                    onClick={() => handleSort('price_change_percentage_24h')}
                    className="sortable"
                  >
                    24h % {getSortIndicator('price_change_percentage_24h')}
                  </th>
                  <th 
                    onClick={() => handleSort('price_change_24h')}
                    className="sortable"
                  >
                    24h Change {getSortIndicator('price_change_24h')}
                  </th>
                  <th 
                    onClick={() => handleSort('market_cap')}
                    className="sortable"
                  >
                    Market Cap {getSortIndicator('market_cap')}
                  </th>
                  <th 
                    onClick={() => handleSort('total_volume')}
                    className="sortable"
                  >
                    Volume (24h) {getSortIndicator('total_volume')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedCoins.map((coin) => (
                  <tr 
                    key={coin.id} 
                    onClick={() => handleCoinClick(coin)}
                    className="coin-row"
                  >
                    <td className="rank-cell">
                      {formatRank(coin.market_cap_rank)}
                    </td>
                    <td className="coin-cell">
                      <div className="coin-info">
                        <img 
                          src={coin.image} 
                          alt={coin.name}
                          className="coin-logo"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                        <div className="coin-details">
                          <div className="coin-name">{coin.name}</div>
                          <div className="coin-symbol">{coin.symbol.toUpperCase()}</div>
                        </div>
                      </div>
                    </td>
                    <td className="price-cell">
                      {formatCurrency(coin.current_price)}
                    </td>
                    <td className={`change-cell ${getPriceChangeColor(coin.price_change_percentage_24h)}`}>
                      {formatPercentage(coin.price_change_percentage_24h)}
                    </td>
                    <td className={`change-cell ${getPriceChangeColor(coin.price_change_24h)}`}>
                      {formatCurrency(coin.price_change_24h)}
                    </td>
                    <td className="market-cap-cell">
                      {formatLargeNumber(coin.market_cap)}
                    </td>
                    <td className="volume-cell">
                      {formatLargeNumber(coin.total_volume)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="pagination-btn"
              >
                Previous
              </button>
              
              <div className="pagination-info">
                Page {currentPage} of {totalPages}
              </div>
              
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="pagination-btn"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}

      {/* Coin Detail Modal */}
      {selectedCoin && (
        <CoinModal 
          coin={selectedCoin} 
          onClose={() => setSelectedCoin(null)} 
        />
      )}
    </div>
  );
};

export default CoinsTable;
