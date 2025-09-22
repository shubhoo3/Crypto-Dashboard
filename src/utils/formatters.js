// Format currency values
export const formatCurrency = (value, currency = 'USD', minimumFractionDigits = 2) => {
  if (value === null || value === undefined || isNaN(value)) {
    return 'N/A';
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: minimumFractionDigits,
    maximumFractionDigits: minimumFractionDigits
  }).format(value);
};

// Format large numbers with abbreviations
export const formatLargeNumber = (value) => {
  if (value === null || value === undefined || isNaN(value)) {
    return 'N/A';
  }

  const abs = Math.abs(value);
  
  if (abs >= 1e12) {
    return (value / 1e12).toFixed(2) + 'T';
  } else if (abs >= 1e9) {
    return (value / 1e9).toFixed(2) + 'B';
  } else if (abs >= 1e6) {
    return (value / 1e6).toFixed(2) + 'M';
  } else if (abs >= 1e3) {
    return (value / 1e3).toFixed(2) + 'K';
  }
  
  return value.toFixed(2);
};

// Format percentage change
export const formatPercentage = (value, includeSign = true) => {
  if (value === null || value === undefined || isNaN(value)) {
    return 'N/A';
  }

  const formatted = Math.abs(value).toFixed(2);
  const sign = value >= 0 ? '+' : '-';
  
  return includeSign ? `${sign}${formatted}%` : `${formatted}%`;
};

// Format market cap rank
export const formatRank = (rank) => {
  if (!rank) return 'N/A';
  return `#${rank}`;
};

// Truncate text with ellipsis
export const truncateText = (text, maxLength = 50) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

// Format coin name for display
export const formatCoinName = (name, symbol) => {
  return `${name} (${symbol?.toUpperCase()})`;
};

// Get price change color class
export const getPriceChangeColor = (change) => {
  if (change > 0) return 'text-success';
  if (change < 0) return 'text-danger';
  return 'text-muted';
};

// Format time ago
export const formatTimeAgo = (date) => {
  const now = new Date();
  const diffInSeconds = Math.floor((now - new Date(date)) / 1000);
  
  if (diffInSeconds < 60) {
    return 'Just now';
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  }
};
