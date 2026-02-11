

# Styling

The app uses a **hybrid styling approach** combining Tailwind CSS with SCSS Modules, powered by CSS custom properties for theming.



### How Components Are Styled

Components use **both** Tailwind utilities and CSS Modules:

```tsx
// Tailwind utilities (inline)
className="flex items-center whitespace-nowrap border-b-2 fontGroup-highlightSemi"

// CSS Modules (imported)
import styles from "./Button.module.scss";
className={styles.button}
```

CSS Modules reference theme colors via CSS custom properties:

```scss
.button {
  color: var(--primary);
  background-color: var(--backgroundVariant200);
  border-color: var(--accentVariant100);
  &:hover { background-color: var(--backgroundVariant300); }
  &:active { background-color: var(--backgroundVariant100); }
}
```

### Global Styles Structure

All global styles live in `packages/ui-kit/src/globalStyles/`:

| File | Purpose |
|---|---|
| `index.scss` | Main entry point, imports all others |
| `colors.scss` | CSS custom property definitions (`:root`) |
| `colors.ts` | TypeScript color exports for Tailwind config |
| `themes.ts` | Theme swapper configuration |
| `fontGroups.ts` | Typography design tokens as Tailwind plugins |
| `breakpoints.ts` | Responsive breakpoint values |
| `custom.scss` | Custom utility styles |
| `animation.scss` | Keyframe animations |
| `charts.scss` | ApexCharts overrides |
| `calendar.scss` | FullCalendar overrides |
| `kasandra.scss` | Kasandra widget chart styling |

### Color System

All colors are defined as CSS custom properties at `:root` in `colors.scss`, then aliased to shorter names for use in CSS Modules. The TypeScript file `colors.ts` re-exports them as `var(--*)` references for Tailwind.

#### Primary / Text

| Variable | Value | Usage |
|---|---|---|
| `--alpha-white` | `#FFFFFF` | Pure white |
| `--alpha-primary` | `#f2f2f2` | Primary text |
| `--alpha-primary-filtered` | `rgba(242, 242, 242, 0.5)` | Muted text |
| `--alpha-primary-100` | `#849399` | Secondary text (grey) |
| `--alpha-primary-200` | `#84899a` | Tertiary text (darker grey) |
| `--alpha-primary-300` | `rgba(118, 124, 143, 0.2)` | Subtle text / borders |

#### Backgrounds (Dark Theme)

| Variable | Value | Usage |
|---|---|---|
| `--alpha-dark-base` | `#121212` | Main background |
| `--alpha-base-100` | `#191919` | Background variant |
| `--alpha-base-200` | `#242424` | Hover state |
| `--alpha-base-300` | `#2a2c33` | Active state |
| `--alpha-base-400` | `#393939` | Active variant |
| `--alpha-base-filtered` | `rgba(0, 0, 0, 0.4)` | Backdrop / overlay |
| `--alpha-backdrop` | `rgba(18, 18, 18, 0.6)` | Modal backdrop |

#### Accent / Blue

| Variable | Value | Usage |
|---|---|---|
| `--alpha-light-blue` | `#477FF7` | Primary accent / button ring |
| `--alpha-light-blue-100` | `#5E8FF8` | Lighter accent |
| `--alpha-blue-100` | `#165DF5` | Pure accent blue |
| `--alpha-dark-blue` | `#263964` | Background blue |
| `--alpha-dark-blue-100` | `#2d4476` | Background blue variant |

#### Status / Semantic

| Variable | Value | Usage |
|---|---|---|
| `--alpha-green` | `#6DD230` | Success / bullish / upward |
| `--alpha-red` | `#F45532` | Danger / bearish / downward |
| `--alpha-orange` | `#FAA202` | Warning / calendar events |
| `--alpha-orange-filtered` | `rgba(250, 162, 2, 0.9)` | Orange with opacity |
| `--alpha-orange-50` | `#E1B74F` | Light orange |
| `--alpha-orange-100` | `#BA7A02` | Dark orange |
| `--alpha-yellow-green` | `#B9E187` | Upward market |
| `--alpha-rose-brown` | `#C59592` | Weekend indicator |
| `--alpha-steel-pink` | `#CE4BD9` | TVL card accent |

