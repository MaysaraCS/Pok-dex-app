# Pokedex App

Full‑stack Pokedex application built with:

- **Backend:** Laravel 12 (PHP 8.2)
- **Frontend:** Next.js (App Router) + React + Tailwind CSS
- **External API:** [PokeAPI](https://pokeapi.co/)

The frontend **only talks to the Laravel backend**; only the backend calls PokeAPI.

---

## Project Structure

```text
Pokedex-app/
├─ backend/   # Laravel API
└─ frontend/  # Next.js frontend
```

---

## 1. Backend Setup (Laravel)

### 1.1 Prerequisites

- PHP 8.2+
- Composer
- SQLite (used by default)
- Node.js + npm (for Laravel Vite build, if needed)

### 1.2 Install dependencies

```bash
cd backend
composer install
```

### 1.3 Environment configuration

Create `.env` if it doesn’t exist:

```bash
cp .env.example .env
```

Then edit `.env` and ensure at least:

```env
APP_NAME="Pokedex API"
APP_ENV=local
APP_DEBUG=true
APP_URL=http://127.0.0.1:8000

# Frontend URL for CORS
FRONTEND_URL=http://localhost:3000

DB_CONNECTION=sqlite
# database/database.sqlite will be used
```

Create the SQLite file (if it doesn’t exist yet):

```bash
cd backend
mkdir -p database
touch database/database.sqlite
```

Generate the app key and run migrations:

```bash
php artisan key:generate
php artisan migrate
```

#### CORS configuration

Add `config/cors.php` (if not already present):

```php
<?php

return [

    'paths' => ['api/*'],

    'allowed_methods' => ['*'],

    'allowed_origins' => [
        env('FRONTEND_URL', 'http://localhost:3000'),
        'http://127.0.0.1:3000',
    ],

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => false,
];
```

Then clear config cache:

```bash
php artisan config:clear
```

### 1.4 Run the backend

```bash
php artisan serve
```

Backend will be available at:

- `http://127.0.0.1:8000`

---

## 2. Frontend Setup (Next.js)

### 2.1 Prerequisites

- Node.js 18+ (recommended)
- npm or yarn

### 2.2 Install dependencies

```bash
cd frontend
npm install
```

### 2.3 Environment configuration

Create `frontend/.env.local`:

```bash
NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000
```

> This is the **Laravel origin**, without `/api`.  
> The frontend will call `http://127.0.0.1:8000/api/pokemons`.

### 2.4 Run the frontend

```bash
cd frontend
npm run dev
```

Frontend will be available at:

- `http://localhost:3000`

---

## 3. Running the Full Stack

1. Start **backend**:

   ```bash
   cd backend
   php artisan serve
   ```

2. Start **frontend**:

   ```bash
   cd frontend
   npm run dev
   ```

3. Open the app:

   - Visit `http://localhost:3000`
   - You should see:
     - Top carousel + banners
     - Middle section with:
       - Left/right static images
       - Center: search bar + scrollable Pokémon cards
     - “Load more” button for pagination

---

## 4. API Documentation

### Base URL

- Local development: `http://127.0.0.1:8000/api`

---

### GET `/pokemons`

Fetch a paginated list of Pokémon, enriched with details from PokeAPI.

#### Request

```http
GET /api/pokemons?page=<page>&limit=<limit> HTTP/1.1
Host: 127.0.0.1:8000
Accept: application/json
```

#### Query Parameters

- `page` (optional, integer)  
  - Default: `1`  
  - Minimum: `1`  
  - Description: Page number (1‑based).

- `limit` (optional, integer)  
  - Default: `20`  
  - Range: `1`–`100`  
  - Description: Number of Pokémon per page.

Internally, the backend converts `page` + `limit` into PokeAPI’s `offset`:

```text
offset = (page - 1) * limit
```

#### Successful Response (200 OK)

```json
{
  "count": 1328,
  "next": "https://pokeapi.co/api/v2/pokemon?offset=20&limit=20",
  "previous": null,
  "results": [
    {
      "name": "ivysaur",
      "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png",
      "types": ["grass", "poison"],
      "height": 10,
      "weight": 130
    },
    {
      "name": "venusaur",
      "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png",
      "types": ["grass", "poison"],
      "height": 20,
      "weight": 1000
    }
    // ...
  ]
}
```

#### Field Description

Top‑level:

- `count` – Total number of Pokémon available in PokeAPI.
- `next` – Next page URL from PokeAPI (may be `null`).
- `previous` – Previous page URL from PokeAPI (may be `null`).
- `results` – Array of merged Pokémon objects.

Each `results[]` item:

- `name` (`string`) – Pokémon name, e.g. `"ivysaur"`.
- `image` (`string | null`) – Main artwork URL, taken from:
  - `sprites.other["official-artwork"].front_default`
  - Fallback: `sprites.front_default`
- `types` (`string[]`) – List of type names, e.g. `["grass", "poison"]`.
- `height` (`number | null`) – Height from PokeAPI.
- `weight` (`number | null`) – Weight from PokeAPI.

#### Error Responses

- **502 / 500** – If the PokeAPI call fails or times out.
- **4xx** – Standard Laravel validation or routing errors.

---

## 5. Frontend Behaviour Summary

- Fetches Pokémon **only** from `GET /api/pokemons` (no direct PokeAPI calls).
- Displays Pokémon in a **scrollable grid** inside the middle section:
  - Each card shows **name, image, and type badges**.
- Search bar filters Pokémon **by name** (client‑side filter).
- “Load more” button increments `page` and loads additional Pokémon from the backend.

---

## 6. Notes / Further Improvements

- Add backend search (e.g. `GET /api/pokemons?search=...`) instead of only client‑side filtering.
- Add tests for the `PokeApiService` and `PokemonController`.
- Introduce caching on the backend to reduce PokeAPI calls.
- Add type‑based color mapping for badges (e.g., grass = green, fire = red).
