// Simple in-memory TTL cache for demonstration only.
const cache = new Map();
const ttl = parseInt(process.env.CACHE_TTL || '60', 10);

exports.get = (key) => {
  const entry = cache.get(key);
  if(!entry) return null;
  if(entry.expiry < Date.now()) { cache.delete(key); return null; }
  return entry.value;
};

exports.set = (key, value, lifetimeSec = ttl) => {
  cache.set(key, { value, expiry: Date.now() + lifetimeSec * 1000 });
};
