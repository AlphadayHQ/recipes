import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Shell } from './components/layout/Shell';
import { Home } from './pages/Home';
import { PriceAlert } from './pages/alerts/PriceAlert';
import { PercentAlert } from './pages/alerts/PercentAlert';
import { PeriodicAlert } from './pages/alerts/PeriodicAlert';
import { VolumeAlert } from './pages/alerts/VolumeAlert';
import { FundingRateAlert } from './pages/alerts/FundingRateAlert';
import { MarketCapAlert } from './pages/alerts/MarketCapAlert';
import { DominanceAlert } from './pages/alerts/DominanceAlert';
import { StockAlert } from './pages/alerts/StockAlert';

function Placeholder({ title }: { title: string }) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-center">
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      <p className="text-text-muted">Coming soon — this page is under construction.</p>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Shell />}>
          <Route path="/" element={<Home />} />

          {/* Market alerts */}
          <Route path="/alerts/price" element={<PriceAlert />} />
          <Route path="/alerts/percent" element={<PercentAlert />} />
          <Route path="/alerts/periodic" element={<PeriodicAlert />} />
          <Route path="/alerts/volume" element={<VolumeAlert />} />
          <Route path="/alerts/funding-rate" element={<FundingRateAlert />} />
          <Route path="/alerts/market-cap" element={<MarketCapAlert />} />
          <Route path="/alerts/dominance" element={<DominanceAlert />} />
          <Route path="/alerts/stock" element={<StockAlert />} />

          {/* Listing alerts (Phase 3) */}
          <Route path="/alerts/listing" element={<Placeholder title="New Listing Alert" />} />
          <Route path="/alerts/listing/events" element={<Placeholder title="Listing Events" />} />

          {/* On-chain alerts (Phase 3) */}
          <Route path="/alerts/wallet" element={<Placeholder title="Wallet Watch Alert" />} />
          <Route path="/alerts/wallet-balance" element={<Placeholder title="Wallet Balance Alert" />} />
          <Route path="/alerts/whale" element={<Placeholder title="Whale Alert" />} />
          <Route path="/alerts/gas" element={<Placeholder title="ETH Gas Alert" />} />
          <Route path="/alerts/mempool" element={<Placeholder title="Mempool Alert" />} />
          <Route path="/alerts/blockchain" element={<Placeholder title="Blockchain Alert" />} />

          {/* Directories (Phase 4) */}
          <Route path="/coins" element={<Placeholder title="Coin Directory" />} />
          <Route path="/coins/:symbol" element={<Placeholder title="Coin Detail" />} />
          <Route path="/exchanges" element={<Placeholder title="Exchange Directory" />} />
          <Route path="/exchanges/:slug" element={<Placeholder title="Exchange Detail" />} />

          {/* Supporting pages (Phase 5) */}
          <Route path="/dashboard" element={<Placeholder title="Dashboard" />} />
          <Route path="/login" element={<Placeholder title="Log In" />} />
          <Route path="/signup" element={<Placeholder title="Sign Up" />} />
          <Route path="/pricing" element={<Placeholder title="Pricing" />} />
          <Route path="/settings" element={<Placeholder title="Settings" />} />
          <Route path="/faq" element={<Placeholder title="FAQ" />} />
          <Route path="/guides" element={<Placeholder title="Guides" />} />
          <Route path="/guides/:slug" element={<Placeholder title="Guide" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
