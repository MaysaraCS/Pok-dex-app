// Fetch functions for Laravel API
// step 2: API service: fetch only from Laravel

import type { PaginatedPokemonResponse } from '@/types/pokemon';

// NEXT_PUBLIC_API_BASE_URL should be something like: http://127.0.0.1:8000
const LARAVEL_API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000';

// Fetch Pokémon data from Laravel backend.
// This endpoint already merges list + detail info from PokeAPI.
export async function fetchPokemons(page: number, limit: number): Promise<PaginatedPokemonResponse> {
  // Build URL to Laravel's /api/pokemons endpoint
  const url = new URL('/api/pokemons', LARAVEL_API_BASE_URL);
  url.searchParams.set('page', String(page));
  url.searchParams.set('limit', String(limit));

  const res = await fetch(url.toString(), {
    // Ensure this is always going through the backend, never directly to PokeAPI
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
    // Consider caching / revalidation if needed
    next: { revalidate: 0 },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch Pokémon from Laravel API');
  }

  const data = (await res.json()) as PaginatedPokemonResponse;
  return data;
}
