import { useState, useEffect } from "react";
import {
  fetchCooldowns,
  fetchFrequencies,
  type Cooldown,
  type Frequency,
} from "../api/alertApi";

const CACHE_KEY_COOLDOWNS = "alert-cooldowns-cache";
const CACHE_KEY_FREQUENCIES = "alert-frequencies-cache";
const CACHE_TTL = 300_000; // 5 minutes

interface CacheEntry<T> {
  data: T[];
  timestamp: number;
}

let cooldownCache: CacheEntry<Cooldown> | null = null;
let frequencyCache: CacheEntry<Frequency> | null = null;

function readSessionCache<T>(key: string): CacheEntry<T> | null {
  try {
    const raw = sessionStorage.getItem(key);
    if (raw) {
      const entry: CacheEntry<T> = JSON.parse(raw);
      if (Date.now() - entry.timestamp < CACHE_TTL) return entry;
    }
  } catch {
    // ignore parse errors
  }
  return null;
}

function writeSessionCache<T>(key: string, data: T[]) {
  try {
    sessionStorage.setItem(key, JSON.stringify({ data, timestamp: Date.now() }));
  } catch {
    // quota exceeded, ignore
  }
}

export function useAlertOptions() {
  const [cooldowns, setCooldowns] = useState<Cooldown[]>([]);
  const [frequencies, setFrequencies] = useState<Frequency[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      let cd = cooldownCache;
      let fq = frequencyCache;

      // Try session storage if memory cache is stale
      if (!cd || Date.now() - cd.timestamp >= CACHE_TTL) {
        cd = readSessionCache<Cooldown>(CACHE_KEY_COOLDOWNS);
      }
      if (!fq || Date.now() - fq.timestamp >= CACHE_TTL) {
        fq = readSessionCache<Frequency>(CACHE_KEY_FREQUENCIES);
      }

      // Return cached if both are fresh
      if (cd && fq) {
        cooldownCache = cd;
        frequencyCache = fq;
        if (!cancelled) {
          setCooldowns(cd.data);
          setFrequencies(fq.data);
          setLoading(false);
        }
        return;
      }

      try {
        const [cdData, fqData] = await Promise.all([
          fetchCooldowns(),
          fetchFrequencies(),
        ]);

        cooldownCache = { data: cdData, timestamp: Date.now() };
        frequencyCache = { data: fqData, timestamp: Date.now() };
        writeSessionCache(CACHE_KEY_COOLDOWNS, cdData);
        writeSessionCache(CACHE_KEY_FREQUENCIES, fqData);

        if (!cancelled) {
          setCooldowns(cdData);
          setFrequencies(fqData);
        }
      } catch {
        // keep empty arrays on failure
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return { cooldowns, frequencies, loading };
}
