# Jabura Home Furniture

Jabura is a furniture showroom site for the shop at Cabanas, Mombasa Road, Nairobi. Customers browse pieces that are on the floor, then enquire by WhatsApp, phone, email, or the contact form. Staff edit the catalogue. There is no cart, no checkout, and no customer account.

## Repository

This is one git repository with two applications. They do not share a package manager. Install and run each one on its own.


| Path        | What it is                                                        |
| ----------- | ----------------------------------------------------------------- |
| `frontend/` | Public site. Next.js 16, React 19, TypeScript, Tailwind.          |
| `backend/`  | Catalogue, enquiries, and staff admin. Laravel 12 and Filament 5. |


`frontend/src/lib/catalog.ts` is an old fixture. Nothing in the live site imports it. The catalogue comes from the API.

## How a page is built

The Next.js server calls the Laravel API and renders HTML. The browser does not talk to the database.

Filament writes MySQL or SQLite. The public API only returns products that are active. List endpoints also require the product to be listed. A direct product URL still works for an active product that is not listed, so a shared link does not 404 after it is taken off a category grid.

Image files are stored on the Laravel `public` disk. The API returns absolute URLs. Next.js is allowed to load those from `127.0.0.1:8000`, `localhost:8000`, and `api.jaburahome.com`.

## Requirements

- Node.js 20 or newer, and npm
- PHP 8.3 or newer, Composer, and the GD extension (image variants)
- SQLite for local work, or MySQL 8 / MariaDB for production



## Run it locally

From `backend/`:

```bash
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed --force
php artisan storage:link
php artisan serve --host=127.0.0.1 --port=8000
```

From `frontend/`:

```bash
npm install
cp .env.example .env.local
npm run dev
```

Showroom: [http://localhost:3000](http://localhost:3000)

Staff admin: [http://127.0.0.1:8000/admin](http://127.0.0.1:8000/admin)

The seeded staff user is `admin@jaburahome.com` with password `password`. Change that password before anyone else can reach the machine. The seeder only creates the user when that email is missing, so a later seed does not reset a password you already changed.

`frontend/.env.local` must point at the API:

```bash
API_URL=http://127.0.0.1:8000
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

`API_URL` is used by the Next.js server. `NEXT_PUBLIC_API_URL` is used by the browser for enquiry posts.

## Database

Local development uses SQLite at `backend/database/database.sqlite`. That file is gitignored. `php artisan migrate --seed` creates it.

Production should use MySQL. In `backend/.env`:

```bash
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=jabura
DB_USERNAME=jabura
DB_PASSWORD=
```

Create the database and a password user before switching. On this Kali machine MariaDB is installed, but the database `root` account only accepts a login from the operating-system root user (unix socket). Logging in as your normal user, or as `root` with an empty password, is refused. `sudo mysql` works once you have the machine password. Until that user exists, leave `DB_CONNECTION=sqlite`.

The schema itself does not depend on the driver.

## Staff admin

Filament is the admin. Routes under `/admin` on the Next.js app redirect home. Do not rebuild a React admin.

Roles on the user are `owner`, `sales`, and `content`. Any of them can open the panel.

From the product screen you can publish, unpublish, archive, duplicate, and open the public page. An active product must have a name, slug, category, description, and SEO description. If the price is visible it also needs a price or a price label.

Uploading a product image writes three WebP files next to the original: thumb 300px, card 700px, detail 1400px. If encoding fails, the original file is kept and the variant paths stay empty.

Phone, WhatsApp, email, address, hours, map embed, and analytics IDs live in Site settings. The public site reads them from `GET /api/site-settings`.

## Public API

All of these are unauthenticated. List and show responses only include active catalogue rows.

- `GET /api/products` with optional `q` and `category`
- `GET /api/products/{slug}` returns the product and related pieces
- `GET /api/categories` and `GET /api/categories/{slug}`
- `GET /api/collections` and `GET /api/collections/{slug}`
- `GET /api/site-settings`
- `POST /api/enquiries`

In production, list responses are cached for 60 seconds and dropped when a product, category, collection, or setting is saved. Local and the test suite skip that cache.

The Next.js server keeps its own copy of a response for 20 seconds in development, because dev fetches are not cached by Next. That is why a Filament edit can take a few seconds to appear on the showroom during local work.

## Enquiries

WhatsApp, email, phone, and the contact form all create an enquiry. The record stores the product, the page URL, and any UTM tags or `fbclid` from the visit (kept in `sessionStorage` under `jabura-utm`).

The WhatsApp button saves the enquiry, then opens `wa.me`. The save is abandoned after 800ms so a slow API does not block the chat. If the save fails, the chat still opens.

New enquiries notify every staff user inside Filament. The dashboard charts count real enquiry rows. They are not sample data.

## Public URLs

- Home: `/`
- Catalogue: `/products`
- Product: `/products/{slug}`
- Category: `/category/{slug}`
- Collection: `/explore` and `/explore/{slug}`
- Contact, bespoke, about, privacy, terms
- `/track-order` asks the showroom about an invoice on WhatsApp. It does not look up an order.

Old product URLs `/product/{slug}` redirect to `/products/{slug}`. `/login` and `/admin` on the Next.js app redirect home.

## SEO

Each product and category page sets its own title and description. If the SEO title in Filament is empty, the page name is used and the site adds `| Jabura Home Furniture`. The homepage title is the one meant for searches like "furniture store". Product titles exist so a search for a specific piece can still land on Jabura.

The sitemap lists active products, categories, and collections. `robots.txt` disallows `/admin`, `/api`, and `/login`.

## Tests

From `backend/`:

```bash
php artisan test
```

Tests use an in-memory SQLite database. They do not touch `database.sqlite`.

