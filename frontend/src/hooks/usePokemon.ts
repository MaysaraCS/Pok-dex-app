'use client';

// Custom hook to fetch Pokémon from Laravel API only

import { useEffect, useState } from 'react';
import { fetchPokemons } from '@/services/api';
import type { Pokemon } from '@/types/pokemon';

interface UsePokemonOptions {
  initialPage?: number;
  limit?: number;
}

interface UsePokemonResult {
  pokemons: Pokemon[];
  isLoading: boolean;
  error: string | null;
  page: number;
  hasMore: boolean;
  loadMore: () => void;
}

export function usePokemon({ initialPage = 1, limit = 20 }: UsePokemonOptions = {}): UsePokemonResult {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [page, setPage] = useState(initialPage);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    let isCancelled = false;

    async function load() {
      try {
        setIsLoading(true);
        setError(null);

        // IMPORTANT: this calls our Laravel backend, not PokeAPI directly
        const data = await fetchPokemons(page, limit);

        if (isCancelled) return;

        setPokemons(prev => [...prev, ...data.results]);

        // Simple "has more" calculation based on count
        const loadedCount = (page - 1) * limit + data.results.length;
        setHasMore(loadedCount < data.count);
      } catch (err: any) {
        if (isCancelled) return;
        setError(err.message ?? 'Failed to load Pokémon');
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }

    load();

    return () => {
      isCancelled = true;
    };
  }, [page, limit]);

  const loadMore = () => {
    if (!isLoading && hasMore) {
      setPage(prev => prev + 1);
    }
  };

  return {
    pokemons,
    isLoading,
    error,
    page,
    hasMore,
    loadMore,
  };
}
