# Payload CMS Integration — Morton Backpacks

## Context

The Morton Backpacks site is a fully static Next.js 16 + Tailwind v4 marketing site with all content hardcoded in React components. Adding Payload CMS enables non-developers to manage products, section content, and site settings through an admin panel at `/admin`, while the frontend fetches data via the Local API (no HTTP overhead).

## Decisions

- **Database:** SQLite via `@payloadcms/db-sqlite` (file: `./payload.db`)
- **Storage:** Local filesystem via `@payloadcms/storage-local` (uploads to `media/`)
- **Architecture:** Integrated — Payload embedded in the same Next.js app
- **Scope:** Single page. No multi-page CMS. Footer links stay as URL fields.
- **Content model:** Section-based globals + Products collection (Approach A)

## Collections

### Products

| Field | Type | Notes |
|-------|------|-------|
| `name` | text, required | Product display name |
| `slug` | text, unique | Auto-generated from name via beforeChange hook |
| `price` | number, required | Decimal price in EUR |
| `image` | upload → media, required | Product photo |
| `isNew` | checkbox | Show "NEW" badge |
| `order` | number | Sort order in product slider |

Admin: `useAsTitle: 'name'`, `defaultColumns: ['name', 'price', 'isNew', 'order']`

### Media

Standard Payload upload collection. Accepts images only (`image/jpeg`, `image/png`, `image/svg+xml`, `image/webp`). No extra fields.

### Users

Standard Payload auth collection (email + password). Required for admin panel access.

## Globals

### Hero

| Field | Type | Default |
|-------|------|---------|
| `headline` | text | "Morton Backpacks" |
| `video` | upload → media | — |
| `posterImage` | upload → media | — |

### InfoSection

| Field | Type | Default |
|-------|------|---------|
| `body` | richText (Lexical) | — |
| `buttonLabel` | text | "Learn more" |
| `buttonLink` | text (URL) | — |
| `backgroundImage` | upload → media | — |

### Advantages

| Field | Type | Notes |
|-------|------|-------|
| `items` | array | Repeatable group |
| `items.word` | text, required | e.g. "Quality" |
| `items.tooltipText` | richText | Hover tooltip content |
| `items.image` | upload → media | Section image |
| `items.gridArea` | text | CSS grid position |

### ContactSection

| Field | Type | Default |
|-------|------|---------|
| `badge` | text | "Custom design" |
| `headline` | text | — |
| `bodyText` | text | — |
| `buttonLabel` | text | "Send message" |
| `productImage` | upload → media | — |

### Footer

| Field | Type | Notes |
|-------|------|-------|
| `blurb` | text | Shipping/warranty/returns text |
| `newsletterHeading` | text | — |
| `newsletterDescription` | text | — |
| `serviceLinks` | array of { label, url } | — |
| `aboutLinks` | array of { label, url } | — |
| `socialLinks` | array of { label, url } | — |
| `copyrightText` | text | — |

### SiteSettings

| Field | Type | Notes |
|-------|------|-------|
| `siteTitle` | text | HTML title |
| `siteDescription` | text | Meta description |
| `logo` | upload → media | Navbar logo |
| `logoWhite` | upload → media | Footer white logo |
| `navLinks` | array of { label, href } | Navigation items |

## File Structure

```
src/
├── app/
│   ├── (payload)/
│   │   └── admin/[[...segments]]/page.tsx  # Payload admin route
│   │   └── api/[[...segments]]/route.ts    # Payload API route
│   ├── globals.css
│   ├── layout.tsx                          # Modified: Payload init
│   └── page.tsx                            # Modified: async, fetches CMS data
├── collections/
│   ├── Products.ts
│   ├── Media.ts
│   └── Users.ts
├── globals/
│   ├── Hero.ts
│   ├── InfoSection.ts
│   ├── Advantages.ts
│   ├── ContactSection.ts
│   ├── Footer.ts
│   └── SiteSettings.ts
├── components/
│   └── ... (existing, modified to accept CMS data props)
├── payload.config.ts
└── payload-types.ts                        # Auto-generated
```

## Data Flow

1. `page.tsx` becomes an async server component
2. Calls `getPayload({ config })` to get the Payload instance
3. Fetches each global via `payload.findGlobal({ slug: 'hero' })` and products via `payload.find({ collection: 'products' })`
4. Passes data as typed props to existing components
5. Components render CMS data instead of hardcoded values
6. No client-side data fetching — everything is server-rendered

## Component Changes

Each component is modified to:
- Accept a typed data prop (from `payload-types.ts`)
- Replace hardcoded values with prop values
- Keep all styling and layout identical

Example — ProductSlider already accepts `products` prop. Other components get similar data props.

## Dependencies to Install

```
payload @payloadcms/next @payloadcms/db-sqlite @payloadcms/storage-local @payloadcms/richtext-lexical
```

## Environment Variables

```
PAYLOAD_SECRET=<random-secret-string>
DATABASE_URL=file:./payload.db
```

## Seed Data

A seed script will populate the CMS with current hardcoded content so the site looks identical after integration. This includes all 5 products, 4 advantages, and all section text/images.
