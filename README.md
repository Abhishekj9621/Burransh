# Buranshh — Custom Shopify Theme

A fully custom Shopify Online Store 2.0 theme built from the Buranshh brand brief: a slow-fashion clothing label rooted in Himalayan craft, quiet luxury, and everyday wearability.

## What's inside

This is a complete, hand-coded Liquid theme (not a template fork) — every section, color, font, and spacing value is wired to the Shopify theme editor so you can customize the site visually without touching code, while the underlying components stay clean and modular for any future developer.

### Brand system implemented
- **Colors**: Deep Forest, Sage, Moss, Parchment, Bark, Buransh Red (accent-only, used sparingly) — all defined as CSS variables and exposed in Settings → Colors.
- **Type**: Cormorant Garamond (serif, display/headings, used in light/italic weights) + Jost (sans, body/UI, weight 300). Both swappable from Settings → Typography.
- **Voice & tone**: Section copy throughout (hero, brand story, newsletter, footer) is written in the brand's approved voice — quiet, unhurried, never shouty — pulling directly from the brief's "Do" column.
- **Logo**: No logo file was supplied yet, so the header/footer use a placeholder Buransh-flower mark (simple inline SVG) plus the wordmark "Buranshh" in Cormorant Garamond. The moment you have a real logo, upload it in Settings → Logo (header section) and it replaces the placeholder automatically — no code changes needed.

## Folder structure

```
layout/theme.liquid          → master HTML shell, loads theme.css/js, cart + nav drawers
sections/                    → every modular block (header, hero, footer, product, etc.)
snippets/                    → small reusable components (product-card, cart-drawer, meta-tags)
templates/                   → JSON templates wiring sections to each page type
assets/theme.css             → full design system (tokens, components, responsive rules)
assets/theme.js               → header scroll, cart drawer, accordions, gallery, variants
config/settings_schema.json  → global theme settings exposed in the editor
locales/en.default.json      → UI text strings
```

## Pages built
- **Homepage** (`templates/index.json`) — hero, marquee, featured collection, categories, brand story, pull quote, craft features (USPs), Instagram grid, newsletter.
- **Product page** (`templates/product.json` → `main-product.liquid`) — gallery with thumbnails, color/size variant selectors, quantity + add-to-bag, accordion (details/fabric care/size guide/shipping), related products.
- **Collection page** (`templates/collection.json` → `main-collection.liquid`) — sticky filter/sort bar, responsive product grid, pagination.
- **About / Our Story** (`templates/page.about.json`) — mission, values grid (the six brand-tone pillars), pull quote.
- **Cart page + cart drawer** — both implemented; drawer is the default fast-cart experience, full page is available at `/cart`.
- **404** and **Search** pages styled to match.
- Generic **page.json** template for policy pages (privacy, shipping, returns) — just create the page in Shopify admin and it inherits the brand styling automatically.

## Fully custom & section-based
Every block on every page is a real Shopify section with its own schema, meaning:
- Merchants can reorder, add, remove, or duplicate sections in the theme editor.
- Each section's text, images, colors, and links are editable without code.
- Components (product card, cart drawer, pull quote) are snippets, so updating one updates it everywhere it's used.

## Responsive & accessibility
- Mobile-first breakpoints at 1100px / 900px / 640px covering desktop, tablet, and phone.
- Header collapses to a slide-out drawer below 900px; cart drawer goes full-width on small screens.
- Semantic landmarks (`header`, `nav`, `main`, `footer`), ARIA labels on icon buttons, visible focus states inherited from default browser outlines (not suppressed), and `prefers-reduced-motion` support.
- Images use responsive `srcset`/`sizes` via Shopify's `image_url` + `image_tag` filters, with `loading="lazy"` everywhere except the hero/first product image.

## Installing in Shopify

1. Zip the **contents** of this folder (not the folder itself — `layout/`, `sections/`, etc. should be at the zip root).
2. In Shopify Admin → Online Store → Themes → **Add theme** → **Upload zip file**.
3. Once uploaded, click **Customize** to preview and adjust settings, colors, and section content.
4. Add your real product images and the finished logo whenever ready — everything is wired to update instantly with no code changes.
5. Create a `main-menu` navigation menu in Shopify Admin (Online Store → Navigation) — the header/footer pull from it automatically.

## Notes for whoever continues building this
- Placeholder content (sample product names/prices, Instagram squares, category images) appears automatically wherever real Shopify data isn't present yet, so the site never looks broken during setup — replace it by adding real products/collections/images.
- The Buransh-flower icon used as a logo placeholder and motif (header, footer, pull-quote mark) is original inline SVG, not a stand-in for the final mark — swap it for the real logo file once design is finalized.
- Buransh Red is intentionally used in exactly two places (sale badges, sold-out states) per the brief's "accent of last resort" rule — resist the urge to add more red.
