'use client';

import { useMemo, useState } from 'react';
import PokemonCard from '@/components/PokemonCard';
import SearchBar from '@/components/SearchBar';
import { usePokemon } from '@/hooks/usePokemon';

export default function PokemonList() {
  const [search, setSearch] = useState('');

  // Fetch Pokémon from Laravel API
  const { pokemons, isLoading, error, hasMore, loadMore } = usePokemon({
    initialPage: 1,
    limit: 20,
  });

  // Filter client-side by name based on search query
  const filtered = useMemo(
    () =>
      pokemons.filter(p =>
        p.name.toLowerCase().includes(search.trim().toLowerCase()),
      ),
    [pokemons, search],
  );

  return (
    <div className="bg-white rounded-lg p-4 shadow-md max-h-[600px] overflow-y-auto">
      <h2 className="mb-4 text-2xl font-bold text-gray-800">Pokémon List</h2>

      {/* Search bar at the top of the list */}
      <SearchBar value={search} onChange={setSearch} />

      {/* Error state */}
      {error && (
        <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Pokémon cards */}
      <div className="flex flex-col gap-3">
        {filtered.map(pokemon => (
          <PokemonCard key={pokemon.name} pokemon={pokemon} />
        ))}

        {!isLoading && filtered.length === 0 && !error && (
          <p className="text-sm text-gray-500">No Pokémon found.</p>
        )}
      </div>

      {/* Load more button */}
      {hasMore && (
        <div className="mt-4 flex justify-center">
          <button
            type="button"
            onClick={loadMore}
            disabled={isLoading}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
          >
            {isLoading ? 'Loading...' : 'Load more'}
          </button>
        </div>
      )}
    </div>
  );
}
