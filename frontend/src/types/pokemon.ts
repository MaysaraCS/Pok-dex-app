//TypeScript interfaces for Pokémon data coming from Laravel API
// step one create TypeScript interface to match the JSON from LARAVEL
export interface Pokemon {
  name: string;
  image: string | null;
  types: string[];
  height: number | null;
  weight: number | null;
}

export interface PaginatedPokemonResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
}
