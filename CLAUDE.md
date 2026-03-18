# AlphaRecipes — Claude Code Guide

## Design Context

### Users
Wide spectrum of crypto users — from curious retail investors setting their first price alert to seasoned traders and analysts who want precise on-chain signal monitoring. The context of use is ambient and async: users configure alerts once and trust the system to deliver. They are alert-minded, time-sensitive, and reward clarity over decoration. The job to be done is "stay informed without constantly watching the market."

### Brand Personality
**Smart. Friendly. Fresh.**

The culinary metaphor ("Recipes", "Fresh Alpha", "Cooked Daily") is core to the brand identity — it makes a technical product approachable and memorable. The voice should be confident but not intimidating, clever but not smug. It should feel like a knowledgeable friend in crypto, not a Bloomberg terminal.

Emotional goals: confidence, trust, a hint of delight. Users should feel like they're ahead of the market, not overwhelmed by it.

### Aesthetic Direction
- **Dark mode exclusively.** Dark theme is non-negotiable and crypto-native.
- **Reference: Dune Analytics** — clean, data-dense, strong typography, trusted by power users. Surfaces a lot of information without feeling cluttered. Confident visual hierarchy.
- **Primary accent:** Orange (`#FAA202`) — energetic, warm, action-oriented. Not a typical blue SaaS tool.
- **Typography:** Montserrat for headings (bold, sharp), Open Sans for body (readable, friendly).
- **Surfaces:** Layered darks (`#121212` bg → `#191919` cards → `#242424` inputs) with subtle `#3b3a3a` borders.
- **Status language:** Green = active/bullish, Red = danger/bearish, Orange = primary action/warning. Consistent semantic color use.
- **Anti-references:** Avoid overly gamified crypto UIs (neon overload, excessive animation, aggressive gradients). Avoid generic SaaS light-mode aesthetics. No "corporate blue."

### Design Principles

1. **Clarity over cleverness.** Every screen should communicate signal, not noise. Data-dense is fine; confusing is not. When in doubt, remove — don't add.

2. **Spectrum-aware.** Beginners should feel welcomed; power users should feel respected. Use progressive disclosure: simple defaults, depth on demand. Don't dumb it down, don't lock it up.

3. **Trust through consistency.** Use the color system semantically and predictably. Green always means healthy/active. Red always means problem. Orange always means action. Never break these contracts.

4. **Warm precision.** The "Smart. Friendly. Fresh." personality means being accurate AND approachable. Copy should be concise and human. Interactions should be smooth and responsive. Small moments of personality (the culinary metaphor, friendly microcopy) are encouraged.

5. **Dark-first, contrast-conscious.** Ship dark mode only. Meet WCAG AA contrast minimums (`4.5:1` for text, `3:1` for UI components) to ensure readability across all user environments.

## Token Reference

| Token | Value | Usage |
|---|---|---|
| `--color-primary` | `#FAA202` | CTAs, active tabs, highlights |
| `--color-primary-hover` | `#FFB84D` | Hover state |
| `--color-background` | `#121212` | Page background |
| `--color-surface` | `#191919` | Cards, modals |
| `--color-surface-light` | `#242424` | Inputs, hover surfaces |
| `--color-surface-border` | `#3b3a3a` | Borders, dividers |
| `--color-text` | `#f2f2f2` | Primary text |
| `--color-text-muted` | `#849399` | Secondary/placeholder text |
| `--color-success` | `#6DD230` | Active, bullish, confirmed |
| `--color-danger` | `#F45532` | Error, bearish, destructive |

**Fonts:** Montserrat (600/700, headings) + Open Sans (400/600, body) via Google Fonts.
