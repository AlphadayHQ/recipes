import { useState, useEffect } from "react";
import {
  fetchCooldowns,
  fetchFrequencies,
  fetchPresets,
  type Cooldown,
  type Frequency,
  type Preset,
} from "../api/alertApi";

const CACHE_KEY_COOLDOWNS = "alert-cooldowns-cache";
const CACHE_KEY_FREQUENCIES = "alert-frequencies-cache";
const CACHE_KEY_PRESETS = "alert-presets-cache";
const CACHE_TTL = 300_000; // 5 minutes

interface CacheEntry<T> {
  data: T[];
  timestamp: number;
}

let cooldownCache: CacheEntry<Cooldown> | null = null;
let frequencyCache: CacheEntry<Frequency> | null = null;
let presetCache: CacheEntry<Preset> | null = null;

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
  const [presets, setPresets] = useState<Preset[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      let cd = cooldownCache;
      let fq = frequencyCache;
      let ps = presetCache;

      // Try session storage if memory cache is stale
      if (!cd || Date.now() - cd.timestamp >= CACHE_TTL) {
        cd = readSessionCache<Cooldown>(CACHE_KEY_COOLDOWNS);
      }
      if (!fq || Date.now() - fq.timestamp >= CACHE_TTL) {
        fq = readSessionCache<Frequency>(CACHE_KEY_FREQUENCIES);
      }
      if (!ps || Date.now() - ps.timestamp >= CACHE_TTL) {
        ps = readSessionCache<Preset>(CACHE_KEY_PRESETS);
      }

      // Return cached if all are fresh
      if (cd && fq && ps) {
        cooldownCache = cd;
        frequencyCache = fq;
        presetCache = ps;
        if (!cancelled) {
          setCooldowns(cd.data);
          setFrequencies(fq.data);
          setPresets(ps.data);
          setLoading(false);
        }
        return;
      }

      try {
        const [cdData, fqData, psData] = await Promise.all([
          fetchCooldowns(),
          fetchFrequencies(),
          fetchPresets(),
        ]);

        cooldownCache = { data: cdData, timestamp: Date.now() };
        frequencyCache = { data: fqData, timestamp: Date.now() };
        presetCache = { data: psData, timestamp: Date.now() };
        writeSessionCache(CACHE_KEY_COOLDOWNS, cdData);
        writeSessionCache(CACHE_KEY_FREQUENCIES, fqData);
        writeSessionCache(CACHE_KEY_PRESETS, psData);

        if (!cancelled) {
          setCooldowns(cdData);
          setFrequencies(fqData);
          setPresets(psData);
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

  return { cooldowns, frequencies, presets, loading };
}
