import { useState, useEffect } from "react";
import { fetchMarketData, type MarketCoin } from "../api/marketApi";
import coins from "../mocks/coins.json";

const CACHE_KEY = "market-data-cache";
const CACHE_TTL = 60_000; // 1 minute

interface CacheEntry {
  data: MarketCoin[];
  timestamp: number;
}

let memoryCache: CacheEntry | null = null;

export function useMarketData() {
  const [data, setData] = useState<MarketCoin[]>(coins as MarketCoin[]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      // Check memory cache first
      if (memoryCache && Date.now() - memoryCache.timestamp < CACHE_TTL) {
        setData(memoryCache.data);
        setLoading(false);
        return;
      }

      // Check sessionStorage cache
      try {
        const cached = sessionStorage.getItem(CACHE_KEY);
        if (cached) {
          const entry: CacheEntry = JSON.parse(cached);
          if (Date.now() - entry.timestamp < CACHE_TTL) {
            memoryCache = entry;
            if (!cancelled) {
              setData(entry.data);
              setLoading(false);
            }
            return;
          }
        }
      } catch {
        // ignore parse errors
      }

      try {
        const coins = await fetchMarketData();
        const entry: CacheEntry = { data: coins, timestamp: Date.now() };
        memoryCache = entry;
        try {
          sessionStorage.setItem(CACHE_KEY, JSON.stringify(entry));
        } catch {
          // quota exceeded, ignore
        }
        if (!cancelled) {
          setData(coins);
          setError(null);
        }
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Failed to fetch market data");
          // keep the fallback mock data already in state
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return { coins: data, loading, error };
}
