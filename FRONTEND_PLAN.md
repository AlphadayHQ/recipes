# Cryptocurrency Alerting — Frontend Prototype Plan

## Overview

A frontend-only prototype of a crypto alerting platform. Users can configure alerts for price movements, new listings, wallet activity, gas fees, and more — then choose how they want to be notified. **No backend**; all state lives in-memory or localStorage. API calls are mocked/stubbed.

---

## Tech Stack

| Layer | Choice | Notes |
|-------|--------|-------|
| Framework | **React 18+** (Vite) | Fast dev, component model fits well |
| Routing | **React Router v6** | File-like route structure |
| State | **Zustand** or React Context | Lightweight; holds alerts, user prefs |
| Styling | **Your choice** (Tailwind placeholder) | All styles are swappable |
| Mock Data | Static JSON files in `/src/mocks/` | Coin list, exchanges, prices, etc. |
| Charts (optional) | Recharts or lightweight lib | For price history on coin pages |

---

## Page Map & Routes

```
/                           → Landing / Home
/login                      → Login page
/signup                     → Sign-up page
/dashboard                  → Authenticated home — alert overview

/alerts/price               → Price Alert creator & list
/alerts/percent             → Percentage / Volatility Alert
/alerts/periodic            → Periodic Price Alert
/alerts/volume              → Volume Alert
/alerts/funding-rate        → Funding Rate Alert
/alerts/market-cap          → Market Cap Alert
/alerts/dominance           → BTC Dominance Alert
/alerts/stock               → Stock / ETF Alert

/alerts/listing             → New Coin Listing Alert
/alerts/listing/events      → Recent listing detections (table)

/alerts/wallet              → Wallet Watch Alert
/alerts/wallet-balance      → Wallet Balance Alert
/alerts/whale               → Whale Alert
/alerts/gas                 → ETH Gas Price Alert
/alerts/mempool             → Bitcoin Mempool Alert
/alerts/blockchain          → Generic Blockchain Metric Alert

/coins                      → Coin directory (searchable table)
/coins/:symbol              → Single coin detail page
/exchanges                  → Exchange directory
/exchanges/:slug            → Single exchange detail page

/pricing                    → Plans & pricing
/settings                   → User settings / notification preferences
/faq                        → FAQ
/guides                     → Guides index
/guides/:slug               → Single guide
```

---

## Shared Layout & Components

### Global Shell

```
┌──────────────────────────────────────────┐
│  Navbar                                  │
│  [Logo] [Market] [Listings] [On-chain]   │
│         [Notifications] [Learn]  [Auth]  │
├──────────────────────────────────────────┤
│                                          │
│  <Page Content />                        │
│                                          │
├──────────────────────────────────────────┤
│  Footer                                  │
│  Links · Legal · Socials                 │
└──────────────────────────────────────────┘
```

### Reusable Components

| Component | Purpose |
|-----------|---------|
| `<Navbar />` | Top nav with dropdowns for Market, Listings, On-chain, etc. |
| `<Footer />` | Site links, legal, social icons |
| `<AlertForm />` | **Core component** — configurable alert builder (see below) |
| `<AlertList />` | Table/cards showing a user's active alerts with edit/delete |
| `<AlertCard />` | Single alert summary (type icon, coin, condition, status toggle) |
| `<CoinSelector />` | Searchable dropdown for picking a coin (from mock data) |
| `<ExchangeSelector />` | Dropdown for picking an exchange |
| `<NotificationMethodPicker />` | Multi-select for: Email, SMS, Phone, Push, Webhook, Telegram, Discord, Slack |
| `<PriceDisplay />` | Shows current mock price for a coin with optional sparkline |
| `<TabBar />` | Horizontal tab strip used on alert category pages |
| `<Modal />` | Generic modal for confirmations, alert detail editing |
| `<PricingCard />` | Plan card with feature list and CTA |
| `<DataTable />` | Sortable, filterable table (coins, exchanges, listing events) |
| `<SearchInput />` | Debounced search field used in directories |
| `<Badge />` | Status badge (active, paused, triggered) |
| `<Toast />` | Notification toast for "Alert created", "Alert deleted", etc. |

---

## Page Details

### 1. Landing Page (`/`)

The public marketing page. Mirrors the original site structure.

**Sections:**
1. **Hero** — Headline, subtitle, primary CTA ("Get Started")
2. **Alert Type Tabs** — Horizontal tab strip: Price, Percent, Periodic, Volume, Funding, MarketCap, Dominance, Stocks
3. **Interactive Alert Demo** — A live `<AlertForm />` configured for the selected tab (works without auth in prototype; shows a success toast on submit)
4. **Coin Listing Alert Section** — Secondary alert form for listing alerts
5. **On-chain Section** — Tabs: Wallet, Balance, Whale, Gas, Mempool, Blockchain — each with its own `<AlertForm />`
6. **Social Proof / Stats** — "Monitoring X coins across Y exchanges"
7. **Feature Highlights** — Three columns: notification methods, exchange coverage, set-and-forget

