// Simple in-memory cache with TTL (Time To Live)
class Cache {
  constructor() {
    this.cache = new Map();
  }

  // Set cache entry with TTL in milliseconds
  set(key, value, ttl = 60000) { // Default 1 minute
    const expirationTime = Date.now() + ttl;
    this.cache.set(key, {
      value,
      expirationTime
    });
  }

  // Get cache entry if not expired
  get(key) {
    const entry = this.cache.get(key);
    
    if (!entry) {
      return null;
    }

    if (Date.now() > entry.expirationTime) {
      this.cache.delete(key);
      return null;
    }

    return entry.value;
  }

  // Check if key exists and is not expired
  has(key) {
    return this.get(key) !== null;
  }

  // Clear expired entries
  cleanup() {
    const now = Date.now();
    for (const [key, entry] of this.cache.entries()) {
      if (now > entry.expirationTime) {
        this.cache.delete(key);
      }
    }
  }

  // Clear all cache
  clear() {
    this.cache.clear();
  }

  // Get cache size
  size() {
    return this.cache.size;
  }
}

// Create singleton cache instance
const cache = new Cache();

// Cleanup expired entries every 5 minutes
setInterval(() => {
  cache.cleanup();
}, 5 * 60 * 1000);

export default cache;
