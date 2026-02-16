import { API_BASE_URL, APP_HEADERS, MARKET_ROUTES } from "./config";

export interface MarketCoin {
  id: string;
  symbol: string;
  name: string;
  price: number;
  marketCap: number;
  rank: number;
  change24h: number;
}

interface RemoteCoinData {
  id: number;
  coin: {
    id: number;
    name: string;
    slug: string;
    ticker: string;
    icon?: string;
    price?: number;
    market_cap: number;
    rank?: number;
    price_percent_change_24h: number;
  };
  currency: string;
  price: number;
  price_percent_change_24h: number;
  volume: number;
  market_cap: number;
  date: string;
}

interface MarketDataResponse {
  count: number;
  results: RemoteCoinData[];
}

export async function fetchMarketData(
  limit = 50
): Promise<MarketCoin[]> {
  const params = new URLSearchParams({ limit: String(limit) });
  const res = await fetch(
    `${API_BASE_URL}${MARKET_ROUTES.BASE}?${params}`,
    {
      headers: APP_HEADERS,
    }
  );
  if (!res.ok) {
    throw new Error(`Market API error: ${res.status}`);
  }
  const data: MarketDataResponse = await res.json();
  return data.results
    .map((item) => ({
      id: item.coin.slug,
      symbol: item.coin.ticker,
      name: item.coin.name,
      price: item.price,
      marketCap: item.market_cap,
      rank: item.coin.rank ?? 0,
      change24h: item.price_percent_change_24h,
    }))
    .sort((a, b) => b.marketCap - a.marketCap);
}
