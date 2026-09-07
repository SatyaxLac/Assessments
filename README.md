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

**Loading / error / empty states** are handled per fetch, not globally:
skeletons that match the shape of the content they replace; a failure card whose
wording follows the actual failure (**no connection**, **request timed out**,
**product no longer listed**) with **Retry** wired to React Query's `refetch`;
distinct empty states for "no search results" vs. "catalog is empty". EMI plans
own their own failure state, so a plans outage leaves the product details the
user is reading on screen instead of blanking the page.

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
  components/marketplace/    # MarketplaceProductCard, ProductVariantPicker,
                             #   EmiPlanSelector, EmiPlanOption, skeletons
  features/shop/             # MarketplaceTab, PlaceholderTab
  features/marketplace/      # variant/price selection helpers
  data/                      # types.ts + products.mock.ts (the catalog)
  services/                  # marketplaceApi.ts (mock API seam), emi.ts, queryClient
  hooks/                     # useMarketplaceProducts / useMarketplaceProduct /
                             #   useEmiPlans (React Query)
```

### Data & API layer

No product or EMI data is hardcoded in components. It flows:

```
data/products.mock.ts  →  services/marketplaceApi.ts  →  hooks/*  →  screens
```

- **`src/services/marketplaceApi.ts`** is the single seam a real backend would
  replace: `fetchMarketplaceProducts`, `fetchMarketplaceProduct`,
  `fetchEmiPlans`. Every call returns a Promise, simulates latency, and can
  fail with a typed `MarketplaceApiError` carrying a `kind` of `network`,
  `timeout` or `notFound` — which is what lets the UI word each failure
  differently instead of showing one generic message. Tune the demo via:

  ```ts
  export const marketplaceApiConfig = {
    latencyMs: 650,
    failureRate: 0, // set to 1 to force the error/retry states everywhere
  };
  ```

- **`src/services/emi.ts`** holds the EMI math in one place
  (`computeMonthlyEmi`, `buildEmiPlans`, `formatINR`) so every screen shows
  consistent numbers. Tenures within a product's `maxNoCostTenure` are 0%
  (no-cost); longer tenures carry a nominal rate via the standard
  reducing-balance EMI formula.

- **`src/hooks/useMarketplaceProducts.ts`** wraps the API in React Query.
  `useEmiPlans` is keyed on the effective price, so selecting a different
  variant automatically refetches the plans that apply to the new amount.

### State management

Chosen deliberately rather than by default — there was no existing store to
match, and this is one feature with two screens:

- **Server data** (catalog, product, EMI plans) → **React Query**. It is the one
  dependency that earns its place here: the feature's hard requirements are
  loading, error, retry and refetch-on-variant-change, which is exactly what a
  query cache gives you. Rolling that by hand would mean reimplementing it.
- **UI selection** (chosen variant, chosen EMI plan) → **local component
  state**, handed to checkout through route params. This state is short-lived
  and belongs to one screen; putting it in Redux/Zustand/Context would add
  indirection without removing any.

No global store, no context provider for feature state, no state machine — at
this size those would be scaffolding around three `useState` calls.

## Design tokens

All visual values live in `src/theme` and nothing hardcodes a hex or size:

- Primary purple `#6D3EF2`, deep indigo→violet hero gradient, `#F3F3F6` canvas.
- Bold tight headings, muted secondary text, small uppercase section labels.
- 16px screen padding, 16px card radius with soft elevation, pill CTAs — the
  Marketplace reuses the same shapes as the rest of the app rather than
  introducing its own.

## Notes & assumptions

- Product images use remote placeholder URLs (no assets were provided).
- Top Brands & Nearby Stores are deliberately left as placeholders per the brief.
- Home / EMI Dues / Limit / Profile tabs are reproduced lightly to make the app
  shell feel complete; the Shop → Marketplace flow is the focus.
- Verified by walking the flow in the browser at a 375×812 mobile viewport and
  with `failureRate: 1` to exercise every error path. Not yet run on a physical
  device or simulator.
- `--legacy-peer-deps` is needed because of an optional peer-dependency mismatch
  between some Expo 57 internal packages; it doesn't affect runtime.