### 2. Auth Pages (`/login`, `/signup`)

Simple forms. No real auth — just toggle an `isAuthenticated` flag in state.

**Fields:**
- Login: email, password
- Signup: email, password, confirm password
- Both: links to switch between login/signup

### 3. Dashboard (`/dashboard`)

Authenticated landing. Overview of all the user's alerts.

**Sections:**
1. **Summary Stats** — Total alerts, active, paused, triggered today
2. **Recent Triggers** — Feed of recently triggered alerts (mock data)
3. **Alerts by Category** — Grouped cards or collapsible sections: Market alerts, Listing alerts, On-chain alerts
4. **Quick Create** — CTA buttons to jump to each alert type

### 4. Alert Pages (`/alerts/*`)

Each alert type gets its own page. They all share the same layout pattern:

```
┌────────────────────────────────────┐
│  Page Title & Description          │
├────────────────────────────────────┤
│  <AlertForm type="price" />        │
│  (fields vary per alert type)      │
├────────────────────────────────────┤
│  <AlertList type="price" />        │
│  Your active alerts of this type   │
├────────────────────────────────────┤
│  Info / FAQ section for this type  │
└────────────────────────────────────┘
```

#### Alert Form Field Matrix

| Alert Type | Coin Selector | Exchange Selector | Direction (above/below) | Threshold Input | Currency Selector | Notification Picker | Cooldown | Extra Fields |
|------------|:---:|:---:|:---:|:---:|:---:|:---:|:---:|---|
| **Price** | ✅ | ✅ | ✅ | ✅ (price) | ✅ (USD/BTC/ETH…) | ✅ | ✅ | Note, one-time toggle |
| **Percent** | ✅ | ✅ | ✅ (rises/drops) | ✅ (%) | — | ✅ | ✅ | Time window |
| **Periodic** | ✅ | ✅ | — | — | ✅ | ✅ | — | Frequency (hourly/daily/weekly) |
| **Volume** | ✅ | ✅ | ✅ | ✅ (volume) | ✅ | ✅ | ✅ | — |
| **Funding Rate** | ✅ | ✅ | ✅ | ✅ (rate %) | — | ✅ | ✅ | — |
| **Market Cap** | ✅ | — | ✅ | ✅ ($) | ✅ | ✅ | ✅ | — |
| **BTC Dominance** | — | — | ✅ | ✅ (%) | — | ✅ | ✅ | — |
| **Stock** | Stock picker | Exchange picker | ✅ | ✅ (price) | ✅ | ✅ | ✅ | — |
| **Listing** | Any/specific coin | ✅ | — | — | — | ✅ | — | Note, one-time toggle |
| **Wallet Watch** | — | — | increase/decrease/change | — | — | ✅ | — | Wallet address, chain picker, nickname, ignore-tokens toggle |
| **Wallet Balance** | — | — | ✅ | ✅ (amount) | — | ✅ | ✅ | Wallet address, chain picker |
| **Whale** | — | — | — | ✅ (min $) | — | ✅ | ✅ | Chain picker, token filter |
| **ETH Gas** | — | — | above/below | ✅ (gwei) | — | ✅ | ✅ | Speed tier (fast/avg/slow) |
| **Mempool** | — | — | above/below | ✅ (MB/txns) | — | ✅ | ✅ | — |
| **Blockchain** | — | — | ✅ | ✅ | — | ✅ | ✅ | Metric selector |

### 5. Coin Directory (`/coins`)

- `<SearchInput />` at top
- `<DataTable />` with columns: Rank, Logo, Name, Symbol, Price, 24h%, Market Cap
- Row click → `/coins/:symbol`

### 6. Coin Detail (`/coins/:symbol`)

- Coin name, logo, price, 24h change
- Mini price chart (mock data)
- Quick "Set Price Alert" CTA (pre-fills `<AlertForm />`)
- Supported exchanges list

### 7. Exchange Directory (`/exchanges`)

- Table of exchanges: Logo, Name, # Coins, Alert Support
- Row click → `/exchanges/:slug`

### 8. Exchange Detail (`/exchanges/:slug`)

- Exchange name, logo, link
- Coins listed on this exchange (table)
- Recent listing events on this exchange

### 9. Pricing (`/pricing`)

- 2–3 `<PricingCard />` components (Free / Pro / Enterprise)
- Feature comparison table
- FAQ section

### 10. Settings (`/settings`)

- **Notification Methods** — Configure/connect each method (email, phone, Telegram, etc.)
- **Preferences** — Default cooldown, default currency, timezone
- **Account** — Email, password change (mock)

### 11. FAQ (`/faq`)

- Accordion-style question/answer list

### 12. Guides (`/guides`, `/guides/:slug`)

- Index: card grid of guide titles
- Detail: rendered markdown content (static)

