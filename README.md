# The Vite

A fashion storefront with a built-in CMS, built in Jaipur. Next.js 16 (App Router),
React 19, TypeScript and Tailwind CSS v4.

## Running it

```bash
npm install
npm run dev          # http://localhost:3000
```

Production:

```bash
npm run build
npm start
```

Two things worth knowing:

- On a machine with little free RAM, `next build` spawns ~11 workers and can run out of
  heap if the dev server is still running. Stop `npm run dev` before building.
- If you replace an image and the old one keeps appearing, Next has cached the optimised
  copy. Delete `.next` and restart.

## The CMS

Open **http://localhost:3000/admin** (there is also a "Store admin" link in the footer).
Credentials live in `.env.local` — copy `.env.example` to start:

```
ADMIN_PASSWORD=vite-admin
AUTH_SECRET=<random hex>
```

Change `ADMIN_PASSWORD` before putting this anywhere public. `AUTH_SECRET` signs the
admin session cookie; rotating it signs everyone out.

| Section | What it controls |
| --- | --- |
| **Products** | Name, slug, description, price, compare-at price, stock, images, colours, sizes, badge, collection, **department** (Men / Women / Unisex), live/hidden, and "Show in New Arrivals". Duplicate and delete. |
| **Collections** | Denim, Jeans, Shirts, T-Shirts, Sweatshirts, Trousers — these drive the shop filters and the Collections page. |
| **Announcement bar** | The strip at the top of every page. Each message has its own link, order and on/off switch; two or more active messages make the bar cycle. |
| **Site settings** | Every section of the home page (below), plus brand, logo, currency, navigation and footer. |
| **Subscribers** | Emails captured by the newsletter form. |

### Home page, in order — all editable under Site settings

1. **Announcement bar** — messages live under their own tab
2. **Hero** — eyebrow, both headline lines, sub-line, two buttons, desktop and mobile art
3. **New arrivals** — heading and link; which products appear is the per-product toggle
4. **The Vite Edit** — copy and button; the left half is the logo panel
5. **Denim** — heading and the fit chips
6. **The Look** — front and back view of one outfit
7. **Why The Vite** — four value props, each with an icon
8. **Style it your way** — four mood tiles
9. **Follow The Vite** — handle, profile link and the six-image grid
10. **Brand story** — the full-bleed band
11. **Newsletter** — heading, sub-line and button label
12. **Footer** — four columns

Repeating items (nav, chips, tiles, links) are edited one per line with `|` between the
fields; the hint under each box shows the order. Images can be uploaded directly — they
land in `public/uploads` — or pointed at any path already in `public/`.

## Storefront

| Route | |
| --- | --- |
| `/` | The home page |
| `/shop` | Everything, with collection filters, sorting and search |
| `/men`, `/women` | Filtered by department; unisex pieces appear in both |
| `/collections`, `/collections/[slug]` | Collection index and listings |
| `/product/[slug]` | Gallery, colour and size pickers, add to bag, save to wishlist |
| `/wishlist` | Everything saved with the heart |
| `/cart` | Full bag with a demo checkout |

Bag and wishlist are client-side and persist in `localStorage`. Product cards have a
**Quick add** button and a **heart**, and the five New Arrivals cards cross-fade to a back
view on hover.

Checkout is a stub — it clears the bag and shows a confirmation, and takes no payment.
Wire up a payment provider to make it real.

## Where the data lives

Content is a single JSON file at `data/store.json`, created from `src/lib/seed.ts` on
first run. It is **gitignored**: it is runtime state that changes with every admin edit,
and a fresh clone recreates it from the seed. Deleting the file resets the store (there is
also a **Reset** button under Site settings → Danger zone).

Writes are serialised through a queue and written atomically, so two edits saved at the
same moment cannot corrupt the file.

**Before deploying to a serverless host** (Vercel, Netlify, Lambda): the filesystem there
is read-only and ephemeral, so admin edits and uploads will not persist. Swap
`src/lib/db.ts` for a database and `src/app/api/upload/route.ts` for object storage.
Everything else stays as is. On a VPS or container with a persistent volume it works
unchanged.

## Images

Everything the site serves lives in `public/images/` and is already cropped and
compressed. The original artwork it was derived from is kept in `design/source/`
(~24 MB) so the crops can be regenerated:

| Source | Becomes |
| --- | --- |
| Four lookbook sheets | `products/{slug}-front,-back,-detailN.jpg` — the 36:100 card crops and the product-page detail shots |
| `cool outfit*.png` | The fifth card, and The Look's front/back pair |
| `outfit*.png` | The Style it your way tiles |
| `footer images.png` | The six Follow The Vite tiles |
| `about section image.png` | `storefront.jpg` — the brand story band and the About page |
| `hero-source.png`, `logo-source.png` | `hero.jpg`, `logo.png`, `src/app/icon.png` |

`design/` is source material, not a build input — nothing in the app reads from it. If
you would rather not push it, add `/design` to `.gitignore`.

Prices are placeholders (₹899–₹2,799) and should be confirmed before launch.

## Design notes

- Display face is **Anton**, body is **Inter**, both via `next/font`.
- Colour tokens are defined once in `src/app/globals.css` under `@theme`
  (`ink`, `surface`, `line`, `fg`, `muted`, `dim`, `sale`). The site is dark-only by design.
- The hero uses a `<picture>` element rather than two `next/image` tags, so phones and
  desktops each download only the one file they need.
- New Arrivals cards are full-length 36:100 crops. The row is sized from the viewport
  *height* — that height fixes the column width — so it scales with the screen instead of
  being pinned to a fixed size.

## Project layout

```
design/source/     original artwork (not used at runtime)
public/images/     everything the site serves
src/
  app/
    (shop)/        storefront routes
    admin/         CMS — login, dashboard, products, collections,
                   announcements, settings, subscribers
    api/upload/    image upload endpoint (admin only)
    actions.ts     public server actions (newsletter)
  components/
    site/          header, hero, and one file per home-page section
    cart/          bag provider, drawer, cart page, add-to-bag
    wishlist/      wishlist provider and page view
    admin/         admin forms and inputs
  lib/
    db.ts          JSON store: read, atomic write, seed
    seed.ts        starting catalogue and all section content
    auth.ts        admin session cookie (HMAC signed)
    cart-store.ts, wishlist-store.ts
```