#### Borders

| Variable | Value | Usage |
|---|---|---|
| `--alpha-border` | `#3b3a3a` | Default border color |

#### Category Colors (Data Visualization)

12 distinct colors used for categorization in charts, tags, and calendar events:

| Variable | Value | Color |
|---|---|---|
| `--alpha-category-1` | `#1d7cbf` | Blue |
| `--alpha-category-2` | `#752121` | Dark Red |
| `--alpha-category-3` | `#ff59c8` | Magenta |
| `--alpha-category-4` | `#3eb265` | Green |
| `--alpha-category-5` | `#3eb2b2` | Teal |
| `--alpha-category-6` | `#9b50e5` | Purple |
| `--alpha-category-7` | `#ce4bd9` | Pink |
| `--alpha-category-8` | `#e57339` | Orange |
| `--alpha-category-9` | `#4747cc` | Indigo |
| `--alpha-category-10` | `#cc841f` | Gold |
| `--alpha-category-11` | `#d1a234` | Light Gold |
| `--alpha-category-12` | `#6950e5` | Violet |

### CSS Variable Aliases

For convenience in CSS Modules, `colors.scss` maps `--alpha-*` variables to shorter aliases:

```
--primary         → var(--alpha-primary)
--background      → var(--alpha-dark-base)
--backgroundVariant100 → var(--alpha-base-100)
--backgroundVariant200 → var(--alpha-base-200)
--backgroundVariant300 → var(--alpha-base-300)
--backgroundVariant400 → var(--alpha-base-400)
--accentVariant100     → var(--alpha-light-blue)
--accentVariant200     → var(--alpha-light-blue-100)
--borderLine           → var(--alpha-border)
--secondaryOrange      → var(--alpha-orange)
--secondaryOrangeSoda  → var(--alpha-red)
--success              → var(--alpha-green)
--category1..12        → var(--alpha-category-1..12)
```

### Typography (Font Groups)

Custom Tailwind utilities defined in `fontGroups.ts`:

| Utility Class | Size | Weight | Extra |
|---|---|---|---|
| `.fontGroup-major` | 1.5rem | 600 | line-height: 1 |
| `.fontGroup-highlight` | 0.875rem | 400 | letter-spacing: 0.5px |
| `.fontGroup-highlightSemi` | 0.75rem | 600 | line-height: 1.5 |
| `.fontGroup-normal` | 0.75rem | 400 | letter-spacing: 0.2px |
| `.fontGroup-support` | 10px | 400 | letter-spacing: 0.2px |
| `.fontGroup-supportBold` | 10px | 600 | uppercase |
| `.fontGroup-mini` | 10px | 400 | &mdash; |

**Font families:** Open Sans (sans), Montserrat (headings)

### Responsive Breakpoints

Defined in `breakpoints.ts`, used by Tailwind:

| Name | Width | Purpose |
|---|---|---|
| `tiny` | 400px | Small mobile |
| `single-col` | 350px | Single column layout |
| `two-col` | 750px | Two column layout |
| `three-col` | 1200px | Three column layout |
| `four-col` | 1921px | Four column / ultra-wide |

### Gradients

Predefined gradient classes in `kasandra.scss`:

| Class | Direction |
|---|---|
| `.gradient-background-bullish` | Green gradient (upward) |
| `.gradient-background-bearish` | Red gradient (downward) |
| `.gradient-background-base` | Yellow gradient (neutral) |
| `.gradient-background-neutral` | Dark gradient |

### Theming Infrastructure

The project uses `tailwindcss-theme-swapper` with a single "base" (dark) theme currently applied at `:root`. The architecture is ready for a light theme but it is not yet implemented.

