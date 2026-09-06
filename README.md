# 1Fi Marketplace

A new **1Fi Marketplace** section added to the **Shop** page of the 1Fi app.
Built to look and behave as if it shipped from the same team — the design
system (colors, typography, spacing, cards, tabs, buttons, empty states) is
reproduced from the existing 1Fi app, and the Marketplace is a full
listing → product detail → EMI selection → checkout flow on top of a mock
data/API layer.

> There was no access to 1Fi's production source. The app shell was rebuilt
> from the public app / provided screenshots in the same stack the app clearly
> uses (Expo + React Native), and the Marketplace is the feature built on top.

## Stack

- **Expo (React Native) + TypeScript** — matches the native, bottom-tab app.
- **expo-router** — file-based routing for the tab bar and the marketplace stack.
- **@tanstack/react-query** — server-state, giving loading / error / retry for free.
- **expo-linear-gradient**, **@expo/vector-icons** — hero gradient and iconography.

## Running it

```bash
npm install --legacy-peer-deps
npx expo start
```

Then open in Expo Go (scan the QR), an iOS/Android simulator, or the browser:

```bash
npm run web
```

Type-check:

```bash
npm run typecheck
```

## What's implemented

**Shop page** (`app/(tabs)/shop.tsx`) reproduces the existing layout — purple
gradient hero, segmented tabs, search — and adds a third tab:

- **Top Brands** — intentionally a placeholder (per the brief).
- **Nearby Stores** — intentionally a placeholder (per the brief).
- **1Fi Marketplace** — fully built.

**Marketplace flow**

1. **Listing** — 2-column product grid (image, brand, name, rating, price,
   no-cost EMI hint). Live search filters by name/brand/category.
2. **Product detail** (`app/marketplace/product/[id].tsx`) — image, name,
   tagline, price, grouped **variant selection** (Storage / Color / …),
   highlights, specifications, and a list of selectable **EMI plans**.
   Changing a variant updates the effective price and **refetches EMI plans**.
   A sticky bottom CTA (**Proceed**) is enabled once a plan is selected.
3. **Checkout** (`app/marketplace/checkout.tsx`) — order summary (product +
   variant + selected plan), a confirm CTA, and a success state.

**Loading / error / empty states** are handled everywhere data is fetched:
skeletons while loading, an error card with **Retry** wired to React Query's
`refetch`, and empty states for "no results".

## Architecture

```
app/                         # expo-router routes
  _layout.tsx                #   root: React Query + safe area + stack
  (tabs)/                    #   bottom tab bar (Home/Shop/EMI Dues/Limit/Profile)
    shop.tsx                 #   SHOP PAGE — hero + 3-way segmented tabs
  marketplace/
    product/[id].tsx         #   product detail + EMI selection + CTA
    checkout.tsx             #   order summary + confirm

src/
  theme/                     # colors, typography, spacing — single source of truth
  components/ui/             # reusable kit: Button, Card, Badge, SegmentedTabs,
                             #   SearchBar, Skeleton, StateView, Screen, Text
  components/marketplace/    # ProductCard, VariantSelector, EmiPlanCard, skeletons
  features/shop/             # MarketplaceTab, PlaceholderTab
  features/marketplace/      # variant/price selection helpers
  data/                      # types.ts + products.mock.ts (the catalog)
  services/                  # api.ts (mock API seam), emi.ts (EMI math), queryClient
  hooks/                     # useProducts / useProduct / useEmiPlans (React Query)
```

### Data & API layer

No product or EMI data is hardcoded in components. It flows:

```
data/products.mock.ts  →  services/api.ts  →  hooks/*  →  screens/components
```

- **`src/services/api.ts`** is the single seam a real backend would replace.
  Every call returns a Promise, simulates network latency, and can fail. Tune
  the demo via `apiConfig`:

  ```ts
  export const apiConfig = {
    latencyMs: 650,
    failureRate: 0, // set to 1 to force the error/retry state everywhere
  };
  ```

- **`src/services/emi.ts`** holds the EMI math in one place
  (`computeMonthlyEmi`, `buildEmiPlans`, `formatINR`) so every screen shows
  consistent numbers. Tenures within a product's `maxNoCostTenure` are 0%
  (no-cost); longer tenures carry a nominal rate via the standard
  reducing-balance EMI formula.

- **`src/hooks/`** wrap the API in React Query. `useEmiPlans` is keyed on the
  effective price, so selecting a different variant automatically refetches
  the right plans.

### State management

- **Server/data state** → React Query (cache, loading, error, retry).
- **UI selection** (chosen variant, chosen EMI plan) → local screen state,
  passed to checkout via route params. No global store needed at this scope.

## Design tokens

All visual values live in `src/theme` and nothing hardcodes a hex or size:

- Primary purple `#6D3EF2`, deep indigo→violet hero gradient, `#F3F3F6` canvas.
- Bold tight headings, muted secondary text, small uppercase section labels.
- 16px screen padding, 16px card radius with soft elevation, pill CTAs.

## Notes & assumptions

- Product images use remote placeholder URLs (no assets were provided).
- Top Brands & Nearby Stores are deliberately left as placeholders per the brief.
- Home / EMI Dues / Limit / Profile tabs are reproduced lightly to make the app
  shell feel complete; the Shop → Marketplace flow is the focus.
- `--legacy-peer-deps` is needed because of an optional peer-dependency mismatch
  between some Expo 57 internal packages; it doesn't affect runtime.