---

## Mock Data Files

```
/src/mocks/
  coins.json          → Top ~100 coins: id, symbol, name, price, marketCap, logo
  exchanges.json      → ~15 exchanges: id, name, slug, logo, coinCount
  alerts.json         → Sample user alerts (pre-seeded for demo)
  listing-events.json → Recent mock listing events
  prices.json         → Historical price data points for charts
  gas.json            → Current mock ETH gas prices
```

---

## State Shape (Zustand store)

```ts
interface AppState {
  // Auth
  isAuthenticated: boolean;
  user: { email: string } | null;

  // Alerts
  alerts: Alert[];
  addAlert: (alert: Alert) => void;
  updateAlert: (id: string, patch: Partial<Alert>) => void;
  deleteAlert: (id: string) => void;
  toggleAlert: (id: string) => void;

  // UI
  toasts: Toast[];
  addToast: (toast: Toast) => void;
}

interface Alert {
  id: string;
  type: AlertType;       // 'price' | 'percent' | 'listing' | 'wallet' | 'gas' | ...
  coin?: string;         // symbol
  exchange?: string;
  condition?: 'above' | 'below' | 'rises' | 'drops' | 'change';
  threshold?: number;
  currency?: string;
  notificationMethods: NotificationMethod[];
  cooldown?: string;
  note?: string;
  oneTime?: boolean;
  isActive: boolean;
  createdAt: string;
  // type-specific fields
  walletAddress?: string;
  chain?: string;
  gasSpeed?: string;
  frequency?: string;
}
```

---

## Implementation Order

### Phase 1 — Skeleton
1. Project setup (Vite + React + Router + Zustand)
2. `<Navbar />`, `<Footer />`, route definitions
3. Landing page layout (static, no forms)

### Phase 2 — Alert System Core
4. `<AlertForm />` — generic, config-driven
5. `<NotificationMethodPicker />`
6. `<CoinSelector />`, `<ExchangeSelector />`
7. Price Alert page (end-to-end: form → store → list)
8. Remaining market alert pages (Percent, Volume, etc.)

### Phase 3 — On-chain Alerts
9. Wallet Watch, Gas, Mempool alert pages
10. Listing alert page + events table

### Phase 4 — Directories & Detail Pages
11. Coins directory + detail page
12. Exchanges directory + detail page

### Phase 5 — Supporting Pages
13. Dashboard
14. Pricing page
15. Auth pages (mock)
16. Settings, FAQ, Guides

---

## Folder Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── Shell.jsx
│   ├── alerts/
│   │   ├── AlertForm.jsx
│   │   ├── AlertList.jsx
│   │   ├── AlertCard.jsx
│   │   └── NotificationMethodPicker.jsx
│   ├── selectors/
│   │   ├── CoinSelector.jsx
│   │   └── ExchangeSelector.jsx
│   └── ui/
│       ├── TabBar.jsx
│       ├── Modal.jsx
│       ├── DataTable.jsx
│       ├── SearchInput.jsx
│       ├── Badge.jsx
│       ├── Toast.jsx
│       └── PricingCard.jsx
├── pages/
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Signup.jsx
│   ├── Dashboard.jsx
│   ├── Pricing.jsx
│   ├── Settings.jsx
│   ├── FAQ.jsx
│   ├── Guides.jsx
│   ├── GuideDetail.jsx
│   ├── Coins.jsx
│   ├── CoinDetail.jsx
│   ├── Exchanges.jsx
│   ├── ExchangeDetail.jsx
│   └── alerts/
│       ├── PriceAlert.jsx
│       ├── PercentAlert.jsx
│       ├── PeriodicAlert.jsx
│       ├── VolumeAlert.jsx
│       ├── FundingRateAlert.jsx
│       ├── MarketCapAlert.jsx
│       ├── DominanceAlert.jsx
│       ├── StockAlert.jsx
│       ├── ListingAlert.jsx
│       ├── ListingEvents.jsx
│       ├── WalletWatchAlert.jsx
│       ├── WalletBalanceAlert.jsx
│       ├── WhaleAlert.jsx
│       ├── GasAlert.jsx
│       ├── MempoolAlert.jsx
│       └── BlockchainAlert.jsx
├── store/
│   └── useStore.js
├── mocks/
│   ├── coins.json
│   ├── exchanges.json
│   ├── alerts.json
│   ├── listing-events.json
│   ├── prices.json
│   └── gas.json
├── App.jsx
└── main.jsx
```

---

## Notes

- **No backend** — everything is client-side. Alert "creation" writes to Zustand (optionally persisted to localStorage).
- **Styles are placeholders** — the plan focuses on structure and functionality. Swap in your own design system.
- **Mock prices are static** — optionally add a `setInterval` to simulate price ticks for demo realism.
- **Notification methods are UI-only** — selecting "Telegram" doesn't actually connect to Telegram; it just records the preference.